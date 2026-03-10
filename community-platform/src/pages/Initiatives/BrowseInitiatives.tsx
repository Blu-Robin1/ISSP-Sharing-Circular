import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Box, Button, Flex, Heading, Input, Select, Text } from 'theme-ui';
import { scisService, type NormalizedInitiative } from 'src/pages/Maps/scis.service';
import { computeEffectiveStage, type ScisStage } from 'src/pages/Maps/scis.store';

const STAGE_LABELS: Record<number, string> = {
  1: 'Stage 1',
  2: 'Stage 2',
  3: 'Stage 3',
  4: 'Stage 4',
};

const STATUS_LABELS: Record<string, string> = {
  approved: 'Approved',
  pending: 'Pending',
  rejected: 'Rejected',
};

export default function BrowseInitiatives() {
  const [initiatives, setInitiatives] = useState<NormalizedInitiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<number | ''>('');
  const [statusFilter, setStatusFilter] = useState('');

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const list = await scisService.getInitiatives('approved_and_pending', true);
      setInitiatives(list);
    } catch (error) {
      console.error('Failed to load initiatives', error);
      setInitiatives([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filteredInitiatives = useMemo(() => {
    let list = initiatives;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (initiative) =>
          initiative.title?.toLowerCase().includes(q) ||
          (initiative.description ?? '').toLowerCase().includes(q),
      );
    }

    if (stageFilter !== '') {
      const selectedStage = Number(stageFilter);

      list = list.filter((initiative) => {
        const baseStage = Number(initiative.stage ?? 1);
        const serverCounts = {
          supporters: initiative.supporter_count,
          members: initiative.member_count,
          champions: initiative.champion_count,
        };

        const local = {
          stageOverride:
            initiative.stage_override != null
              ? (initiative.stage_override as ScisStage)
              : undefined,
          stage3Milestones: initiative.stage3_milestones ?? undefined,
        };

        return computeEffectiveStage(baseStage, local, serverCounts) === selectedStage;
      });
    }

    if (statusFilter) {
      list = list.filter((initiative) => initiative.status === statusFilter);
    }

    return list;
  }, [initiatives, searchQuery, stageFilter, statusFilter]);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: [3, 4], py: 4 }}>
      <Flex
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Heading as="h1" sx={{ fontSize: [3, 4] }}>
          Browse Initiatives
        </Heading>

        <Link to="/map" style={{ textDecoration: 'none' }}>
          <Button variant="outline">View on Map</Button>
        </Link>
      </Flex>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', 'repeat(2, minmax(0, 1fr))', '2fr 1fr 1fr 1fr'],
          gap: 2,
          mb: 4,
          alignItems: 'stretch',
        }}
      >
        <Input
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: '100%',
            minWidth: 0,
          }}
        />

        <Select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value === '' ? '' : Number(e.target.value))}
          sx={{
            width: '100%',
            minWidth: 0,
          }}
        >
          <option value="">All stages</option>
          {[1, 2, 3, 4].map((stage) => (
            <option key={stage} value={stage}>
              {STAGE_LABELS[stage]}
            </option>
          ))}
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{
            width: '100%',
            minWidth: 0,
          }}
        >
          <option value="">All statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </Select>

        <Button
          variant="outline"
          onClick={refresh}
          disabled={loading}
          sx={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Refresh
        </Button>
      </Box>

      {loading ? (
        <Text sx={{ color: 'grey' }}>Loading…</Text>
      ) : filteredInitiatives.length === 0 ? (
        <Text sx={{ color: 'grey' }}>No initiatives found.</Text>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
            gap: 3,
          }}
        >
          {filteredInitiatives.map((initiative) => {
            const baseStage = Number(initiative.stage ?? 1);
            const serverCounts = {
              supporters: initiative.supporter_count,
              members: initiative.member_count,
              champions: initiative.champion_count,
            };

            const local = {
              stageOverride:
                initiative.stage_override != null
                  ? (initiative.stage_override as ScisStage)
                  : undefined,
              stage3Milestones: initiative.stage3_milestones ?? undefined,
            };

            const effectiveStage = computeEffectiveStage(baseStage, local, serverCounts);
            const statusLabel = STATUS_LABELS[initiative.status] ?? initiative.status;

            return (
              <Link
                key={initiative.id}
                to={`/map?initiative=${initiative.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box
                  sx={{
                    p: 3,
                    border: '1px solid',
                    borderColor: 'muted',
                    borderRadius: 2,
                    bg: 'background',
                    height: '100%',
                    transition: '0.2s ease',
                    '&:hover': {
                      borderColor: 'primary',
                      bg: 'softYellow',
                    },
                  }}
                >
                  <Flex
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    <Heading as="h3" sx={{ fontSize: 2, flex: 1 }}>
                      {initiative.title}
                    </Heading>
                    <Text
                      sx={{
                        fontSize: 0,
                        color: 'grey',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {statusLabel}
                    </Text>
                  </Flex>

                  <Text
                    sx={{
                      fontSize: 1,
                      color: 'grey',
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: '3.9em',
                    }}
                  >
                    {initiative.description || '—'}
                  </Text>

                  <Flex sx={{ gap: 2, flexWrap: 'wrap' }}>
                    <Text sx={{ fontSize: 0 }}>{STAGE_LABELS[effectiveStage]}</Text>
                    <Text sx={{ fontSize: 0, color: 'grey' }}>
                      {initiative.supporter_count} supporters · {initiative.member_count} members ·{' '}
                      {initiative.champion_count} champions
                    </Text>
                  </Flex>
                </Box>
              </Link>
            );
          })}
        </Box>
      )}
    </Box>
  );
}