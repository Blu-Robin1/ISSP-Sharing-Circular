import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Text } from 'theme-ui';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
export const StatisticsList = ({ statistics, visible, onOpenModal }) => {
    return (_jsx(_Fragment, { children: statistics.map((stat, idx) => {
            return (_jsx(StatisticItem, { statistic: stat, visible: visible, onOpenModal: onOpenModal }, idx));
        }) }));
};
const StatisticItem = ({ statistic, visible, onOpenModal, }) => {
    const displayModal = !!statistic.modalComponent && statistic.stat;
    // capitalize first letter of label
    const label = statistic.label.slice(0, 1).toUpperCase() + statistic.label.slice(1).toLowerCase();
    return (_jsxs(_Fragment, { children: [_jsxs(Flex, { sx: {
                    alignItems: 'center',
                    fontSize: '1',
                    paddingX: 2,
                    display: [visible ? 'flex' : 'none', 'flex', 'flex'],
                    cursor: displayModal ? 'pointer' : 'default',
                }, onClick: () => displayModal && onOpenModal(statistic), "data-testid": `ContentStatistics-${statistic.icon}`, "data-cy": `ContentStatistics-${statistic.label}`, "data-tooltip-id": statistic.label, "data-tooltip-content": label, children: [_jsx(Icon, { glyph: statistic.icon, mr: 1, size: "sm", opacity: "0.5" }), _jsx(Text, { sx: {
                            textDecoration: displayModal ? 'underline' : 'none',
                        }, children: statistic.stat })] }), _jsx(Tooltip, { id: statistic.label })] }));
};
