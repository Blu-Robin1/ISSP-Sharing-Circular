import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Heading, Text } from 'theme-ui';
import { Username } from '../Username/Username';
export const ArticleCallToActionSupabase = (props) => {
    const { author, children, contributors } = props;
    return (_jsxs(Flex, { sx: {
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
        }, children: [_jsxs(Flex, { children: [_jsx(Text, { variant: "body", sx: { fontSize: 2, alignContent: 'center' }, children: "Made by" }), _jsx(Username, { user: author, sx: { ml: 1 } })] }), contributors && contributors.length ? (_jsxs(Text, { variant: "quiet", sx: {
                    display: 'block',
                    marginTop: 2,
                    textAlign: 'center',
                    fontSize: 2,
                    gap: 1,
                    alignItems: 'center',
                }, children: ["With contributions from:", ' ', contributors.map((contributor, key) => (_jsx(Username, { user: contributor }, key)))] })) : null, _jsx(Heading, { sx: { my: 4 }, children: "Like what you see? \uD83D\uDC47" }), _jsx(Flex, { sx: {
                    gap: 2,
                    flexDirection: ['column', 'row'],
                }, children: children })] }));
};
