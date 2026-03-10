import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { iconMap } from '../Icon/svgs';
import { Modal } from '../Modal/Modal';
import { VisitorModalFooter } from './VisitorModalFooter';
import { VisitorModalHeader } from './VisitorModalHeader';
export const visitorDisplayData = new Map([
    [
        'open',
        {
            icon: iconMap.visitorsOpen,
            label: 'Open to visitors',
            default: 'This space welcomes visitors.',
        },
    ],
    [
        'appointment',
        {
            icon: iconMap.visitorsAppointment,
            label: 'Visitors after appointment',
            default: 'This space prefers an appointment before visiting it. See their contact options, or get in touch directly!',
        },
    ],
    [
        'closed',
        {
            icon: iconMap.visitorsClosed,
            label: 'Visits currently not possible',
            default: 'It is not possible to come and visit this space.',
        },
    ],
]);
export const VisitorModal = ({ show, hide, user }) => {
    const { displayName, visitorPolicy, isContactable } = user;
    const displayData = visitorPolicy && visitorDisplayData.get(visitorPolicy.policy);
    if (!displayData) {
        return _jsx(_Fragment, {});
    }
    return (_jsxs(Modal, { isOpen: show, onDismiss: hide, width: 450, sx: { padding: '0 !important' }, children: [_jsx(VisitorModalHeader, { data: displayData, hide: hide }), _jsxs(Flex, { "data-cy": "VisitorModal", sx: { flexDirection: 'column', padding: '16px' }, children: [visitorPolicy.details && _jsxs(_Fragment, { children: ["Details from ", displayName, ":"] }), _jsx(Text, { variant: "quiet", children: visitorPolicy.details || displayData.default })] }), visitorPolicy.policy !== 'closed' && isContactable && _jsx(VisitorModalFooter, { hide: hide })] }));
};
