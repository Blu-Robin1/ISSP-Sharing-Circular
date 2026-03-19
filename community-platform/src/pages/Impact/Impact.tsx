import { Box, Heading, Text } from 'theme-ui'
import ourImpactImage from 'packages/themes/assets/images/photos/impacts.webp'

export const Impact = () => {
  return (
    <Box
      sx={{
        background: `linear-gradient(rgba(245, 241, 232, 0.8), rgba(245, 241, 232, 0.8)), url(${ourImpactImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        width: '100%',
        pt: [5, 6, 7],
        pb: [5, 6, 7],
        px: [3, 4, 0],
      }}
    >
      <Box
        sx={{
          maxWidth: '800px',
          width: '100%',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Heading sx={headingStyle}>MEASURING WHAT MATTERS</Heading>
        <Text sx={paragraph}>
          We believe in data-backed, community-centered progress. SCIS tracks the 
          environmental and social impact of every shared infrastructure project we 
          support—ensuring that funders, hosts, and the public can see the difference 
          these spaces make.
        </Text>

        <Heading sx={{ ...headingStyle, mt: 6 }}>
          REDUCING WASTE BY KEEPING MATERIALS IN USE
        </Heading>
        <Text sx={paragraph}>
          Each SCIS site helps reduce waste by enabling borrowing instead of 
          buying—and by extending the life of donated items. This cuts down 
          on unnecessary consumption and keeps usable goods out of landfills.
        </Text>

        <Heading sx={{ ...headingStyle, mt: 6 }}>
          LOWERING EMISSIONS THROUGH SHARED USE
        </Heading>
        <Text sx={paragraph}>
          The project we support reduces the need for new manufacturing, 
          shipping, and packaging, while also eliminating emissions from 
          individual trips to rent or buy. SCIS estimated GHG savings across 
          these categories.
        </Text>

        <Heading sx={{ ...headingStyle, mt: 6 }}>
          CREATING EQUITABLE ACCESS AND NEW COMMUNITY TIES
        </Heading>
        <Text sx={paragraph}>
          Everyone, regardless of income, gains affordable access to tools, 
          equipment, and spaces that enable creativity, learning, and self- 
          reliance.
        </Text>

        <Heading sx={{ ...headingStyle, mt: 6 }}>
          STRONGER COMMUNITY CONNECTIONS
        </Heading>
        <Text sx={paragraph}>
          Shared spaces and equipment foster collaboration, skill-sharing, 
          and trust among neighbors.
        </Text>
      </Box>
    </Box>
  )
}

const headingStyle = {
  fontSize: [6, 7, 8],
  fontFamily: 'serif',
  fontWeight: 500,
  color: '#2e5e5d',
  mb: 3,
  lineHeight: 1.1,
}

const paragraph = {
  fontSize: 3,
  lineHeight: 1.6,
  color: '#2e2e2e',
  maxWidth: '700px',
  mx: 'auto',
  mb: 4,
}

export default Impact