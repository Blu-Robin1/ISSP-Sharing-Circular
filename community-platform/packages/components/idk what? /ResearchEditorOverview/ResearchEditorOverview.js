import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, Heading, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { InternalLink } from '../InternalLink/InternalLink';
export const ResearchEditorOverview = (props) => {
    const { updates, sx, researchSlug, showCreateUpdateButton, showBackToResearchButton } = props;
    return (_jsxs(Card, { sx: { padding: 4, ...sx }, children: [_jsx(Heading, { as: "h2", mb: 3, variant: "small", children: "Research overview" }), updates?.length ? (_jsx(Box, { as: "ul", sx: { margin: 0, marginBottom: 4, padding: 0, paddingLeft: 3 }, children: updates.map((update, index) => (_jsx(Box, { as: "li", sx: { marginBottom: 1 }, children: _jsxs(Text, { variant: 'quiet', children: [update.isDraft ? (_jsx(Text, { sx: {
                                    display: 'inline-block',
                                    verticalAlign: 'middle',
                                    color: 'black',
                                    fontSize: 1,
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    background: 'accent.base',
                                    padding: 1,
                                    borderRadius: 1,
                                    borderBottomRightRadius: 1,
                                    mr: 1,
                                }, children: "Draft" })) : null, update.isActive ? (_jsx("strong", { children: update.title })) : (_jsxs(_Fragment, { children: [update.title, update.id ? (_jsx(InternalLink, { to: `/research/${researchSlug}/edit-update/${update.id}`, sx: { display: 'inline-block', ml: 1 }, children: "Edit" })) : null] }))] }) }, index))) })) : null, showCreateUpdateButton ? (_jsx(Button, { small: true, sx: { mr: 2 }, "data-cy": "create-update", type: "button", children: _jsx(InternalLink, { to: `/research/${researchSlug}/new-update`, sx: { color: 'black' }, children: "Create update" }) })) : null, showBackToResearchButton ? (_jsx(Button, { small: true, variant: "outline", type: "button", children: _jsx(InternalLink, { to: `/research/${researchSlug}/edit`, sx: { color: 'black' }, children: "Back to research" }) })) : null] }));
};
