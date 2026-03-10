import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { visitorDisplayData } from '../VisitorModal/VisitorModal';
const DEFAULT_COLOR = '#999999';
const Tag = ({ color, dataCy, label, large, onClick }) => {
    const sizing = large
        ? {
            fontSize: 2,
            paddingX: 2,
            paddingY: '10px',
        }
        : {
            fontSize: 1,
            paddingX: '7.5px',
            paddingY: '5px',
        };
    return (_jsx(Text, { "data-cy": dataCy, sx: {
            borderRadius: 99,
            border: '1px solid',
            borderColor: color,
            backgroundColor: `${color}20`,
            color: color,
            ...sizing,
            // Correction for misalignment due to \u24D8
            ...(large && !onClick ? { paddingTop: '12px' } : {}),
            ':hover': onClick
                ? {
                    cursor: 'pointer',
                }
                : {},
        }, onClick: onClick, children: label }));
};
const policyColors = new Map([
    ['open', '#116503'],
    ['appointment', '#005471'],
    ['closed', DEFAULT_COLOR],
]);
export const ProfileTagsList = (props) => {
    const { tags, visitorPolicy, isSpace, showVisitorModal, sx, large } = props;
    const tagList = tags || [];
    return (_jsxs(Flex, { "data-cy": "ProfileTagsList", "data-testid": "ProfileTagsList", sx: { gap: 1, flexWrap: 'wrap', ...sx }, children: [tagList.map(({ name }, index) => (_jsx(Tag, { color: DEFAULT_COLOR, label: name, large: large }, index))), visitorPolicy && isSpace && (_jsx(Tag, { dataCy: "tag-openToVisitors", color: policyColors.get(visitorPolicy.policy), label: `${visitorDisplayData.get(visitorPolicy.policy)?.label} \u24D8`, onClick: () => {
                    showVisitorModal && showVisitorModal();
                }, large: true }))] }));
};
