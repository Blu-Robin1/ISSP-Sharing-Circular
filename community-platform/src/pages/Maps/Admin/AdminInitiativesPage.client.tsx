import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Box, Button, Flex, Heading, Text, Badge, Select, Input, Textarea, Label } from 'theme-ui';
import { scisService, type NormalizedInitiative } from '../scis.service';
import { computeEffectiveStage, type ScisModerationStatus, type ScisStage, type ScisProjectType } from '../scis.store';

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

type Supporter = {
  id: string;
  name: string | null;
  email: string | null;
  postal_code: string | null;
  created_at: string;
};

type Contribution = {
  id: string;
  type: string;
  payload: Record<string, unknown> | null;
  created_at: string;
};

const InitiativeCard = (props: {
  initiative: NormalizedInitiative;
  onModeration: (id: string, s: ScisModerationStatus) => Promise<void>;
  onStageOverride: (id: string, s: ScisStage | '') => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (id: string, u: { title?: string; description?: string; projectType?: ScisProjectType }) => Promise<void>;
  onRefresh: () => Promise<void>;
}) => {
  const { initiative: i, onModeration, onStageOverride, onDelete, onUpdate, onRefresh } = props;

  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(i.title);
  const [editDesc, setEditDesc] = useState(i.description ?? '');
  const [editProjectType, setEditProjectType] = useState<ScisProjectType>(
    (i.project_type as ScisProjectType) ?? 'other',
  );
  const [busy, setBusy] = useState(false);
  const [selectedStageOverride, setSelectedStageOverride] = useState<string>(
    i.stage_override != null ? String(i.stage_override) : '',
  );

  useEffect(() => {
    setSelectedStageOverride(i.stage_override != null ? String(i.stage_override) : '');
  }, [i.stage_override]);

  const loadDetails = useCallback(async () => {
    setDetailsLoading(true);
    const data = await scisService.getInitiativeDetails(i.id);
    if (data) {
      setSupporters(data.supporters);
      setContributions(data.contributions);
    }
    setDetailsLoading(false);
  }, [i.id]);

  useEffect(() => {
    if (detailsExpanded && supporters.length === 0 && contributions.length === 0) {
      loadDetails();
    }
  }, [detailsExpanded, loadDetails, supporters.length, contributions.length]);

  const baseStage = Number(i.stage ?? 1);
  const serverCounts = {
    supporters: i.supporter_count,
    members: i.member_count,
    champions: i.champion_count,
  };
  const local = {
    stageOverride: (i.stage_override != null ? i.stage_override : undefined) as ScisStage | undefined,
    stage3Milestones: i.stage3_milestones ?? undefined,
  };
  const effStage = computeEffectiveStage(baseStage, local, serverCounts);

  const status = i.status ?? 'pending';
  const milestones = (i.stage3_milestones ?? {}) as Record<string, unknown>;
  const statusLabel =
    status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Pending approval';

  return (
    <Box
      sx={{
        p: 4,
        border: '1px solid',
        borderColor: status === 'pending' ? 'orange' : status === 'rejected' ? 'red' : 'muted',
        borderRadius: 3,
        bg: status === 'rejected' ? 'muted' : status === 'pending' ? 'softYellow' : 'background',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
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
                  disabled={busy}
                  onClick={async () => {
                    setBusy(true);
                    await onUpdate(i.id, {
                      title: editTitle,
                      description: editDesc,
                      projectType: editProjectType,
                    });
                    setEditing(false);
                    onRefresh();
                    setBusy(false);
                  }}
                >
                  Save
                </Button>

                <Button variant="outline" sx={{ fontSize: 0 }} onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </Flex>
            </>
          ) : (
            <>
              <Heading as="h3" sx={{ fontSize: 2, mb: 1 }}>
                {i.title}
              </Heading>

              <Text sx={{ fontSize: 1, color: 'grey', mb: 1 }}>{i.description || '—'}</Text>

              <Text sx={{ fontSize: 0, color: 'grey' }}>
                {i.lat.toFixed(4)}, {i.lng.toFixed(4)} · {i.supporter_count} supporters · {i.member_count} members ·{' '}
                {i.champion_count} champions · {i.volunteer_count} volunteers · {i.donate_count} donations
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
            </>
          )}
        </Box>

        {!editing && (
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 2,
              minWidth: 'fit-content',
            }}
          >
            <Badge
              variant={status === 'approved' ? 'primary' : status === 'rejected' ? 'secondary' : 'outline'}
              sx={{
                alignSelf: 'flex-end',
                px: 2,
                py: 1,
                borderRadius: 9999,
                fontSize: 0,
                whiteSpace: 'nowrap',
                bg: status === 'pending' ? 'orange' : undefined,
                color: status === 'pending' ? 'white' : undefined,
              }}
            >
              {statusLabel}
            </Badge>

            <Button variant="outline" sx={{ fontSize: 0 }} onClick={() => setEditing(true)}>
              Edit
            </Button>
          </Flex>
        )}
      </Flex>

      {!editing && (
        <Box
          sx={{
            mt: 3,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'muted',
          }}
        >
          <Text sx={{ fontSize: 1, fontWeight: 600, mb: 2, display: 'block' }}>Moderation</Text>

          <Flex sx={{ gap: 2, rowGap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              variant={status === 'approved' ? 'primary' : 'outline'}
              sx={{ fontSize: 0 }}
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                await onModeration(i.id, 'approved');
                onRefresh();
                setBusy(false);
              }}
            >
              Approve
            </Button>

            <Button
              variant="outline"
              sx={{
                fontSize: 0,
                color: status === 'rejected' ? 'white' : 'red',
                borderColor: 'red',
                bg: status === 'rejected' ? 'red' : 'transparent',
                '&:hover': { bg: status === 'rejected' ? 'red' : 'rgba(255,0,0,0.08)' },
              }}
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                await onModeration(i.id, 'rejected');
                onRefresh();
                setBusy(false);
              }}
            >
              Reject
            </Button>

            <Text sx={{ fontSize: 1 }}>Stage override:</Text>

            <Select
              value={selectedStageOverride}
              onChange={async (e) => {
                const rawValue = e.target.value;
                const val = rawValue === '' ? '' : (Number(rawValue) as ScisStage);

                setSelectedStageOverride(rawValue);
                setBusy(true);

                const success = await onStageOverride(i.id, val);
                if (!success) {
                  setSelectedStageOverride(i.stage_override != null ? String(i.stage_override) : '');
                }

                await onRefresh();
                setBusy(false);
              }}
              disabled={busy}
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
              onClick={async () => {
                if (!confirm('Delete this project? This cannot be undone.')) return;
                setBusy(true);
                await onDelete(i.id);
                onRefresh();
                setBusy(false);
              }}
              disabled={busy}
              sx={{ color: 'red', borderColor: 'red', fontSize: 0, marginLeft: 200 }}
            >
              Delete
            </Button>
          </Flex>
        </Box>
      )}

      <Box sx={{ mt: 3, borderTop: '1px solid', borderColor: 'muted', pt: 2 }}>
        <Button variant="outline" sx={{ fontSize: 0 }} onClick={() => setDetailsExpanded(!detailsExpanded)}>
          {detailsExpanded ? 'Hide' : 'View'} supporters & contributors
        </Button>

        {detailsExpanded && (
          <Box sx={{ mt: 2 }}>
            {detailsLoading ? (
              <Text sx={{ fontSize: 0, color: 'grey' }}>Loading…</Text>
            ) : (
              <>
                <Heading as="h5" sx={{ fontSize: 1, mb: 1 }}>
                  Supporters ({supporters.length})
                </Heading>

                {supporters.length === 0 ? (
                  <Text sx={{ fontSize: 0, color: 'grey', mb: 2 }}>None yet</Text>
                ) : (
                  <Box sx={{ mb: 2, maxHeight: 120, overflowY: 'auto' }}>
                    {supporters.map((s) => (
                      <Text key={s.id} sx={{ fontSize: 0, display: 'block' }}>
                        {s.name || '—'} · {s.email || '—'} · {s.postal_code || '—'}
                      </Text>
                    ))}
                  </Box>
                )}

                <Heading as="h5" sx={{ fontSize: 1, mb: 1 }}>
                  Contributions (volunteers, members, champions, donations) ({contributions.length})
                </Heading>

                {contributions.length === 0 ? (
                  <Text sx={{ fontSize: 0, color: 'grey' }}>None yet</Text>
                ) : (
                  <Box sx={{ maxHeight: 120, overflowY: 'auto' }}>
                    {contributions.map((c) => (
                      <Text key={c.id} sx={{ fontSize: 0, display: 'block' }}>
                        {c.type} · {c.payload ? JSON.stringify(c.payload) : '—'}
                      </Text>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const AdminProjectsPage = () => {
  const [initiatives, setInitiatives] = useState<NormalizedInitiative[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const list = await scisService.getInitiatives('all', true);
    setInitiatives(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleModeration = async (initiativeId: string, status: ScisModerationStatus) => {
    await scisService.updateInitiative(initiativeId, { status });
  };

  const handleStageOverride = async (initiativeId: string, stage: ScisStage | '') => {
    return await scisService.updateInitiative(initiativeId, {
      stageOverride: stage === '' ? null : Number(stage),
    });
  };

  const handleDelete = async (initiativeId: string) => {
    await scisService.deleteInitiative(initiativeId);
  };

  const handleUpdate = async (
    initiativeId: string,
    updates: { title?: string; description?: string; projectType?: ScisProjectType },
  ) => {
    await scisService.updateInitiative(initiativeId, updates);
  };

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', p: [3, 4] }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Heading as="h1" sx={{ fontSize: [3, 4] }}>
          Admin: SCIS Projects
        </Heading>

        <Flex sx={{ gap: 2 }}>
          <Button variant="outline" onClick={refresh} disabled={loading}>
            Refresh
          </Button>

          <Link to="/map">
            <Button variant="outline">Back to Map</Button>
          </Link>
        </Flex>
      </Flex>

      {loading ? (
        <Text sx={{ color: 'grey' }}>Loading…</Text>
      ) : initiatives.length === 0 ? (
        <Text sx={{ color: 'grey' }}>No projects yet.</Text>
      ) : (
        <Flex sx={{ flexDirection: 'column', gap: 3 }}>
          {initiatives.map((initiative) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              onModeration={handleModeration}
              onStageOverride={handleStageOverride}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onRefresh={refresh}
            />
          ))}
        </Flex>
      )}
    </Box>
  );
};

export { AdminProjectsPage, AdminProjectsPage as AdminInitiativesPage };