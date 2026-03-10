import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Flex } from 'theme-ui';
import { Username } from '../Username/Username';
export const AuthorDisplay = ({ author }) => {
    if (!author) {
        return null;
    }
    return (_jsxs(Flex, { sx: { gap: 2 }, children: [author.photo && (_jsx(Avatar, { "data-cy": "authorAvatar", src: author.photo.publicUrl, sx: {
                    objectFit: 'cover',
                    width: '40px',
                    height: '40px',
                }, alt: author.displayName, loading: "lazy" })), _jsx(Username, { user: author, sx: { alignSelf: 'center' } })] }));
};
