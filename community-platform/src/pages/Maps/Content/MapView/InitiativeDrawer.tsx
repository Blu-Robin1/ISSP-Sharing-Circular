import { useState } from 'react';
import { Box, Flex, Heading, Text, Button, Badge, Progress, Input, Label, Select, Textarea, Checkbox } from 'theme-ui';
import type { MapPin } from 'oa-shared';
import { scisStore, type ScisStage3Milestones } from '../../scis.store';

interface IProps {
  pin: MapPin | any;
  onClose: () => void;
}

/** Stage 3 admin milestones + champion UI */
const Stage3Content = (props: {
  initiativeId: string;
  championOpen: boolean;
  setChampionOpen: (v: boolean) => void;
  championNote: string;
  setChampionNote: (v: string) => void;
  championSubmitted: boolean;
  handleChampion: (e: React.FormEvent) => void;
}) => {
  const { initiativeId, championOpen, setChampionOpen, championNote, setChampionNote, championSubmitted, handleChampion } = props;
  const milestones = initiativeId ? scisStore.getStageReadinessState(initiativeId) : undefined;

  const [budget, setBudget] = useState(milestones?.budget ?? '');
  const [projectPlanUrl, setProjectPlanUrl] = useState(milestones?.projectPlanUrl ?? '');
  const [insurance, setInsurance] = useState(milestones?.insurance ?? false);
  const [renovationScope, setRenovationScope] = useState(milestones?.renovationScope ?? '');
  const [launchDate, setLaunchDate] = useState(milestones?.launchDate ?? '');
  const [committeeUpdate, setCommitteeUpdate] = useState('');
  const [committeeUpdatesList, setCommitteeUpdatesList] = useState<string[]>(milestones?.committeeUpdates ?? []);
  const [fundraisingLaunched, setFundraisingLaunched] = useState(milestones?.fundraisingLaunched ?? false);

  const saveMilestones = (extra?: Partial<ScisStage3Milestones>) => {
    if (!initiativeId) return;
    scisStore.setStageReadinessState(initiativeId, {
      budget: budget.trim() || undefined,
      projectPlanUrl: projectPlanUrl.trim() || undefined,
      insurance,
      renovationScope: renovationScope.trim() || undefined,
      launchDate: launchDate.trim() || undefined,
      committeeUpdates: committeeUpdatesList,
      fundraisingLaunched,
      ...extra,
    });
  };

  const addCommitteeUpdate = () => {
    if (!committeeUpdate.trim() || !initiativeId) return;
    const updates = [...committeeUpdatesList, committeeUpdate.trim()];
    setCommitteeUpdatesList(updates);
    saveMilestones({ committeeUpdates: updates });
    setCommitteeUpdate('');
  };

  const handleFundraisingChange = (checked: boolean) => {
    setFundraisingLaunched(checked);
    if (initiativeId) scisStore.setFundraisingLaunched(initiativeId, checked);
  };

  return (
    <Box sx={{ bg: 'softYellow', p: 3, borderRadius: 2, mt: 3 }}>
      <Heading as="h4" variant="small" sx={{ mb: 2 }}>
        Stage 3: Project Readiness
      </Heading>

      <Box sx={{ mb: 3 }}>
        <Text sx={{ fontSize: 0, color: 'grey', mb: 2 }}>Admin milestones (demo: editable by all)</Text>
        <Label>Budget / notes</Label>
        <Input value={budget} onChange={(e) => setBudget(e.target.value)} onBlur={() => saveMilestones()} placeholder="Budget summary" sx={{ mb: 2 }} />
        <Label>Project plan URL</Label>
        <Input value={projectPlanUrl} onChange={(e) => setProjectPlanUrl(e.target.value)} onBlur={() => saveMilestones()} placeholder="https://..." sx={{ mb: 2 }} />
        <Label sx={{ alignItems: 'center', gap: 1 }}>
          <Checkbox checked={insurance} onChange={(e) => { const v = e.target.checked; setInsurance(v); saveMilestones({ insurance: v }); }} />
          Insurance in place
        </Label>
        <Label sx={{ mt: 2 }}>Renovation scope</Label>
        <Textarea value={renovationScope} onChange={(e) => setRenovationScope(e.target.value)} onBlur={() => saveMilestones()} rows={2} sx={{ mb: 2 }} />
        <Label>Launch date</Label>
        <Input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} onBlur={() => saveMilestones()} sx={{ mb: 2 }} />
        <Label>Committee updates</Label>
        <Flex sx={{ gap: 1, mb: 2 }}>
          <Input value={committeeUpdate} onChange={(e) => setCommitteeUpdate(e.target.value)} placeholder="Add update..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCommitteeUpdate())} />
          <Button onClick={addCommitteeUpdate} sx={{ px: 2, py: 1, fontSize: 0 }}>Add</Button>
        </Flex>
        {committeeUpdatesList.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {committeeUpdatesList.map((u, i) => (
              <Text key={i} sx={{ fontSize: 0, display: 'block' }}>• {u}</Text>
            ))}
          </Box>
        )}
        <Label sx={{ alignItems: 'center', gap: 1 }}>
          <Checkbox checked={fundraisingLaunched} onChange={(e) => handleFundraisingChange(e.target.checked)} />
          Fundraising campaign launched
        </Label>
      </Box>

      <Button variant="outline" sx={{ width: '100%', mb: 2 }} disabled>
        View Project Plan (PDF) — Coming soon
      </Button>
      {championOpen ? (
        <form onSubmit={handleChampion}>
          <Label>Note / role (optional)</Label>
          <Textarea value={championNote} onChange={(e) => setChampionNote(e.target.value)} rows={2} sx={{ mb: 2 }} />
          <Flex sx={{ gap: 2 }}>
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline" onClick={() => setChampionOpen(false)}>Cancel</Button>
          </Flex>
        </form>
      ) : (
        <Button variant="primary" onClick={() => setChampionOpen(true)} disabled={championSubmitted}>
          {championSubmitted ? 'Champion role recorded ✓' : 'Committee / Champion involvement'}
        </Button>
      )}
    </Box>
  );
};

const STAGE1_GOAL = 50;
const STAGE2_SUPPORTERS = 300;
const STAGE2_MEMBERS = 100;
const STAGE2_CHAMPIONS = 5;
const MEMBERSHIP_TYPES = ['Monthly', 'Annual', 'Founding', 'Other'];
const MIN_POSTAL_LENGTH = 3;

export const InitiativeDrawer = ({ pin, onClose }: IProps) => {
  const effectiveStage = Number(pin?.effectiveStage ?? pin?.stage ?? 1);
  const initiativeId = pin?.initiativeId ?? String(pin?.id ?? pin?._id ?? '').replace(/^initiative-/, '');

  const currentSupporters = Number(pin?.supporterCount ?? 0);
  const membershipCount = initiativeId ? scisStore.getUniqueMembershipCount(initiativeId, 0) : 0;
  const championCount = initiativeId ? scisStore.getUniqueChampionCount(initiativeId, 0) : 0;
  const volunteerCount = initiativeId ? scisStore.getCountByType(initiativeId, 'volunteer_skills') : 0;
  const donateCount = initiativeId ? scisStore.getCountByType(initiativeId, 'donate') : 0;

  const [addNameOpen, setAddNameOpen] = useState(false);
  const [addNameName, setAddNameName] = useState('');
  const [addNameEmail, setAddNameEmail] = useState('');
  const [addNamePostal, setAddNamePostal] = useState('');
  const [addNameSubmitted, setAddNameSubmitted] = useState(false);
  const [addNameErrors, setAddNameErrors] = useState<{ email?: string; postalCode?: string }>({});

  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [volunteerSkills, setVolunteerSkills] = useState('');
  const [volunteerNote, setVolunteerNote] = useState('');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  const [membershipOpen, setMembershipOpen] = useState(false);
  const [membershipType, setMembershipType] = useState('Monthly');
  const [membershipNote, setMembershipNote] = useState('');
  const [membershipSubmitted, setMembershipSubmitted] = useState(false);

  const [donateOpen, setDonateOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState('');
  const [donateCurrency, setDonateCurrency] = useState('CAD');
  const [donateNote, setDonateNote] = useState('');
  const [donateSubmitted, setDonateSubmitted] = useState(false);

  const [championOpen, setChampionOpen] = useState(false);
  const [championNote, setChampionNote] = useState('');
  const [championSubmitted, setChampionSubmitted] = useState(false);

  const validateStage1 = (): boolean => {
    const err: { email?: string; postalCode?: string } = {};
    const email = addNameEmail.trim();
    const postal = addNamePostal.trim();
    if (!email) err.email = 'Email is required';
    if (!postal) err.postalCode = 'Postal code is required';
    else if (postal.length < MIN_POSTAL_LENGTH)
      err.postalCode = `Postal code must be at least ${MIN_POSTAL_LENGTH} characters`;
    setAddNameErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleAddMyName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    if (!validateStage1()) return;
    scisStore.addSupportAction({
      initiativeId,
      type: 'add_my_name',
      displayName: addNameName.trim() || undefined,
      email: addNameEmail.trim() || undefined,
      postalCode: addNamePostal.trim() || undefined,
    });
    setAddNameSubmitted(true);
    setAddNameOpen(false);
    setAddNameErrors({});
  };

  const handleVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    const skills = volunteerSkills.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
    scisStore.addSupportAction({
      initiativeId,
      type: 'volunteer_skills',
      skills: skills.length ? skills : undefined,
      note: volunteerNote.trim() || undefined,
    });
    setVolunteerSubmitted(true);
    setVolunteerOpen(false);
  };

  const handleMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    scisStore.addSupportAction({
      initiativeId,
      type: 'pledge_membership',
      membershipType: membershipType || undefined,
      note: membershipNote.trim() || undefined,
    });
    setMembershipSubmitted(true);
    setMembershipOpen(false);
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    const amount = parseFloat(donateAmount);
    scisStore.addSupportAction({
      initiativeId,
      type: 'donate',
      amount: Number.isFinite(amount) ? amount : undefined,
      currency: donateCurrency || undefined,
      note: donateNote.trim() || undefined,
    });
    setDonateSubmitted(true);
    setDonateOpen(false);
  };

  const handleChampion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    scisStore.addSupportAction({
      initiativeId,
      type: 'champion',
      note: championNote.trim() || undefined,
    });
    setChampionSubmitted(true);
    setChampionOpen(false);
  };

  const renderStageAction = () => {
    switch (effectiveStage) {
      case 1:
        return (
          <Box
            sx={{
              bg: 'background',
              p: 3,
              borderRadius: 2,
              mt: 3,
              border: '1px solid',
              borderColor: 'primary',
            }}
          >
            <Heading as="h4" variant="small" sx={{ mb: 2 }}>
              Stage 1: Early Interest
            </Heading>
            <Text sx={{ fontSize: 1, mb: 2 }}>
              We need {STAGE1_GOAL} locals (Name + Email + Postal code) to back this idea.
            </Text>

            <Flex sx={{ alignItems: 'center', gap: 2, mb: 2 }}>
              <Progress max={STAGE1_GOAL} value={currentSupporters} sx={{ color: 'primary' }} />
              <Text sx={{ fontSize: 1, whiteSpace: 'nowrap' }}>
                {currentSupporters}/{STAGE1_GOAL}
              </Text>
            </Flex>

            {addNameSubmitted ? (
              <Text sx={{ color: 'green', fontSize: 1 }}>Thank you! Your support has been recorded.</Text>
            ) : addNameOpen ? (
              <form onSubmit={handleAddMyName}>
                <Label htmlFor="add-name">Name *</Label>
                <Input id="add-name" value={addNameName} onChange={(e) => setAddNameName(e.target.value)} required sx={{ mb: 2 }} />
                <Label htmlFor="add-email">Email *</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={addNameEmail}
                  onChange={(e) => { setAddNameEmail(e.target.value); setAddNameErrors((prev) => ({ ...prev, email: undefined })); }}
                  sx={{ mb: 2 }}
                />
                {addNameErrors.email && <Text sx={{ color: 'red', fontSize: 0, mb: 1 }}>{addNameErrors.email}</Text>}
                <Label htmlFor="add-postal">Postal code *</Label>
                <Input
                  id="add-postal"
                  value={addNamePostal}
                  onChange={(e) => { setAddNamePostal(e.target.value); setAddNameErrors((prev) => ({ ...prev, postalCode: undefined })); }}
                  sx={{ mb: 2 }}
                />
                {addNameErrors.postalCode && <Text sx={{ color: 'red', fontSize: 0, mb: 1 }}>{addNameErrors.postalCode}</Text>}
                <Flex sx={{ gap: 2 }}>
                  <Button type="submit">Submit</Button>
                  <Button type="button" variant="outline" onClick={() => { setAddNameOpen(false); setAddNameErrors({}); }}>Cancel</Button>
                </Flex>
              </form>
            ) : (
              <Button sx={{ width: '100%', mt: 2 }} variant="primary" onClick={() => setAddNameOpen(true)}>
                Add My Name
              </Button>
            )}
          </Box>
        );

      case 2:
        return (
          <Box sx={{ bg: 'softBlue', p: 3, borderRadius: 2, mt: 3 }}>
            <Heading as="h4" variant="small" sx={{ mb: 2 }}>
              Stage 2: Community Formation
            </Heading>
            <Text sx={{ fontSize: 1, mb: 2 }}>
              {currentSupporters}/{STAGE2_SUPPORTERS} supporters · {membershipCount}/{STAGE2_MEMBERS} members · {championCount}/{STAGE2_CHAMPIONS} champions · {volunteerCount} volunteers · {donateCount} donations
            </Text>

            <Flex sx={{ flexDirection: 'column', gap: 2 }}>
              {volunteerOpen ? (
                <form onSubmit={handleVolunteer}>
                  <Label>Skills (comma-separated)</Label>
                  <Input value={volunteerSkills} onChange={(e) => setVolunteerSkills(e.target.value)} placeholder="e.g. carpentry, painting" sx={{ mb: 2 }} />
                  <Label>Note (optional)</Label>
                  <Textarea value={volunteerNote} onChange={(e) => setVolunteerNote(e.target.value)} rows={2} sx={{ mb: 2 }} />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setVolunteerOpen(false)}>Cancel</Button>
                  </Flex>
                </form>
              ) : (
                <Button variant="outline" onClick={() => setVolunteerOpen(true)} disabled={volunteerSubmitted}>
                  {volunteerSubmitted ? 'Volunteer skills submitted ✓' : 'Volunteer Skills'}
                </Button>
              )}

              {membershipOpen ? (
                <form onSubmit={handleMembership}>
                  <Label>Membership type</Label>
                  <Select value={membershipType} onChange={(e) => setMembershipType(e.target.value)} sx={{ mb: 2 }}>
                    {MEMBERSHIP_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                  <Label>Note (optional)</Label>
                  <Textarea value={membershipNote} onChange={(e) => setMembershipNote(e.target.value)} rows={2} sx={{ mb: 2 }} />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setMembershipOpen(false)}>Cancel</Button>
                  </Flex>
                </form>
              ) : (
                <Button variant="secondary" onClick={() => setMembershipOpen(true)} disabled={membershipSubmitted}>
                  {membershipSubmitted ? 'Membership pledged ✓' : 'Pledge Membership'}
                </Button>
              )}

              {donateOpen ? (
                <form onSubmit={handleDonate}>
                  <Label>Amount (optional)</Label>
                  <Flex sx={{ gap: 2, mb: 2 }}>
                    <Input type="number" value={donateAmount} onChange={(e) => setDonateAmount(e.target.value)} placeholder="0" />
                    <Select value={donateCurrency} onChange={(e) => setDonateCurrency(e.target.value)}>
                      <option value="CAD">CAD</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </Select>
                  </Flex>
                  <Label>Note (optional)</Label>
                  <Textarea value={donateNote} onChange={(e) => setDonateNote(e.target.value)} rows={2} sx={{ mb: 2 }} />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setDonateOpen(false)}>Cancel</Button>
                  </Flex>
                </form>
              ) : (
                <Button variant="outline" onClick={() => setDonateOpen(true)} disabled={donateSubmitted}>
                  {donateSubmitted ? 'Donation intent recorded ✓' : 'Donate'}
                </Button>
              )}

              {championOpen ? (
                <form onSubmit={handleChampion}>
                  <Label>Note / role (optional)</Label>
                  <Textarea value={championNote} onChange={(e) => setChampionNote(e.target.value)} placeholder="How you can champion this" rows={2} sx={{ mb: 2 }} />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setChampionOpen(false)}>Cancel</Button>
                  </Flex>
                </form>
              ) : (
                <Button variant="primary" onClick={() => setChampionOpen(true)} disabled={championSubmitted}>
                  {championSubmitted ? 'Champion role recorded ✓' : 'Become a Champion'}
                </Button>
              )}
            </Flex>
          </Box>
        );

      case 3:
        return (
          <Stage3Content
            initiativeId={initiativeId}
            championOpen={championOpen}
            setChampionOpen={setChampionOpen}
            championNote={championNote}
            setChampionNote={setChampionNote}
            championSubmitted={championSubmitted}
            handleChampion={handleChampion}
          />
        );

      case 4:
        return (
          <Box sx={{ bg: 'softRed', p: 3, borderRadius: 2, mt: 3 }}>
            <Heading as="h4" variant="small" sx={{ mb: 2 }}>
              Stage 4: Fundraising
            </Heading>
            {donateOpen ? (
              <form onSubmit={handleDonate}>
                <Label>Amount (optional)</Label>
                <Flex sx={{ gap: 2, mb: 2 }}>
                  <Input type="number" value={donateAmount} onChange={(e) => setDonateAmount(e.target.value)} placeholder="0" />
                  <Select value={donateCurrency} onChange={(e) => setDonateCurrency(e.target.value)}>
                    <option value="CAD">CAD</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Select>
                </Flex>
                <Label>Note (optional)</Label>
                <Textarea value={donateNote} onChange={(e) => setDonateNote(e.target.value)} rows={2} sx={{ mb: 2 }} />
                <Flex sx={{ gap: 2 }}>
                  <Button type="submit" sx={{ backgroundColor: 'red' }}>Submit</Button>
                  <Button type="button" variant="outline" onClick={() => setDonateOpen(false)}>Cancel</Button>
                </Flex>
              </form>
            ) : (
              <Button
                sx={{ width: '100%', backgroundColor: 'red' }}
                onClick={() => setDonateOpen(true)}
                disabled={donateSubmitted}
              >
                {donateSubmitted ? 'Donation intent recorded ✓' : 'Donate to Campaign'}
              </Button>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: ['100%', '400px'],
        bg: 'white',
        zIndex: 2000,
        boxShadow: '0px 0px 20px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        p: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Flex
  sx={{
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    gap: 2,
  }}
>
  {/* Left: badges */}
  <Flex sx={{ alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
    <Badge
      variant={effectiveStage === 4 ? 'accent' : 'primary'}
      sx={{
        px: 2,
        py: 1,
        borderRadius: 9999,
        fontSize: 5,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        borderColor: 'primary',
      }}
    >
      Stage {effectiveStage}
    </Badge>

    {(pin as any)?.moderation === 'pending' && (
      <Badge
        variant="outline"
        sx={{
          px: 2,
          py: 1,
          borderRadius: 9999,
          fontSize: 5,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          borderColor: 'primary',
        }}
      >
        Pending
      </Badge>
    )}
  </Flex>

    {/* Right: close */}
    <Button variant="outline" onClick={onClose} sx={{ cursor: 'pointer', px: 2, py: 1 }}>
      Close
    </Button>
  </Flex>

      <Box
        sx={{
          width: '100%',
          height: '200px',
          bg: 'muted',
          borderRadius: 2,
          backgroundImage: pin.imageUrl ? `url(${pin.imageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mb: 3,
        }}
      />

      <Heading as="h2" sx={{ mb: 2 , fontSize:6}}>
        {pin.profile?.name || pin.title || 'Community Project'}
      </Heading>

      <Text sx={{ mb: 4, lineHeight: 1.5, color: 'grey', fontSize:3}}>
        {pin.description || 'A shared infrastructure project proposed by your neighbors.'}
      </Text>

      {renderStageAction()}
    </Box>
  );
};
