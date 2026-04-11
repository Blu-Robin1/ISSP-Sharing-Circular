import type { MapPin } from 'oa-shared';
import { UserRole } from 'oa-shared';
import { useContext, useEffect, useRef, useState } from 'react';
import { useProfileStore } from 'src/stores/Profile/profile.store';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Label,
  Progress,
  Select,
  Text,
  Textarea,
} from 'theme-ui';
import { MapContext } from '../../MapContext';
import { scisService } from '../../scis.service';
import { type ScisStage3Milestones, scisStore } from '../../scis.store';

interface IProps {
  pin: MapPin | any;
  onClose: () => void;
}

/** Stage 3 admin milestones (persisted to Supabase) + champion UI */
const Stage3Content = (props: {
  initiativeId: string;
  stage3Milestones: Record<string, unknown> | null | undefined;
  onRefresh: () => void;
  championOpen: boolean;
  setChampionOpen: (v: boolean) => void;
  championNote: string;
  setChampionNote: (v: string) => void;
  championSubmitted: boolean;
  handleChampion: (e: React.FormEvent) => void;
}) => {
  const {
    initiativeId,
    stage3Milestones: serverMilestones,
    onRefresh,
    championOpen,
    setChampionOpen,
    championNote,
    setChampionNote,
    championSubmitted,
    handleChampion,
  } = props;
  const { isUserAuthorized } = useProfileStore();
  const isAdmin = isUserAuthorized?.(UserRole.ADMIN);
  const localMilestones = initiativeId ? scisStore.getStageReadinessState(initiativeId) : undefined;
  const ms = (serverMilestones as ScisStage3Milestones | undefined) ?? localMilestones;

  const [budget, setBudget] = useState(ms?.budget ?? '');
  const [projectPlanUrl, setProjectPlanUrl] = useState(ms?.projectPlanUrl ?? '');
  const [insurance, setInsurance] = useState(ms?.insurance ?? false);
  const [renovationScope, setRenovationScope] = useState(ms?.renovationScope ?? '');
  const [launchDate, setLaunchDate] = useState(ms?.launchDate ?? '');
  const [committeeUpdate, setCommitteeUpdate] = useState('');
  const [committeeUpdatesList, setCommitteeUpdatesList] = useState<string[]>(
    ms?.committeeUpdates ?? [],
  );
  const [fundraisingLaunched, setFundraisingLaunched] = useState(ms?.fundraisingLaunched ?? false);
  const [campaignGoal, setCampaignGoal] = useState(
    ms?.campaignGoal != null ? String(ms.campaignGoal) : '',
  );
  const [campaignRaised, setCampaignRaised] = useState(
    ms?.campaignRaised != null ? String(ms.campaignRaised) : '',
  );
  const [investmentInstructions, setInvestmentInstructions] = useState(
    ms?.investmentInstructions ?? '',
  );

  useEffect(() => {
    setBudget(ms?.budget ?? '');
    setProjectPlanUrl(ms?.projectPlanUrl ?? '');
    setInsurance(ms?.insurance ?? false);
    setRenovationScope(ms?.renovationScope ?? '');
    setLaunchDate(ms?.launchDate ?? '');
    setCommitteeUpdatesList(ms?.committeeUpdates ?? []);
    setFundraisingLaunched(ms?.fundraisingLaunched ?? false);
    setCampaignGoal(ms?.campaignGoal != null ? String(ms.campaignGoal) : '');
    setCampaignRaised(ms?.campaignRaised != null ? String(ms.campaignRaised) : '');
    setInvestmentInstructions(ms?.investmentInstructions ?? '');
  }, [serverMilestones]);
  const [savingMilestones, setSavingMilestones] = useState(false);

  const saveMilestones = async (extra?: Partial<ScisStage3Milestones>) => {
    if (!initiativeId) return;
    const payload: Partial<ScisStage3Milestones> = {
      budget: budget.trim() || undefined,
      projectPlanUrl: projectPlanUrl.trim() || undefined,
      insurance,
      renovationScope: renovationScope.trim() || undefined,
      launchDate: launchDate.trim() || undefined,
      committeeUpdates: committeeUpdatesList,
      fundraisingLaunched,
      campaignGoal: campaignGoal ? Number(campaignGoal) : undefined,
      campaignRaised: campaignRaised ? Number(campaignRaised) : undefined,
      investmentInstructions: investmentInstructions.trim() || undefined,
      ...extra,
    };
    scisStore.setStageReadinessState(initiativeId, payload);
    if (isAdmin) {
      setSavingMilestones(true);
      await scisService.updateInitiative(initiativeId, { stage3Milestones: payload });
      onRefresh();
      setSavingMilestones(false);
    }
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
        <Text sx={{ fontSize: 0, color: 'grey', mb: 2 }}>
          {isAdmin ? 'Admin milestones (saved to database)' : 'Project readiness milestones'}
        </Text>
        <Label>Budget / notes</Label>
        <Input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          onBlur={() => saveMilestones()}
          placeholder="Budget summary"
          sx={{ mb: 2 }}
          disabled={!isAdmin}
        />
        <Label>Project plan URL</Label>
        <Input
          value={projectPlanUrl}
          onChange={(e) => setProjectPlanUrl(e.target.value)}
          onBlur={() => saveMilestones()}
          placeholder="https://..."
          sx={{ mb: 2 }}
          disabled={!isAdmin}
        />
        <Label sx={{ alignItems: 'center', gap: 1 }}>
          <Checkbox
            checked={insurance}
            onChange={(e) => {
              const v = e.target.checked;
              setInsurance(v);
              saveMilestones({ insurance: v });
            }}
            disabled={!isAdmin}
          />
          Insurance in place
        </Label>
        <Label sx={{ mt: 2 }}>Renovation scope</Label>
        <Textarea
          value={renovationScope}
          onChange={(e) => setRenovationScope(e.target.value)}
          onBlur={() => saveMilestones()}
          rows={2}
          sx={{ mb: 2 }}
          disabled={!isAdmin}
        />
        <Label>Launch date</Label>
        <Input
          type="date"
          value={launchDate}
          onChange={(e) => setLaunchDate(e.target.value)}
          onBlur={() => saveMilestones()}
          sx={{ mb: 2 }}
          disabled={!isAdmin}
        />
        <Label>Committee updates</Label>
        <Flex sx={{ gap: 1, mb: 2 }}>
          <Input
            value={committeeUpdate}
            onChange={(e) => setCommitteeUpdate(e.target.value)}
            placeholder="Add update..."
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCommitteeUpdate())}
            disabled={!isAdmin}
          />
          <Button
            onClick={addCommitteeUpdate}
            disabled={!isAdmin || savingMilestones}
            sx={{ px: 2, py: 1, fontSize: 0 }}
          >
            Add
          </Button>
        </Flex>
        {committeeUpdatesList.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {committeeUpdatesList.map((u, i) => (
              <Text key={i} sx={{ fontSize: 0, display: 'block' }}>
                • {u}
              </Text>
            ))}
          </Box>
        )}
        <Label sx={{ alignItems: 'center', gap: 1 }}>
          <Checkbox
            checked={fundraisingLaunched}
            onChange={(e) => handleFundraisingChange(e.target.checked)}
            disabled={!isAdmin}
          />
          Fundraising campaign launched
        </Label>
        {isAdmin && (
          <>
            <Label sx={{ mt: 2 }}>Stage 4: Campaign goal (optional)</Label>
            <Input
              type="number"
              value={campaignGoal}
              onChange={(e) => setCampaignGoal(e.target.value)}
              onBlur={() => saveMilestones()}
              placeholder="e.g. 50000"
              sx={{ mb: 2 }}
            />
            <Label>Campaign raised (optional)</Label>
            <Input
              type="number"
              value={campaignRaised}
              onChange={(e) => setCampaignRaised(e.target.value)}
              onBlur={() => saveMilestones()}
              placeholder="e.g. 0"
              sx={{ mb: 2 }}
            />
            <Label>Investment instructions (optional)</Label>
            <Textarea
              value={investmentInstructions}
              onChange={(e) => setInvestmentInstructions(e.target.value)}
              onBlur={() => saveMilestones()}
              placeholder="Instructions for community investment or contribution"
              rows={2}
              sx={{ mb: 2 }}
            />
          </>
        )}
      </Box>

      <Button variant="outline" sx={{ width: '100%', mb: 2 }} disabled>
        View Project Plan (PDF) — Coming soon
      </Button>
      {championOpen ? (
        <form onSubmit={handleChampion}>
          <Label>Note / role (optional)</Label>
          <Textarea
            value={championNote}
            onChange={(e) => setChampionNote(e.target.value)}
            rows={2}
            sx={{ mb: 2 }}
          />
          <Flex sx={{ gap: 2 }}>
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline" onClick={() => setChampionOpen(false)}>
              Cancel
            </Button>
          </Flex>
        </form>
      ) : (
        <Button
          variant="primary"
          onClick={() => setChampionOpen(true)}
          disabled={championSubmitted}
        >
          {championSubmitted ? 'Champion role recorded ✓' : 'Committee / Champion involvement'}
        </Button>
      )}
    </Box>
  );
};

/** Stage 4: Fundraising UI with status, progress, and contribution options */
const Stage4Content = (props: {
  pin: any;
  donateOpen: boolean;
  setDonateOpen: (v: boolean) => void;
  donateAmount: string;
  setDonateAmount: (v: string) => void;
  donateCurrency: string;
  setDonateCurrency: (v: string) => void;
  donateNote: string;
  setDonateNote: (v: string) => void;
  donateSubmitted: boolean;
  handleDonate: (e: React.FormEvent) => void;
}) => {
  const {
    pin,
    donateOpen,
    setDonateOpen,
    donateAmount,
    setDonateAmount,
    donateCurrency,
    setDonateCurrency,
    donateNote,
    setDonateNote,
    donateSubmitted,
    handleDonate,
  } = props;
  const ms = (pin?.stage3Milestones ?? pin?.stage3_milestones ?? {}) as Record<string, unknown>;
  const campaignGoal = typeof ms.campaignGoal === 'number' ? ms.campaignGoal : undefined;
  const campaignRaised = typeof ms.campaignRaised === 'number' ? ms.campaignRaised : undefined;
  const fundraisingLaunched = Boolean(ms.fundraisingLaunched);
  const statusLabel = fundraisingLaunched ? 'Campaign launched' : 'Campaign not yet launched';
  const hasProgress = campaignGoal != null && campaignGoal > 0;
  const progressPct =
    hasProgress && campaignRaised != null
      ? Math.min(100, (campaignRaised / campaignGoal) * 100)
      : 0;

  return (
    <Box sx={{ bg: 'softRed', p: 3, borderRadius: 2, mt: 3 }}>
      <Heading as="h4" variant="small" sx={{ mb: 2 }}>
        Stage 4: Fundraising
      </Heading>
      <Text sx={{ fontSize: 1, fontWeight: 600, mb: 1 }}>Fundraising status</Text>
      <Text sx={{ fontSize: 1, color: 'grey', mb: 2 }}>{statusLabel}</Text>
      {hasProgress ? (
        <Box sx={{ mb: 3 }}>
          <Text sx={{ fontSize: 1, fontWeight: 600, mb: 1 }}>Campaign progress</Text>
          <Flex sx={{ alignItems: 'center', gap: 2, mb: 1 }}>
            <Progress max={100} value={progressPct} sx={{ flex: 1, color: 'primary' }} />
            <Text sx={{ fontSize: 1, whiteSpace: 'nowrap' }}>
              {campaignRaised != null ? campaignRaised : 0} / {campaignGoal}
            </Text>
          </Flex>
          {typeof ms.investmentInstructions === 'string' && ms.investmentInstructions && (
            <Text sx={{ fontSize: 0, color: 'grey', mt: 1 }}>{ms.investmentInstructions}</Text>
          )}
        </Box>
      ) : (
        <Text sx={{ fontSize: 0, color: 'grey', mb: 3 }}>
          Campaign details will appear here once configured by SCIS staff. To contribute now, use
          the Donate button below. For community bond or investment options, contact SCIS.
        </Text>
      )}
      {donateOpen ? (
        <form onSubmit={handleDonate}>
          <Label>Amount (optional)</Label>
          <Flex sx={{ gap: 2, mb: 2 }}>
            <Input
              type="number"
              value={donateAmount}
              onChange={(e) => setDonateAmount(e.target.value)}
              placeholder="0"
            />
            <Select value={donateCurrency} onChange={(e) => setDonateCurrency(e.target.value)}>
              <option value="CAD">CAD</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </Select>
          </Flex>
          <Label>Note (optional)</Label>
          <Textarea
            value={donateNote}
            onChange={(e) => setDonateNote(e.target.value)}
            rows={2}
            sx={{ mb: 2 }}
          />
          <Flex sx={{ gap: 2 }}>
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="button" variant="outline" onClick={() => setDonateOpen(false)}>
              Cancel
            </Button>
          </Flex>
        </form>
      ) : (
        <Button
          variant="primary"
          sx={{ width: '100%' }}
          onClick={() => setDonateOpen(true)}
          disabled={donateSubmitted}
        >
          {donateSubmitted ? 'Donation intent recorded ✓' : 'Donate to Campaign'}
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
  const mapContext = useContext(MapContext);
  const status = (pin as any)?.status ?? (pin as any)?.moderation ?? 'approved';
  const isPending = status === 'pending';
  const effectiveStage = Number(pin?.effectiveStage ?? pin?.stage ?? 1);
  const initiativeId =
    pin?.initiativeId ?? String(pin?.id ?? pin?._id ?? '').replace(/^initiative-/, '');
  const supportersAtSubmitRef = useRef(0);

  const membershipCount = Number((pin as any)?.memberCount ?? 0);
  const championCount = Number((pin as any)?.championCount ?? 0);
  const volunteerCount = Number((pin as any)?.volunteerCount ?? 0);
  const donateCount = Number((pin as any)?.donateCount ?? 0);

  const [addNameOpen, setAddNameOpen] = useState(false);
  const [addNameName, setAddNameName] = useState('');
  const [addNameEmail, setAddNameEmail] = useState('');
  const [addNamePostal, setAddNamePostal] = useState('');
  const [addNameSubmitted, setAddNameSubmitted] = useState(false);
  const [addNameErrors, setAddNameErrors] = useState<{ email?: string; postalCode?: string }>({});
  const [addNameApiError, setAddNameApiError] = useState<string | null>(null);
  const addNameFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (addNameOpen && addNameFormRef.current) {
      addNameFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [addNameOpen]);

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

  // Support both camelCase (initiative pins) and snake_case (API response)
  const baseSupporters = Number((pin as any)?.supporterCount ?? (pin as any)?.supporter_count ?? 0);
  // Optimistic: show +1 immediately after Add my name; once refetch completes, use real count
  const currentSupporters =
    addNameSubmitted && baseSupporters === supportersAtSubmitRef.current
      ? baseSupporters + 1
      : baseSupporters;

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

  const handleAddMyName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    if (!validateStage1()) return;
    setAddNameApiError(null);
    const ok = await scisService.addSupport(initiativeId, {
      name: addNameName.trim() || undefined,
      email: addNameEmail.trim() || undefined,
      postalCode: addNamePostal.trim() || undefined,
    });
    if (ok) {
      supportersAtSubmitRef.current = baseSupporters;
      setAddNameSubmitted(true);
      setAddNameOpen(false);
      setAddNameErrors({});
      setAddNameApiError(null);
      mapContext?.refreshProjects?.();
    } else {
      setAddNameApiError(
        'Failed to record your support. Check your connection and try again, or contact support if the problem persists.',
      );
    }
  };

  const handleVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    const skills = volunteerSkills
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const ok = await scisService.addContribution(initiativeId, 'volunteer_skills', {
      skills: skills.length ? skills : undefined,
      note: volunteerNote.trim() || undefined,
    });
    if (ok) {
      setVolunteerSubmitted(true);
      setVolunteerOpen(false);
      mapContext?.refreshProjects?.();
    }
  };

  const handleMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    const ok = await scisService.addContribution(initiativeId, 'pledge_membership', {
      membershipType: membershipType || undefined,
      note: membershipNote.trim() || undefined,
    });
    if (ok) {
      setMembershipSubmitted(true);
      setMembershipOpen(false);
      mapContext?.refreshProjects?.();
    }
  };

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    const amount = parseFloat(donateAmount);
    const ok = await scisService.addContribution(initiativeId, 'donate', {
      amount: Number.isFinite(amount) ? amount : undefined,
      currency: donateCurrency || undefined,
      note: donateNote.trim() || undefined,
    });
    if (ok) {
      setDonateSubmitted(true);
      setDonateOpen(false);
      mapContext?.refreshProjects?.();
    }
  };

  const handleChampion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!initiativeId) return;
    const ok = await scisService.addContribution(initiativeId, 'champion', {
      note: championNote.trim() || undefined,
    });
    if (ok) {
      setChampionSubmitted(true);
      setChampionOpen(false);
      mapContext?.refreshProjects?.();
    }
  };

  const renderStageAction = () => {
    if (isPending) {
      return (
        <Box
          sx={{
            bg: 'softYellow',
            p: 3,
            borderRadius: 2,
            mt: 3,
            border: '1px solid',
            borderColor: 'muted',
          }}
        >
          <Heading as="h4" variant="small" sx={{ mb: 2 }}>
            Pending approval
          </Heading>
          <Text sx={{ fontSize: 1 }}>
            This initiative is awaiting admin approval. Once approved, it will appear with full
            community support options.
          </Text>
        </Box>
      );
    }

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
              <Text sx={{ color: 'green', fontSize: 1 }}>
                Thank you! Your support has been recorded.
              </Text>
            ) : addNameOpen ? (
              <form ref={addNameFormRef} onSubmit={handleAddMyName}>
                {addNameApiError && (
                  <Text sx={{ color: 'red', fontSize: 0, mb: 2 }}>{addNameApiError}</Text>
                )}
                <Label htmlFor="add-name">Name *</Label>
                <Input
                  id="add-name"
                  value={addNameName}
                  onChange={(e) => setAddNameName(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <Label htmlFor="add-email">Email *</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={addNameEmail}
                  onChange={(e) => {
                    setAddNameEmail(e.target.value);
                    setAddNameErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  sx={{ mb: 2 }}
                />
                {addNameErrors.email && (
                  <Text sx={{ color: 'red', fontSize: 0, mb: 1 }}>{addNameErrors.email}</Text>
                )}
                <Label htmlFor="add-postal">Postal code *</Label>
                <Input
                  id="add-postal"
                  value={addNamePostal}
                  onChange={(e) => {
                    setAddNamePostal(e.target.value);
                    setAddNameErrors((prev) => ({ ...prev, postalCode: undefined }));
                  }}
                  sx={{ mb: 2 }}
                />
                {addNameErrors.postalCode && (
                  <Text sx={{ color: 'red', fontSize: 0, mb: 1 }}>{addNameErrors.postalCode}</Text>
                )}
                <Flex sx={{ gap: 2 }}>
                  <Button type="submit">Submit</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setAddNameOpen(false);
                      setAddNameErrors({});
                      setAddNameApiError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Flex>
              </form>
            ) : (
              <Button
                type="button"
                sx={{ width: '100%', mt: 2 }}
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setAddNameOpen(true);
                  setAddNameApiError(null);
                }}
              >
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
              {currentSupporters}/{STAGE2_SUPPORTERS} supporters · {membershipCount}/
              {STAGE2_MEMBERS} members · {championCount}/{STAGE2_CHAMPIONS} champions ·{' '}
              {volunteerCount} volunteers · {donateCount} donations
            </Text>

            <Flex sx={{ flexDirection: 'column', gap: 2 }}>
              {volunteerOpen ? (
                <form onSubmit={handleVolunteer}>
                  <Label>Skills (comma-separated)</Label>
                  <Input
                    value={volunteerSkills}
                    onChange={(e) => setVolunteerSkills(e.target.value)}
                    placeholder="e.g. carpentry, painting"
                    sx={{ mb: 2 }}
                  />
                  <Label>Note (optional)</Label>
                  <Textarea
                    value={volunteerNote}
                    onChange={(e) => setVolunteerNote(e.target.value)}
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setVolunteerOpen(false)}>
                      Cancel
                    </Button>
                  </Flex>
                </form>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setVolunteerOpen(true)}
                  disabled={volunteerSubmitted}
                >
                  {volunteerSubmitted ? 'Volunteer skills submitted ✓' : 'Volunteer Skills'}
                </Button>
              )}

              {membershipOpen ? (
                <form onSubmit={handleMembership}>
                  <Label>Membership type</Label>
                  <Select
                    value={membershipType}
                    onChange={(e) => setMembershipType(e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    {MEMBERSHIP_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                  <Label>Note (optional)</Label>
                  <Textarea
                    value={membershipNote}
                    onChange={(e) => setMembershipNote(e.target.value)}
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setMembershipOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </form>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => setMembershipOpen(true)}
                  disabled={membershipSubmitted}
                >
                  {membershipSubmitted ? 'Membership pledged ✓' : 'Pledge Membership'}
                </Button>
              )}

              {donateOpen ? (
                <form onSubmit={handleDonate}>
                  <Label>Amount (optional)</Label>
                  <Flex sx={{ gap: 2, mb: 2 }}>
                    <Input
                      type="number"
                      value={donateAmount}
                      onChange={(e) => setDonateAmount(e.target.value)}
                      placeholder="0"
                    />
                    <Select
                      value={donateCurrency}
                      onChange={(e) => setDonateCurrency(e.target.value)}
                    >
                      <option value="CAD">CAD</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </Select>
                  </Flex>
                  <Label>Note (optional)</Label>
                  <Textarea
                    value={donateNote}
                    onChange={(e) => setDonateNote(e.target.value)}
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setDonateOpen(false)}>
                      Cancel
                    </Button>
                  </Flex>
                </form>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setDonateOpen(true)}
                  disabled={donateSubmitted}
                >
                  {donateSubmitted ? 'Donation intent recorded ✓' : 'Donate'}
                </Button>
              )}

              {championOpen ? (
                <form onSubmit={handleChampion}>
                  <Label>Note / role (optional)</Label>
                  <Textarea
                    value={championNote}
                    onChange={(e) => setChampionNote(e.target.value)}
                    placeholder="How you can champion this"
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                  <Flex sx={{ gap: 2 }}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" variant="outline" onClick={() => setChampionOpen(false)}>
                      Cancel
                    </Button>
                  </Flex>
                </form>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setChampionOpen(true)}
                  disabled={championSubmitted}
                >
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
            stage3Milestones={(pin as any)?.stage3Milestones}
            onRefresh={() => mapContext?.refreshProjects?.()}
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
          <Stage4Content
            pin={pin}
            donateOpen={donateOpen}
            setDonateOpen={setDonateOpen}
            donateAmount={donateAmount}
            setDonateAmount={setDonateAmount}
            donateCurrency={donateCurrency}
            setDonateCurrency={setDonateCurrency}
            donateNote={donateNote}
            setDonateNote={setDonateNote}
            donateSubmitted={donateSubmitted}
            handleDonate={handleDonate}
          />
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
            variant={isPending ? 'outline' : effectiveStage === 4 ? 'accent' : 'primary'}
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
            {isPending ? 'Pending approval' : `Stage ${effectiveStage}`}
          </Badge>
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

      <Heading as="h2" sx={{ mb: 2, fontSize: 6 }}>
        {pin.profile?.name || pin.title || 'Community Project'}
      </Heading>

      <Text sx={{ mb: 4, lineHeight: 1.5, color: 'grey', fontSize: 3 }}>
        {pin.description || 'A shared infrastructure project proposed by your neighbors.'}
      </Text>

      {renderStageAction()}
    </Box>
  );
};
