import styled from '@emotion/styled';
import { useState } from 'react';
import { Button, FieldInput } from '..';
import { Field, Form } from 'react-final-form';
import { Box, Flex, Image, Text, Heading, useThemeUI } from 'theme-ui';
import type { ThemeWithName } from 'oa-themes';
import bcitFooterLogo from '../../../themes/assets/images/bcit-footer.png';
import { backgroundColor, fontWeight } from 'styled-system';

type SiteFooterProps = {
  siteName: string;
};

const FooterContainer = styled(Flex)`
  width: 100%;
  padding: 90px ${(props) => (props.theme as any).space[4]}px;
  background: #F5F1E8;

  @media only screen and (min-width: ${(props) =>
      (props.theme as any).breakpoints[2]}) {
    padding: 110px ${(props) => (props.theme as any).space[5]}px;
  }
`;

const Inner = styled(Flex)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 60px;

  flex-direction: column;
  align-items: center;
  text-align: center;

  @media only screen and (min-width: ${(props) =>
      (props.theme as any).breakpoints[2]}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }
`;

const LeftBlock = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 18px;

  @media only screen and (min-width: ${(props) =>
      (props.theme as any).breakpoints[2]}) {
    align-items: flex-start;
  }
`;

const RightBlock = styled(Flex)`
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 680px;
`;

export const SiteFooter = ({ siteName }: SiteFooterProps) => {
  const themeUi = useThemeUI();
  const theme = themeUi.theme as ThemeWithName;

  const footerLogo = (theme as any)?.logo || '';
  const year = new Date().getFullYear();

  const [submitted, setSubmitted] = useState(false);

  return (
    <FooterContainer as="footer">
      <Inner>
        {/* LEFT */}
        <LeftBlock>
          <Image
            src={bcitFooterLogo}
            alt={`BCIT Footer Logo`}
            sx={{
              width: ['90px', '100px', '110px'],
              height: ['90px', '100px', '110px'],
              objectFit: 'contain',
            }}
          />

          <Text sx={{ color: '#000', lineHeight: 1.4 }}>
            {siteName} ©
            <br />
            {year} All rights reserved
          </Text>
        </LeftBlock>

        <RightBlock>
          <Heading
            as="h2"
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontSize: [5, 6, 7],
              m: 0,
              color: '#000',
              textTransform: 'uppercase',
            }}
          >
            STAY IN THE LOOP
          </Heading>

          <Text sx={{ color: '#000', fontSize: 3, m: 0 }}>
            Sign up with your email address to receive news and updates.
          </Text>

          <Box sx={{ mt: 3, width: '100%' }}>
            <Form
              onSubmit={async (_, form) => {
                setSubmitted(true);
                form.restart();

                setTimeout(() => {
                  setSubmitted(false);
                }, 3000);
              }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Flex
                    sx={{
                      gap: 3,
                      flexDirection: ['column', 'row'],
                      alignItems: 'stretch',
                      width: '100%',
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Field
                        name="email"
                        type="email"
                        component={FieldInput}
                        placeholder={
                          submitted ? 'Thank you!' : 'Email Address'
                        }
                        disabled={submitted}
                        sx={{
                          width: '100%',
                          bg: '#ffffff',
                          border: '1px solid rgba(0,0,0,0.2)',
                          borderRadius: 0,
                          height: '56px',
                          px: 3,
                          '&:focus': {
                            borderColor: '#000',
                            boxShadow:
                              '0 0 0 1px rgba(0,0,0,0.15)',
                            outline: 'none',
                          },
                          '&::placeholder': {
                            color: submitted
                              ? '#000'
                              : 'rgba(0,0,0,0.45)',
                          },
                        }}
                      />
                    </Box>

                    <Button
                      type="submit"
                      sx={{
                        height: '56px',
                        px: 5,
                        borderRadius: '10px',
                        backgroundColor: '#3F6B66',
                        color: '#ffffff',
                        fontFamily:
                          '"Times New Roman", Times, serif',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        '&:hover': {
                          backgroundColor: '#355c58',
                        },
                      }}
                    >
                      SIGN UP
                    </Button>
                  </Flex>
                </form>
              )}
            />
          </Box>
        </RightBlock>
      </Inner>
    </FooterContainer>
  );
};
