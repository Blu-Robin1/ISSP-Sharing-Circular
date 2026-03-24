import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Box, Button, Flex, Heading, Text, Badge, Select, Input, Textarea, Label } from 'theme-ui';
import { scisService } from '../scis.service';
import {
  computeEffectiveStage,
  scisStore,
  type ScisLocalInitiative,
  type ScisModerationStatus,
  type ScisStage,
  type ScisProjectType,
} from '../scis.store';

const STAGE_OPTIONS: ScisStage[] = [1, 2, 3, 4];
const PROJECT_TYPE_OPTIONS: { value: ScisProjectType; label: string }[] = [
  { value: 'tool_library', label: 'Tool Library' },
  { value: 'repair_cafe', label: 'Repair Café' },
  { value: 'skill_share', label: 'Skill Share' },
  { value: 'workspace', label: 'Workspace' },
  { value: 'other', label: 'Other' },
];

const selectSx = {
  minWidth: 140,
  width: 160,
  fontSize: 1,
  px: 2,
  py: 1,
} as const;

const LocalInitiativeCard = (props: {
  li: ScisLocalInitiative;
  onModeration: (id: string, s: ScisModerationStatus) => void;
  onStageOverride: (id: string, s: ScisStage | '') => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, u: { title?: string; description?: string; projectType?: ScisProjectType }) => void;
  supporterCountStrict: (id: string) => number;
  membershipCount: (id: string) => number;
  championCount: (id: string) => number;
  volunteerCount: (id: string) => number;
  donateCount: (id: string) => number;
}) => {
  const {
    li,
    onModeration,
    onStageOverride,
    onDelete,
    onUpdate,
    supporterCountStrict,
    membershipCount,
    championCount,
    volunteerCount,
    donateCount,
  } = props;

  const local = scisStore.getLocalState(li.id);
  const effStage = computeEffectiveStage(1, local, undefined);

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(li.title);
  const [editDesc, setEditDesc] = useState(li.description ?? '');
  const [editProjectType, setEditProjectType] = useState<ScisProjectType>(li.projectType ?? 'other');

  const milestones = scisStore.getStageReadinessState(li.id);

  return (
    <Box
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'muted',
        borderRadius: 2,
        bg: li.moderation === 'rejected' ? 'muted' : 'background',
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          {editing ? (
            <>
              <Label>Title</Label>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} sx={{ mb: 2 }} />

              <Label>Description</Label>
              <Textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} rows={2} sx={{ mb: 2 }} />

              <Label>Project type</Label>
              <Select
                value={editProjectType}
                onChange={(e) => setEditProjectType(e.target.value as ScisProjectType)}
                sx={{ mb: 2 }}
              >
                {PROJECT_TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>

              <Flex sx={{ gap: 2 }}>
                <Button
                  sx={{ fontSize: 0 }}
                  onClick={() => {
                    onUpdate(li.id, { title: editTitle, description: editDesc, projectType: editProjectType });
                    setEditing(false);
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  sx={{ fontSize: 0 }}
                  onClick={() => {
                    setEditTitle(li.title);
                    setEditDesc(li.description ?? '');
                    setEditProjectType(li.projectType ?? 'other');
                    setEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <Heading as="h3" sx={{ fontSize: 2, mb: 1 }}>
                {li.title}
              </Heading>
              <Text sx={{ fontSize: 1, color: 'grey', mb: 1 }}>{li.description || '—'}</Text>
              <Text sx={{ fontSize: 0, color: 'grey' }}>
                {li.lat.toFixed(4)}, {li.lng.toFixed(4)} · {supporterCountStrict(li.id)} supporters (strict) ·{' '}
                {membershipCount(li.id)} members · {championCount(li.id)} champions · {volunteerCount(li.id)} volunteers ·{' '}
                {donateCount(li.id)} donations
              </Text>

              {effStage >= 3 && milestones && (
                <Text sx={{ fontSize: 0, color: 'grey', mt: 1 }}>
                  Milestones:{' '}
                  {milestones.budget ? 'budget✓ ' : ''}
                  {milestones.projectPlanUrl ? 'plan✓ ' : ''}
                  {milestones.insurance ? 'insurance✓ ' : ''}
                  {milestones.renovationScope ? 'scope✓ ' : ''}
                  {milestones.launchDate ? 'launch✓ ' : ''}
                  {milestones.fundraisingLaunched ? 'fundraising✓' : ''}
                </Text>
              )}

              <Button variant="outline" sx={{ mt: 2, fontSize: 0 }} onClick={() => setEditing(true)}>
                Edit
              </Button>
            </>
          )}
        </Box>

        {!editing && (
          <Badge
            variant={li.moderation === 'approved' ? 'primary' : li.moderation === 'rejected' ? 'secondary' : 'outline'}
            sx={{
              alignSelf: 'flex-start',
              px: 2,
              py: 1,
              borderRadius: 9999,
              fontSize: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {li.moderation}
          </Badge>
        )}
      </Flex>

      {!editing && (
        <Flex sx={{ gap: 2, rowGap: 2, mt: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Text sx={{ fontSize: 1 }}>Moderate:</Text>

          <Button
            variant={li.moderation === 'approved' ? 'primary' : 'outline'}
            sx={{ fontSize: 0 }}
            onClick={() => onModeration(li.id, 'approved')}
          >
            Approve
          </Button>

          <Button
            variant="outline"
            sx={{
              fontSize: 0,
              color: li.moderation === 'rejected' ? 'white' : 'red',
              borderColor: 'red',
              bg: li.moderation === 'rejected' ? 'red' : 'transparent',
              '&:hover': {
                bg: li.moderation === 'rejected' ? 'red' : 'rgba(255,0,0,0.08)',
              },
            }}
            onClick={() => onModeration(li.id, 'rejected')}
          >
            Reject
          </Button>

          <Text sx={{ fontSize: 1, ml: 2 }}>Stage override:</Text>

          <Select
            value={local?.stageOverride ?? ''}
            onChange={(e) => onStageOverride(li.id, e.target.value as ScisStage | '')}
            sx={selectSx}
          >
            <option value="">Auto ({effStage})</option>
            {STAGE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                Stage {s}
              </option>
            ))}
          </Select>

          <Button
            variant="outline"
            onClick={() => onDelete(li.id)}
            sx={{ color: 'red', borderColor: 'red', fontSize: 0 , marginLeft:360}}
          >
            Delete
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export const AdminInitiativesPage = () => {
  const [localInitiatives, setLocalInitiatives] = useState<ScisLocalInitiative[]>([]);
  const [serverInitiatives, setServerInitiatives] = useState<any[]>([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    setLocalInitiatives(scisStore.listLocalInitiatives());
    scisService.getInitiatives().then(setServerInitiatives);
  }, [version]);

  useEffect(() => {
    return scisStore.subscribe(() => setVersion((v) => v + 1));
  }, []);

  const handleModeration = (initiativeId: string, status: ScisModerationStatus) => {
    scisStore.setModeration(initiativeId, status);
    setVersion((v) => v + 1);
  };

  const handleStageOverride = (initiativeId: string, stage: ScisStage | '') => {
    scisStore.setStageOverride(initiativeId, stage ? (stage as ScisStage) : undefined);
    setVersion((v) => v + 1);
  };

  const handleDelete = (initiativeId: string) => {
    if (confirm('Delete this local initiative? This cannot be undone.')) {
      scisStore.deleteLocalInitiative(initiativeId);
      setVersion((v) => v + 1);
    }
  };

  const supporterCountStrict = (initiativeId: string, serverCount = 0) =>
    scisStore.getSupporterCountStrict(initiativeId, serverCount);

  const membershipCount = (id: string, serverCount = 0) => scisStore.getUniqueMembershipCount(id, serverCount);

  const championCount = (id: string, serverCount = 0) => scisStore.getUniqueChampionCount(id, serverCount);

  const volunteerCount = (id: string) => scisStore.getCountByType(id, 'volunteer_skills');
  const donateCount = (id: string) => scisStore.getCountByType(id, 'donate');

  const handleUpdateInitiative = (
    initiativeId: string,
    updates: { title?: string; description?: string; projectType?: ScisProjectType },
  ) => {
    scisStore.updateLocalInitiative(initiativeId, updates);
    setVersion((v) => v + 1);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Heading as="h1">Admin: SCIS Initiatives</Heading>
        <Link to="/map">
          <Button variant="outline">Back to Map</Button>
        </Link>
      </Flex>

      <Box sx={{ mb: 4 }}>
        <Heading as="h2" variant="small" sx={{ mb: 2 }}>
          Local Submissions (client-first)
        </Heading>

        {localInitiatives.length === 0 ? (
          <Text sx={{ color: 'grey' }}>No local initiatives yet.</Text>
        ) : (
          <Flex sx={{ flexDirection: 'column', gap: 2 }}>
            {localInitiatives.map((li) => (
              <LocalInitiativeCard
                key={li.id}
                li={li}
                onModeration={handleModeration}
                onStageOverride={handleStageOverride}
                onDelete={handleDelete}
                onUpdate={handleUpdateInitiative}
                supporterCountStrict={(id) => supporterCountStrict(id)}
                membershipCount={(id) => membershipCount(id)}
                championCount={(id) => championCount(id)}
                volunteerCount={volunteerCount}
                donateCount={donateCount}
              />
            ))}
          </Flex>
        )}
      </Box>

      <Box>
        <Heading as="h2" variant="small" sx={{ mb: 2 }}>
          Server / Demo Initiatives
        </Heading>

        {serverInitiatives.length === 0 ? (
          <Text sx={{ color: 'grey' }}>No server initiatives.</Text>
        ) : (
          <Flex sx={{ flexDirection: 'column', gap: 2 }}>
            {serverInitiatives.map((si) => {
              const rawId = String(si.id);
              const local = scisStore.getLocalState(rawId);
              const baseStage = Number(si.stage ?? 1);

              const serverCounts = {
                supporters: Number(si.supporter_count ?? 0),
                members: Number(si.member_count ?? 0),
                champions: Number(si.champion_count ?? 0),
              };

              const effStage = computeEffectiveStage(baseStage, local, serverCounts);
              const supportCount = supporterCountStrict(rawId, serverCounts.supporters);

              return (
                <Box
                  key={si.id}
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'muted',
                    borderRadius: 2,
                    bg: 'background',
                  }}
                >
                  <Heading as="h3" sx={{ fontSize: 2, mb: 1 }}>
                    {si.title}
                  </Heading>

                  <Text sx={{ fontSize: 1, color: 'grey', mb: 1 }}>{si.description || '—'}</Text>

                  <Text sx={{ fontSize: 0, color: 'grey' }}>
                    Base stage {baseStage} · Effective stage {effStage} · {supportCount} supporters (strict) ·{' '}
                    {membershipCount(rawId, serverCounts.members)} members · {championCount(rawId, serverCounts.champions)} champions
                  </Text>

                  <Flex sx={{ gap: 2, mt: 2, alignItems: 'center' }}>
                    <Text sx={{ fontSize: 1 }}>Stage override:</Text>

                    <Select
                      value={local?.stageOverride ?? ''}
                      onChange={(e) => handleStageOverride(rawId, e.target.value as ScisStage | '')}
                      sx={selectSx}
                    >
                      <option value="">Auto ({effStage})</option>
                      {STAGE_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          Stage {s}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        )}
      </Box>
    </Box>
  );
};