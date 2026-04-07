import { Category, Icon, IconCountWithTooltip, ModerationStatus, Username } from 'oa-components';
import { type Project, UserRole } from 'oa-shared';
import { Link as RouterLink } from 'react-router';
import { AuthWrapper } from 'src/common/AuthWrapper';
import { Highlighter } from 'src/common/Highlighter';
import { capitalizeFirstLetter } from 'src/utils/helpers';
import { Box, Card, Flex, Heading, Image } from 'theme-ui';
import { ProjectStageDisplay } from '../Common/ProjectStageDisplay';

type ProjectCardProps = {
  item: Project;
  query?: string;
};

export const ProjectCard = ({ item, query }: ProjectCardProps) => {
  const searchWords = [query || ''];

  return (
    <Card data-cy="card" sx={{ marginX: [2, 0] }}>
      <RouterLink to={`/library/${encodeURIComponent(item.slug)}`}>
        <Flex
          sx={{
            background: 'background',
            height: '60%',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {item.coverImage && (
            <Image
              style={{
                width: '100%',
                height: 'calc(((350px) / 3) * 2)',
                objectFit: 'cover',
              }}
              loading="lazy"
              src={item.coverImage?.publicUrl || ''}
              crossOrigin=""
              alt={`Cover image of ${item.title}`}
            />
          )}
          {item.moderation && item.moderation !== 'accepted' && (
            <ModerationStatus
              status={item.moderation}
              sx={{
                top: 2,
                position: 'absolute',
                right: 2,
                alignSelf: 'self-start',
              }}
            />
          )}
        </Flex>
        <Flex
          sx={{
            flexDirection: 'column',
            gap: 2,
            padding: 2,
            height: '40%',
            justifyContent: 'space-between',
          }}
        >
          <Flex sx={{ gap: 1, flexDirection: 'column' }}>
            <Heading as="h2" variant="small" color={'black'}>
              <Highlighter
                searchWords={searchWords}
                textToHighlight={capitalizeFirstLetter(item.title)}
              />
            </Heading>

            {item.author && (
              <Box>
                <Username user={item.author} />
              </Box>
            )}

            <ProjectStageDisplay
              stage={item.stage}
              stageOverride={item.stageOverride}
              supporterCount={item.supporterCount || 0}
              memberCount={item.memberCount || 0}
              championCount={item.championCount || 0}
              volunteerCount={item.volunteerCount || 0}
              donateCount={item.donateCount || 0}
              moderation={item.moderation}
            />
          </Flex>

          <AuthWrapper roleRequired={UserRole.BETA_TESTER} borderLess>
            <Flex sx={{ justifyContent: 'flex-end' }}>
              <Box
                sx={{
                  color: 'red',
                  padding: '2px',
                }}
              >
                {item.usefulVotesLastWeek}
              </Box>
            </Flex>
          </AuthWrapper>

          <Flex sx={{ justifyContent: 'flex-end' }}>
            {item.category && (
              <Flex sx={{ flex: 1 }}>
                <Category category={item.category} sx={{ color: 'black' }} />
              </Flex>
            )}

            <Flex
              sx={{
                gap: 2,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {item.lat && item.lng && (
                <RouterLink
                  to={`/maps?lat=${item.lat}&lng=${item.lng}&zoom=10`}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Icon glyph="location-on" size={16} />
                </RouterLink>
              )}
              <IconCountWithTooltip count={item.totalViews || 0} icon="show" text="Views" />
              <IconCountWithTooltip
                count={item.usefulCount || 0}
                icon="star-active"
                text="How useful is it"
              />
            </Flex>
          </Flex>
        </Flex>
      </RouterLink>
    </Card>
  );
};
