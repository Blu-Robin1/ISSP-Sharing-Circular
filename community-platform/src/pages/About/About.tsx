import { Box, Flex, Heading, Image, Text, Grid } from 'theme-ui'
import ourStoryImage from 'packages/themes/assets/images/photos/our-story.webp'
import ourMissionImage from 'packages/themes/assets/images/photos/our-mission.webp'

export const About = () => {
  return (
    <>
      <Box
        sx={{
          bg: '#F5F1E8',
          pt: [5, 6, 7],
          pb: 6,
        }}
      >
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
            src={ourMissionImage}
            sx={{
              width: ['100%', '100%', '420px'],
              maxHeight: '480px',
              objectFit: 'cover',
              borderRadius: '20px',
              flexShrink: 0,
            }}
          />

          <Box sx={{ width: ['100%', '100%', '52%'] }}>
            <Heading sx={headingStyle}>OUR MISSION</Heading>

            <Text sx={paragraph}>
              To advance the circular economy by facilitating the development,
              funding, and implementation of shared infrastructure projects.
              SCIS works to create accessible, community-driven spaces that
              reduce material waste, promote sustainability, and foster
              equitable resource-sharing for all.
            </Text>

            <Heading sx={{ ...headingStyle, mt: 6 }}>
              OUR VISION
            </Heading>

            <Text sx={paragraph}>
              That every community, no matter its size, has access to shared
              infrastructure that empowers individuals and organizations to
              reduce waste, share resources, and build a more sustainable
              and connected society.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Box sx={{ bg: '#F5F1E8', py: 7 }}>
        <Grid
          sx={{
            maxWidth: '1000px',
            mx: 'auto',
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr'],
            gap: 6,
            alignItems: 'start',
          }}
        >
          <Heading sx={headingStyle}>OUR VALUES</Heading>

          <Grid
            sx={{
              gridColumn: ['auto', 'auto', 'span 2'],
              gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
              gap: 6,
            }}
          >
            <Value
              title="EQUITY & ACCESSIBILITY"
              text="We prioritize access for underserved and financially vulnerable communities."
            />

            <Value
              title="SUSTAINABLE SYSTEMS"
              text="We support systems that reduce waste and promote long-term environmental responsibility."
            />

            <Value
              title="COMMUNITY EMPOWERMENT"
              text="We believe in the power of grassroots action and collaborative local solutions."
            />

            <Value
              title="PARTNERSHIP & INNOVATION"
              text="We work with organizations, governments, and funders to bring shared infrastructure projects to life."
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bg: '#2e5e5d', color: 'white', py: 6 }}>
        <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
          <Flex
            sx={{
              gap: 5,
              flexDirection: ['column', 'column', 'row'],
              mb: 5,
            }}
          >
            <Heading sx={{ fontSize: [9, 10, 11] }}>OUR STORY</Heading>

            <Box sx={{ maxWidth: '650px' }}>
              <Text sx={{ fontSize: 3, lineHeight: 1.6 }}>
                SCIS was created to make shared infrastructure more accessible
                across communities in Canada. As interest in lending libraries
                and other sharing-based systems grew, we saw the need for a
                dedicated nonprofit that could help communities build, fund,
                and manage these spaces—especially in areas where access and
                opportunity are limited. We believe that circular innovation shouldn’t be a luxury—it
                should be a right. Our work focuses on equipping communities
                with the tools and support they need to reduce material waste
                and increase social connection.
              </Text>
            </Box>
          </Flex>

          <Image
            src={ourStoryImage}
            sx={{
              width: '100%',
              borderRadius: '20px',
            }}
          />
        </Box>
      </Box>
    </>
  )
}

const headingStyle = {
  fontSize: [9, 10, 11],
  fontFamily: 'serif',
  fontWeight: 500,
  color: '#2e5e5d',
  mb: 3,
  lineHeight: 1.1,
}

const paragraph = {
  fontSize: 3,
  lineHeight: 1.6,
}

const Value = ({ title, text }) => (
  <Box
    sx={{
      borderTop: '1px solid #2e2e2e',
      pt: 4,
    }}
  >
    <Heading sx={{ fontSize: 5, mb: 2 }}>
      {title}
    </Heading>

    <Text sx={{ fontSize: 2 }}>
      {text}
    </Text>
  </Box>
)