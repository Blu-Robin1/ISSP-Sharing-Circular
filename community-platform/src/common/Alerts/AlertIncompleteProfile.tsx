import { observer } from 'mobx-react-lite';
import { Banner, InternalLink } from 'oa-components';
import { useProfileStore } from 'src/stores/Profile/profile.store';
import { Flex } from 'theme-ui';

export const AlertIncompleteProfile = observer(() => {
  const { isComplete } = useProfileStore();

  if (isComplete !== false) {
    return null;
  }

  return (
    <InternalLink to="/settings">
      <Flex data-cy="incompleteProfileBanner">
        <Banner sx={{ backgroundColor: 'softblue', color: 'black', cursor: 'hand' }}>
          Welcome! Please complete your profile before creating posts.
        </Banner>
      </Flex>
    </InternalLink>
  );
});