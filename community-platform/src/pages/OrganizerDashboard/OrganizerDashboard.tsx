import type { UserCreatedDocs } from 'oa-shared';
import { useMemo, useRef, useState } from 'react';
import { Box, Button, Card, Flex, Grid, Heading, Text } from 'theme-ui';

interface OrganizerDashboardProps {
  userCreatedDocs: UserCreatedDocs;
}

type DashboardTab = 'projects' | 'donations' | 'saved';

export const OrganizerDashboard = ({ userCreatedDocs }: OrganizerDashboardProps) => {
  const projects = userCreatedDocs.projects || [];
  const [selectedProject, setSelectedProject] = useState<any>(projects[0] || null);
  const [activeTab, setActiveTab] = useState<DashboardTab>('projects');
  const approvedVolunteersRef = useRef<HTMLDivElement | null>(null);

  // Replaced hardcoded slices with a generic filter (assumes a 'isSaved' boolean exists on the project, otherwise defaults to empty)
  const savedItems = useMemo(() => projects.filter((p: any) => p.isSaved) || [], [projects]);

  // Removed hardcoded mock data. Now expects data to be attached to the project object itself.
  const donationEntries = useMemo(() => {
    if (!selectedProject || !selectedProject.donationsList) return [];
    return selectedProject.donationsList;
  }, [selectedProject]);

  const approvedVolunteers = useMemo(() => {
    if (!selectedProject || !selectedProject.volunteersList) return [];
    return selectedProject.volunteersList;
  }, [selectedProject]);

  const topCards = [
    {
      key: 'projects' as const,
      title: 'My Projects',
      desc: `${projects.length} active items`,
    },
    {
      key: 'donations' as const,
      title: 'My Donations',
      desc: 'Track support connected to your projects',
    },
    {
      key: 'saved' as const,
      title: 'Saved',
      desc: 'Quick access to important items',
    },
  ];

  const handleSelectProject = (project: any) => {
    setSelectedProject(project);
    // If they click a project while in the 'saved' tab, redirect them to the projects tab to see it
    if (activeTab === 'saved') {
      setActiveTab('projects');
    }
  };

  const handleViewDonations = () => {
    setActiveTab('donations');
  };

  const handleViewVolunteers = () => {
    setActiveTab('projects');
    setTimeout(() => {
      approvedVolunteersRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  return (
    <Box sx={{ px: [3, 4, 5], py: 4, maxWidth: '1400px', mx: 'auto' }}>
      <Heading sx={{ fontSize: '42px', mb: 2 }}>Organizer Dashboard</Heading>
      <Text sx={{ color: '#5f646d', mb: 4 }}>
        Manage your projects, monitor engagement, and keep important details up to date.
      </Text>

      {/* Top Navigation Cards */}
      <Grid columns={[1, 1, 3]} gap={3} sx={{ mt: 4, mb: 4 }}>
        {topCards.map((card) => (
          <Card
            key={card.key}
            onClick={() => setActiveTab(card.key)}
            sx={{
              p: 3,
              borderRadius: '14px',
              cursor: 'pointer',
              bg: activeTab === card.key ? 'softblue' : 'white',
              border: '1px solid',
              borderColor: activeTab === card.key ? 'blue' : 'softgrey',
            }}
          >
            <Heading as="h3" sx={{ mb: 2 }}>
              {card.title}
            </Heading>
            <Text sx={{ color: '#5f646d' }}>{card.desc}</Text>
          </Card>
        ))}
      </Grid>

      {/* Main Content Area: Sidebar on the left, dynamic content on the right */}
      <Grid columns={[1, 1, '320px 1fr']} gap={4}>
        {/* SIDEBAR: Rendered only once! */}
        <Box>
          <Heading sx={{ mb: 3 }}>My Projects</Heading>
          <Flex sx={{ flexDirection: 'column', gap: 3 }}>
            {projects.map((project: any) => {
              const isSelected = selectedProject?.id === project.id;
              return (
                <Card
                  key={project.id}
                  onClick={() => handleSelectProject(project)}
                  sx={{
                    p: 3,
                    borderRadius: '14px',
                    bg: isSelected ? 'softblue' : 'white',
                    border: '1px solid',
                    borderColor: isSelected ? 'blue' : 'softgrey',
                    minHeight: '92px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Flex
                    sx={{
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 3,
                    }}
                  >
                    <Text sx={{ fontWeight: 600, flex: 1 }}>{project.title}</Text>
                    <Box sx={{ minWidth: '90px', textAlign: 'right' }}>
                      <Text sx={{ fontSize: '13px', color: '#5f646d' }}>
                        {project.status || 'Active'}
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              );
            })}
          </Flex>
        </Box>

        {/* DYNAMIC RIGHT PANEL */}
        <Box>
          {/* VIEW: PROJECTS */}
          {activeTab === 'projects' && selectedProject && (
            <Card
              sx={{
                p: 4,
                borderRadius: '18px',
                border: '1px solid',
                borderColor: 'softgrey',
                minHeight: '980px',
              }}
            >
              <Flex
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 3,
                  gap: 3,
                }}
              >
                <Heading sx={{ fontSize: '36px', flex: 1 }}>{selectedProject.title}</Heading>
                <Box sx={{ minWidth: '140px', textAlign: 'right' }}>
                  <Box
                    sx={{
                      px: 3,
                      py: 2,
                      borderRadius: '999px',
                      bg: 'softyellow',
                      border: '1px solid',
                      borderColor: 'softgrey',
                      display: 'inline-block',
                    }}
                  >
                    <Text sx={{ fontSize: '13px', fontWeight: 600 }}>
                      Status: {selectedProject.status || 'Active'}
                    </Text>
                  </Box>
                </Box>
              </Flex>

              <Box
                sx={{
                  height: '300px',
                  bg: 'offWhite',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: 'softgrey',
                  mb: 4,
                  backgroundImage: selectedProject.image ? `url(${selectedProject.image})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <Heading as="h3" sx={{ mb: 2 }}>
                Description
              </Heading>
              <Text sx={{ color: '#5f646d', mb: 4, lineHeight: 1.6 }}>
                {selectedProject.description || 'No description added.'}
              </Text>

              <Flex sx={{ gap: 3, mb: 5 }}>
                <Button sx={{ bg: 'blue', color: 'black' }}>Edit</Button>
                <Button
                  sx={{
                    bg: 'softyellow',
                    border: '1px solid',
                    borderColor: 'softgrey',
                  }}
                >
                  Save
                </Button>
              </Flex>

              <Grid columns={[1, 2]} gap={3} sx={{ mb: 5 }}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: '14px',
                    bg: 'softyellow',
                    border: '1px solid',
                    borderColor: 'softgrey',
                    minHeight: '170px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Heading as="h4" sx={{ mb: 3 }}>
                      Donations
                    </Heading>
                    <Text sx={{ fontSize: '28px', fontWeight: 700 }}>
                      {selectedProject.donations || 0}
                    </Text>
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      onClick={handleViewDonations}
                      sx={{
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'softgrey',
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Card>

                <Card
                  sx={{
                    p: 3,
                    borderRadius: '14px',
                    bg: 'softyellow',
                    border: '1px solid',
                    borderColor: 'softgrey',
                    minHeight: '170px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Heading as="h4" sx={{ mb: 3 }}>
                      Volunteers
                    </Heading>
                    <Text sx={{ fontSize: '28px', fontWeight: 700 }}>
                      {selectedProject.volunteers || 0}
                    </Text>
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      onClick={handleViewVolunteers}
                      sx={{
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'softgrey',
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Card>
              </Grid>

              <Grid columns={[1, 2]} gap={3}>
                <Card
                  ref={approvedVolunteersRef as any}
                  sx={{
                    p: 3,
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: 'softgrey',
                  }}
                >
                  <Heading as="h3" sx={{ mb: 2 }}>
                    Approved Volunteers
                  </Heading>
                  <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                    {approvedVolunteers.length > 0 ? (
                      approvedVolunteers.map((v: any) => (
                        <Box
                          key={v.id}
                          sx={{
                            p: 2,
                            borderRadius: '10px',
                            bg: 'offWhite',
                            border: '1px solid',
                            borderColor: 'softgrey',
                          }}
                        >
                          <Flex
                            sx={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <Text sx={{ fontWeight: 600 }}>{v.name}</Text>
                            <Box sx={{ minWidth: '120px', textAlign: 'right' }}>
                              <Text sx={{ fontSize: '13px', color: '#5f646d' }}>{v.status}</Text>
                            </Box>
                          </Flex>
                        </Box>
                      ))
                    ) : (
                      <Text sx={{ color: '#5f646d', fontSize: '13px' }}>No volunteers yet.</Text>
                    )}
                  </Flex>
                </Card>

                <Card
                  sx={{
                    p: 3,
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: 'softgrey',
                  }}
                >
                  <Heading as="h3" sx={{ mb: 2 }}>
                    Approved Donations
                  </Heading>
                  <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                    {donationEntries.length > 0 ? (
                      donationEntries.map((d: any) => (
                        <Box
                          key={d.id}
                          sx={{
                            p: 2,
                            borderRadius: '10px',
                            bg: 'offWhite',
                            border: '1px solid',
                            borderColor: 'softgrey',
                          }}
                        >
                          <Flex
                            sx={{
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: 3,
                            }}
                          >
                            <Text sx={{ fontWeight: 600 }}>{d.donor}</Text>
                            <Box sx={{ minWidth: '130px', textAlign: 'right' }}>
                              <Text sx={{ fontSize: '13px', color: '#5f646d' }}>
                                {d.amount} • {d.date}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      ))
                    ) : (
                      <Text sx={{ color: '#5f646d', fontSize: '13px' }}>No donations yet.</Text>
                    )}
                  </Flex>
                </Card>
              </Grid>
            </Card>
          )}

          {/* VIEW: DONATIONS */}
          {activeTab === 'donations' && (
            <Card
              sx={{
                p: 4,
                borderRadius: '18px',
                border: '1px solid',
                borderColor: 'softgrey',
                minHeight: '980px',
              }}
            >
              <Flex
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  gap: 3,
                }}
              >
                <Box>
                  <Heading sx={{ mb: 2 }}>My Donations</Heading>
                  <Text sx={{ color: '#5f646d' }}>
                    Donation activity connected to {selectedProject?.title || 'your project'}.
                  </Text>
                </Box>
                <Button
                  onClick={() => setActiveTab('projects')}
                  sx={{
                    bg: 'softyellow',
                    border: '1px solid',
                    borderColor: 'softgrey',
                  }}
                >
                  Back to Project
                </Button>
              </Flex>

              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                {donationEntries.length > 0 ? (
                  donationEntries.map((d: any) => (
                    <Card
                      key={d.id}
                      sx={{
                        p: 3,
                        borderRadius: '14px',
                        bg: 'softyellow',
                        border: '1px solid',
                        borderColor: 'softgrey',
                      }}
                    >
                      <Flex
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 3,
                        }}
                      >
                        <Text sx={{ fontWeight: 600 }}>{d.donor}</Text>
                        <Box sx={{ minWidth: '130px', textAlign: 'right' }}>
                          <Text sx={{ color: '#5f646d', fontSize: '13px' }}>
                            {d.amount} • {d.date}
                          </Text>
                        </Box>
                      </Flex>
                    </Card>
                  ))
                ) : (
                  <Text sx={{ color: '#5f646d' }}>No donations recorded for this project.</Text>
                )}
              </Flex>
            </Card>
          )}

          {/* VIEW: SAVED */}
          {activeTab === 'saved' && (
            <Card
              sx={{
                p: 4,
                borderRadius: '18px',
                border: '1px solid',
                borderColor: 'softgrey',
                minHeight: '980px',
              }}
            >
              <Heading sx={{ mb: 3 }}>Saved Items</Heading>
              {savedItems.length === 0 ? (
                <Text sx={{ color: '#5f646d' }}>No saved items yet.</Text>
              ) : (
                <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                  {savedItems.map((item: any) => (
                    <Card
                      key={item.id}
                      onClick={() => handleSelectProject(item)}
                      sx={{
                        p: 3,
                        borderRadius: '14px',
                        cursor: 'pointer',
                        bg: 'softyellow',
                        border: '1px solid',
                        borderColor: 'softgrey',
                      }}
                    >
                      <Flex
                        sx={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 3,
                        }}
                      >
                        <Text sx={{ fontWeight: 600 }}>{item.title}</Text>
                        <Box sx={{ minWidth: '130px', textAlign: 'right' }}>
                          <Text sx={{ fontSize: '13px', color: '#5f646d' }}>Click to open</Text>
                        </Box>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              )}
            </Card>
          )}
        </Box>
      </Grid>
    </Box>
  );
};
