import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from 'theme-ui';
export const ModerationRecord = {
    'awaiting-moderation': 'Awaiting Moderation',
    'improvements-needed': 'Improvements Needed',
    accepted: 'Accepted',
    rejected: 'Rejected',
};
export const ModerationStatus = (props) => {
    const { status, sx } = props;
    return (_jsx(Text, { sx: {
            display: 'inline-block',
            color: status === 'rejected' ? 'red' : 'black',
            fontSize: 1,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            background: 'accent.base',
            padding: 1,
            borderRadius: 1,
            borderBottomRightRadius: 1,
            ...sx,
        }, "data-cy": `moderationstatus-${status}`, children: ModerationRecord[status] }));
};
