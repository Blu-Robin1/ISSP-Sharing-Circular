import { ClientOnly } from 'remix-utils/client-only';
import { Box, Flex } from 'theme-ui';
import { ProfileButtonItem } from './ProfileButtonItem';
import './profile.css';

interface IProps {
  isMobile?: boolean;
}

const ProfileButtons = (props: IProps) => {
  const _commonMobileBtnStyle = {
    fontSize: 1,
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  };

  const greenButtonStyle = {
    backgroundColor: '#3F6B66',
    color: '#ffffff',
    borderRadius: '12px',
    px: 4,
    py: 2,
    fontFamily: '"Times New Roman", Times, serif',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#355c58',
    },
  };

  if (props.isMobile) {
    return (
      <Flex
        className="util__fade-in"
        sx={{
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            pt: 1,
            pb: 2,
            display: 'block',
          }}
        >
          <ClientOnly fallback={<></>}>
            {() => (
              <>
                <ProfileButtonItem
                  link="/sign-in"
                  text="Login"
                  variant="primary"
                  sx={{
                    ..._commonMobileBtnStyle,
                    ...greenButtonStyle,
                    color: '#ffffff',
                    marginRight: 2,
                    marginBottom: 2,
                  }}
                  isMobile={true}
                />
                <ProfileButtonItem
                  link="/sign-up"
                  text="Join"
                  variant="outline"
                  isMobile={true}
                  sx={{
                    ..._commonMobileBtnStyle,
                    ...greenButtonStyle,
                  }}
                />
              </>
            )}
          </ClientOnly>
        </Box>
      </Flex>
    );
  }

  return (
    <ClientOnly fallback={<></>}>
      {() => (
        <>
          <ProfileButtonItem
            link="/sign-in"
            text="Login"
            variant="primary"
            sx={{
              ...greenButtonStyle,
              marginRight: 2,
              fontSize: 2,
            }}
          />
          <ProfileButtonItem
            link="/sign-up"
            text="Join"
            variant="outline"
            sx={{
              ...greenButtonStyle,
              fontSize: 2,
            }}
          />
        </>
      )}
    </ClientOnly>
  );
};

export default ProfileButtons;
