import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneElement, isValidElement, useCallback, useState } from 'react';
import { Flex, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { StatisticsList } from './ContentStatisticsList';
export const ContentStatistics = ({ statistics, alwaysShow }) => {
    const [showStats, setShowStats] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const handleShowStats = () => {
        setShowStats(!showStats);
    };
    const handleOpenModal = useCallback(async (stat) => {
        if (!stat.modalComponent)
            return;
        let data = undefined;
        if (stat.onOpen) {
            try {
                data = await stat.onOpen();
            }
            catch (error) {
                console.error('Error loading modal data:', error);
            }
        }
        const modalElement = stat.modalComponent(data);
        if (isValidElement(modalElement)) {
            setActiveModal(cloneElement(modalElement, {
                onClose: () => setActiveModal(null),
            }));
        }
        else {
            setActiveModal(null);
        }
    }, []);
    const visible = showStats || alwaysShow === true;
    return (_jsxs(Flex, { "data-cy": "ContentStatistics", sx: {
            alignItems: ['flex-start', 'center', 'center'],
            gap: 2,
            flexDirection: alwaysShow ? 'row' : ['column', 'row', 'row'],
            pl: alwaysShow ? 0 : [2, 0, 0],
            flexWrap: 'wrap',
        }, children: [_jsxs(Flex, { sx: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: [alwaysShow ? 'none' : 'flex', 'none'],
                    width: '100%',
                }, onClick: handleShowStats, children: [_jsx(Text, { sx: { fontSize: '13px' }, children: showStats ? '' : 'More Information' }), _jsx(Button, { type: "button", variant: "subtle", showIconOnly: true, icon: showStats ? 'chevron-up' : 'chevron-down', small: true, sx: {
                            borderWidth: 0,
                            '&:hover': { bg: 'white' },
                            '&:active': { bg: 'white' },
                        } })] }), _jsx(StatisticsList, { statistics: statistics, visible: visible, onOpenModal: handleOpenModal }), activeModal && activeModal] }));
};
