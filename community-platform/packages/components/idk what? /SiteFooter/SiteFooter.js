import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { useState } from 'react';
import { Button, FieldInput } from 'oa-components';
import { Field, Form } from 'react-final-form';
import { Box, Flex, Image, Text, Heading, useThemeUI } from 'theme-ui';
const FooterContainer = styled(Flex) `
  width: 100%;
  padding: 90px ${(props) => props.theme.space[4]}px;
  background: #F5F1E8;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
    padding: 110px ${(props) => props.theme.space[5]}px;
  }
`;
const Inner = styled(Flex) `
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 60px;

  flex-direction: column;
  align-items: center;
  text-align: center;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
  }
`;
const LeftBlock = styled(Flex) `
  flex-direction: column;
  align-items: center;
  gap: 18px;

  @media only screen and (min-width: ${(props) => props.theme.breakpoints[2]}) {
    align-items: flex-start;
  }
`;
const RightBlock = styled(Flex) `
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 680px;
`;
export const SiteFooter = ({ siteName }) => {
    const themeUi = useThemeUI();
    const theme = themeUi.theme;
    const footerLogo = theme?.logo || '';
    const year = new Date().getFullYear();
    const [submitted, setSubmitted] = useState(false);
    return (_jsx(FooterContainer, { as: "footer", children: _jsxs(Inner, { children: [_jsxs(LeftBlock, { children: [_jsx(Image, { src: footerLogo, alt: `${siteName} logo`, sx: {
                                width: ['90px', '100px', '110px'],
                                height: ['90px', '100px', '110px'],
                                objectFit: 'contain',
                            } }), _jsxs(Text, { sx: { color: '#000', lineHeight: 1.4 }, children: [siteName, " \u00A9", _jsx("br", {}), year, " All rights reserved"] })] }), _jsxs(RightBlock, { children: [_jsx(Heading, { as: "h2", sx: {
                                fontFamily: '"Times New Roman", Times, serif',
                                fontWeight: 700,
                                letterSpacing: '0.5px',
                                fontSize: [5, 6, 7],
                                m: 0,
                                color: '#000',
                                textTransform: 'uppercase',
                            }, children: "STAY IN THE LOOP" }), _jsx(Text, { sx: { color: '#000', fontSize: 3, m: 0 }, children: "Sign up with your email address to receive news and updates." }), _jsx(Box, { sx: { mt: 3, width: '100%' }, children: _jsx(Form, { onSubmit: async (_, form) => {
                                    setSubmitted(true);
                                    form.restart();
                                    setTimeout(() => {
                                        setSubmitted(false);
                                    }, 3000);
                                }, render: ({ handleSubmit }) => (_jsx("form", { onSubmit: handleSubmit, children: _jsxs(Flex, { sx: {
                                            gap: 3,
                                            flexDirection: ['column', 'row'],
                                            alignItems: 'stretch',
                                            width: '100%',
                                        }, children: [_jsx(Box, { sx: { flex: 1 }, children: _jsx(Field, { name: "email", type: "email", component: FieldInput, placeholder: submitted ? 'Thank you!' : 'Email Address', disabled: submitted, sx: {
                                                        width: '100%',
                                                        bg: '#ffffff',
                                                        border: '1px solid rgba(0,0,0,0.2)',
                                                        borderRadius: 0,
                                                        height: '56px',
                                                        px: 3,
                                                        '&:focus': {
                                                            borderColor: '#000',
                                                            boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
                                                            outline: 'none',
                                                        },
                                                        '&::placeholder': {
                                                            color: submitted
                                                                ? '#000'
                                                                : 'rgba(0,0,0,0.45)',
                                                        },
                                                    } }) }), _jsx(Button, { type: "submit", sx: {
                                                    height: '56px',
                                                    px: 5,
                                                    borderRadius: 0,
                                                    fontFamily: '"Times New Roman", Times, serif',
                                                    letterSpacing: '0.5px',
                                                    textTransform: 'uppercase',
                                                    backgroundColor: '#3F6B66',
                                                    '&:hover': {
                                                        backgroundColor: '#355c58',
                                                    },
                                                }, children: "SIGN UP" })] }) })) }) })] })] }) }));
};
