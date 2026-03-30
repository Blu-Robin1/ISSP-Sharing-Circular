import type { UserCreatedDocs } from 'oa-shared';
import { Box, Heading, Text, Grid, Flex } from 'theme-ui';
import UserCreatedDocuments from '../User/content/UserCreatedDocuments';

interface OrganizerDashboardProps {
  userCreatedDocs: UserCreatedDocs;
}

export const OrganizerDashboard = ({ userCreatedDocs }: OrganizerDashboardProps) => {
  const totalItems = userCreatedDocs.projects.length + userCreatedDocs.research.length + userCreatedDocs.questions.length;

  return (
    <Box sx={{ p: 4 }}>
      <Heading as="h1" sx={{ mb: 3 }}>
        Organizer Dashboard
      </Heading>
      <Text sx={{ mb: 4 }}>
        Manage your organized content and track your impact.
      </Text>

      {totalItems === 0 ? (
        <Text>No content created yet. Start by creating your first research project or library item!</Text>
      ) : (
        <Grid columns={[1, 2, 3]} gap={4}>
          <Box sx={{ p: 3, bg: 'muted', borderRadius: 4 }}>
            <Heading as="h3" variant="small">Total Projects</Heading>
            <Text sx={{ fontSize: 3, fontWeight: 'bold' }}>{userCreatedDocs.projects.length}</Text>
          </Box>
          <Box sx={{ p: 3, bg: 'muted', borderRadius: 4 }}>
            <Heading as="h3" variant="small">Total Research</Heading>
            <Text sx={{ fontSize: 3, fontWeight: 'bold' }}>{userCreatedDocs.research.length}</Text>
          </Box>
          <Box sx={{ p: 3, bg: 'muted', borderRadius: 4 }}>
            <Heading as="h3" variant="small">Total Questions</Heading>
            <Text sx={{ fontSize: 3, fontWeight: 'bold' }}>{userCreatedDocs.questions.length}</Text>
          </Box>
        </Grid>
      )}

      <Box sx={{ mt: 4 }}>
        <UserCreatedDocuments columns={1} docs={userCreatedDocs} />
      </Box>
    </Box>
  );
};