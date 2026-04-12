import { Box, Flex, Heading, Link, Text } from 'theme-ui';

const Step = ({ number, title, text }: any) => (
  <Flex
    sx={{
      mb: 6,
      alignItems: 'flex-start',
      gap: 3,
    }}
  >
    {/* NUMBER */}
    <Text
      sx={{
        minWidth: '44px',
        fontSize: ['48px', '56px', '64px'],
        fontWeight: 700,
        color: '#3F6B66',
        lineHeight: 1,
        fontFamily: '"Times New Roman", Times, serif',
      }}
    >
      {number}
    </Text>

    {/* TEXT */}
    <Box>
      <Heading
        as="h3"
        sx={{
          fontSize: [4, 5],
          fontWeight: 700,
          mb: 2,
          fontFamily: '"Times New Roman", Times, serif',
          textTransform: 'uppercase',
          color: '#000',
        }}
      >
        {title}
      </Heading>

      <Text
        sx={{
          fontSize: 3,
          lineHeight: 1.8,
          color: '#000',
        }}
      >
        {text}
      </Text>
    </Box>
  </Flex>
);

const ContactUs = () => {
  return (
    <Box
      sx={{
        maxWidth: '760px',
        mx: 'auto',
        px: 4,
        py: 6,
      }}
    >
      {/* CONTACT TITLE */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Heading
          as="h1"
          sx={{
            display: 'inline-block',
            px: 5,
            py: 2,
            backgroundColor: '#8FBF9F',
            borderRadius: '28px',
            fontSize: 6,
            fontFamily: '"Times New Roman", Times, serif',
            textTransform: 'uppercase',
            color: '#000',
          }}
        >
          CONTACT
        </Heading>
      </Box>

      {/* INTRO TEXT */}
      <Text
        sx={{
          textAlign: 'center',
          fontSize: 3,
          maxWidth: '620px',
          mx: 'auto',
          color: '#000',
          lineHeight: 1.6,
        }}
      >
        When trying to contact our platform, bear in mind the following:
      </Text>

      {/* SPACE BETWEEN INTRO AND STEPS */}
      <Box sx={{ mt: 6 }}>
        <Step
          number="1"
          title="Individual Feedback / Help"
          text="We are currently unable to offer individual feedback on projects,.... As a foundation with limited resources, we do not have the capacity to provide this level of support. Fore these types of inquiries, we encourage you to contact us through email."
        />
        {/* 
        <Step
          number="2"
          title="Read Our FAQ"
          text="Do you have a question? Check our Frequently Asked Questions where we answer the most common questions."
        /> */}

        <Step
          number="2"
          title="Email Us"
          text="If none of the above apply to you, feel free to reach out to us directly. bcit@my.bcit.ca"
        />

        <Step
          number="3"
          title="General Inquiries"
          text="Have a question or want to learn more? We’d love to hear from you."
        />

        <Step
          number="4"
          title="Host Shared Infrastructure"
          text="If you're part of a community group, housing co-op, or municipality interested in hosting a lending library or shared project, reach out."
        />

        <Step
          number="5"
          title="Fund a Project"
          text="We welcome partners and funders who want to support circular innovation and community access."
        />
      </Box>
    </Box>
  );
};

export default ContactUs;
