import { Box, Flex, Heading, Image, Text, Grid } from 'theme-ui'
import arrow from 'packages/components/assets/icons/icon-arrow-down.svg'

export const Impact = () => {
  return (
    <>
      <Box sx={{ bg: '#f4efe6', py: 7 }}>
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
            src="/images/workshop.jpg"
            sx={{
              width: ['100%', '100%', '48%'],
              borderRadius: '20px',
            }}
          />

          <Box sx={{ width: ['100%', '100%', '52%'] }}>
            <Heading sx={headingStyle}>
              WHAT HAPPENS ONCE WE’RE FUNDED?
            </Heading>

            <Text sx={paragraph}>
              At SCIS, we make it easier for communities to build and operate
              shared infrastructure—especially equipment lending libraries
              known as Thingeries. Once we secure funding, we partner with
              community groups, housing co-ops, or municipalities to bring
              these projects to life using a proven step-by-step process.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box sx={{ bg: '#f4efe6', py: 7 }}>
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
              Are you a community organization or resident group looking to
              host shared infrastructure? Here’s what to expect:
            </Text>

            <Box
              sx={{
                bg: '#3F6B66',
                color: 'white',
                px: 4,
                py: 3,
                borderRadius: '8px',
                width: 'fit-content',
                fontSize: 1,
              }}
            >
              INTERESTED IN HOSTING? CONTACT US →
            </Box>
          </Box>

          <Box sx={{ width: ['100%', '100%', '60%'], position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                left: '18px',
                top: 0,
                bottom: 0,
                width: '2px',
                bg: '#3F6B66',
              }}
            />

            <Step
              title="EXPRESSION OF INTEREST"
              text="You reach out to SCIS with an interest in hosting a Thingery or similar lending project."
            />

            <Step
              title="COMMUNITY ENGAGEMENT"
              text="We help assess community needs and interest, often through meetings or surveys."
            />

            <Step
              title="SITE SELECTION & PLANNING"
              text="We work with you to identify a suitable location and confirm project requirements."
            />

            <Step
              title="BUILD & INSTALL"
              text="Once funding is confirmed, we assist with infrastructure setup—including procurement and installation support."
            />

            <Step
              title="LAUNCH & SUPPORT"
              text="We help promote your launch, onboard members, and ensure the space operates smoothly."
            />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

const Step = ({ title, text }) => (
  <Flex sx={{ gap: 4, mb: 6, position: 'relative' }}>
    <Box sx={{ minWidth: '36px' }}>
      <img
        src={arrow}
        style={{ width: '22px', marginTop: '4px' }}
      />
    </Box>

    <Box>
      <Heading sx={{ fontSize: 4, mb: 2 }}>
        {title}
      </Heading>
      <Text sx={{ fontSize: 2 }}>{text}</Text>
    </Box>
  </Flex>
)

const headingStyle = {
  fontSize: [8, 9, 10],
  fontFamily: 'serif',
  fontWeight: 500,
  color: '#3F6B66',
  mb: 3,
  lineHeight: 1.1,
}

const paragraph = {
  fontSize: 3,
  lineHeight: 1.6,
}