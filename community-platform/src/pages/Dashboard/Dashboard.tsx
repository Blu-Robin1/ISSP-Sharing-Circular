import { Box, Heading, Text } from 'theme-ui';

export const Dashboard = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Heading as="h1" sx={{ mb: 3 }}>
        Organnizer's Dashboard
      </Heading>
      <Text>
        This is the organizer's dashboard.
      </Text>
    </Box>
  );
};