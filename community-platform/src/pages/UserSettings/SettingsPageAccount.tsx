import { observer } from 'mobx-react';
import { Button, ExternalLink } from 'oa-components';
import { UserRole } from 'oa-shared';
import { Link } from 'react-router';
import { DISCORD_INVITE_URL } from 'src/constants';
import { useProfileStore } from 'src/stores/Profile/profile.store';
import { fields, headings } from 'src/pages/UserSettings/labels';
import { Flex, Heading, Text } from 'theme-ui';

import { PatreonIntegration } from './content/fields/PatreonIntegration';
import { ChangeEmailForm } from './content/sections/ChangeEmail.form';
import { ChangePasswordForm } from './content/sections/ChangePassword.form';

export const SettingsPageAccount = observer(() => {
  const { description, title } = fields.deleteAccount;
  const { isUserAuthorized } = useProfileStore();
  const isAdmin = isUserAuthorized(UserRole.ADMIN);

  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Flex sx={{ flexDirection: 'column', gap: 1 }}>
        <Heading as="h2">{headings.accountSettings}</Heading>
        <Text variant="quiet">Here you can manage the core settings of your account.</Text>
      </Flex>

      <PatreonIntegration />
      <ChangePasswordForm />
      <ChangeEmailForm />

      {isAdmin && (
        <Link to="/admin/initiatives">
          <Button variant="secondary">Admin panel</Button>
        </Link>
      )}

      <Text variant="body">
        {title}{' '}
        <ExternalLink sx={{ ml: 1, textDecoration: 'underline' }} href={DISCORD_INVITE_URL}>
          {description}
        </ExternalLink>
      </Text>
    </Flex>
  );
});
