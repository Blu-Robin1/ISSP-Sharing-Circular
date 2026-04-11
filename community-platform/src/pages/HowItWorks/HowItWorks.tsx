import onceFunded from 'packages/themes/assets/images/photos/funded.webp';
import { Box, Flex, Heading, Image, Text } from 'theme-ui';

export const HowItWorks = () => {
  return (
    <>
      <Box sx={{ bg: '#F5F1E8', py: 7 }}>
        <Flex
          sx={{
            maxWidth: '1000px',
            mx: 'auto',
            gap: 6,
            alignItems: 'center',
            flexDirection: ['column', 'column', 'row'],
          }}
        >
          <Image
            src={onceFunded}
            sx={{
              width: ['100%', '100%', '48%'],
              borderRadius: '20px',
              maxHeight: '480px',
            }}
          />

          <Box sx={{ width: ['100%', '100%', '52%'] }}>
            <Heading sx={headingStyle}>WHAT HAPPENS ONCE WE’RE FUNDED?</Heading>

            <Text sx={paragraph}>
              At SCIS, we make it easier for communities to build and operate shared
              infrastructure—especially equipment lending libraries known as Thingeries. Once we
              secure funding, we partner with community groups, housing co-ops, or municipalities to
              bring these projects to life using a proven step-by-step process.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box sx={{ bg: '#F5F1E8', py: 7 }}>
        <Flex
          sx={{
            maxWidth: '1000px',
            mx: 'auto',
            gap: 6,
            flexDirection: ['column', 'column', 'row'],
          }}
        >
          <Box sx={{ width: ['100%', '100%', '40%'] }}>
            <Heading sx={headingStyle}>FOR HOSTS.</Heading>

            <Text sx={{ mb: 4 }}>
              Are you a community organization or resident group looking to host shared
              infrastructure? Here’s what to expect:
            </Text>

            <a href="/sign-up" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  bg: '#3F6B66',
                  color: 'white',
                  px: 4,
                  py: 3,
                  borderRadius: '8px',
                  width: 'fit-content',
                  fontSize: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bg: '#2e514d',
                  },
                }}
              >
                INTERESTED IN HOSTING? Sign-in →
              </Box>
            </a>
          </Box>

          <Box sx={{ width: ['100%', '100%', '60%'] }}>
            <Step
              number="1"
              title="EXPRESSION OF INTEREST"
              text="You reach out to SCIS with an interest in hosting a Thingery or similar lending project."
            />
            <Step
              number="2"
              title="COMMUNITY ENGAGEMENT"
              text="We help assess community needs and interest, often through meetings or surveys."
            />
            <Step
              number="3"
              title="SITE SELECTION & PLANNING"
              text="We work with you to identify a suitable location and confirm project requirements."
            />
            <Step
              number="4"
              title="BUILD & INSTALL"
              text="Once funding is confirmed, we assist with infrastructure setup—including procurement and installation support."
            />
            <Step
              number="5"
              title="LAUNCH & SUPPORT"
              text="We help promote your launch, onboard members, and ensure the space operates smoothly."
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

const Step = ({ number, title, text }) => (
  <Flex
    sx={{
      gap: 1,
      mb: 6,
      alignItems: 'flex-start',
    }}
  >
    <Text
      sx={{
        fontSize: 8,
        fontWeight: 600,
        color: '#3F6B66',
        lineHeight: 1,
        minWidth: '40px',
        fontFamily: 'serif',
      }}
    >
      {number}
    </Text>

    <Box>
      <Heading sx={{ fontSize: 4, mb: 2 }}>{title}</Heading>
      <Text sx={{ fontSize: 2 }}>{text}</Text>
    </Box>
  </Flex>
);

const headingStyle = {
  fontSize: [8, 9, 10],
  fontFamily: 'serif',
  fontWeight: 500,
  color: '#3F6B66',
  mb: 3,
  lineHeight: 1.1,
};

const paragraph = {
  fontSize: 3,
  lineHeight: 1.6,
};

export default HowItWorks;
