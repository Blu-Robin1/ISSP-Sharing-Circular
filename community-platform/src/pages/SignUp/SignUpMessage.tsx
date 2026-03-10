import { HeroBanner, Icon } from 'oa-components';
import { Box, Card, Flex, Heading, Text, Image } from 'theme-ui';
import bcitLogo from 'oa-themes/assets/images/bcit-footer.png';

const SignUpMessagePage = ({ email }) => {
  return (
    <Flex
      sx={{
        bg: 'inherit',
        px: 2,
        width: '100%',
        maxWidth: '620px',
        mx: 'auto',
        mt: [15, 20],
        mb: 3,
      }}
    >
      <Flex sx={{ flexDirection: 'column', width: '100%' }}>
        <HeroBanner type="email" />
        <Flex
          sx={{
            flexDirection: 'column',
            transform: 'translateY(-50px)',
          }}
        >
          <Box
            sx={{
              alignSelf: 'center',
              border: '2px solid #000',
              borderRadius: 25,
              zIndex: 3,
            }}
          >
            <Image
              src={bcitLogo}
              alt="BCIT Logo"
              sx={{
                width: '68px',
                height: '68px',
                backgroundColor: '#fff',
                border: '5px solid #fff',
                borderRadius: '50%',
                padding: 0,
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </Box>
          <Card sx={{ borderRadius: 3, transform: 'translateY(-25px)' }}>
            <Flex
              sx={{
                padding: 4,
                paddingTop: 6,
                gap: 2,
                flexDirection: 'column',
              }}
            >
              <Flex
                sx={{
                  gap: 1,
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Heading>Welcome to BCIT!</Heading>
              </Flex>
              <Text sx={{ textAlign: 'center', color: 'grey' }}>
                <p>
                  Please confirm your email address by clicking the verification link sent to {' '}
                  <Text
                    sx={{
                      background: 'linear-gradient(0deg, #ffe2e1 60%, #fff 40%)',
                      paddingX: 1,
                    }}
                  >
                    {email}
                  </Text>
                </p>
              </Text>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUpMessagePage;