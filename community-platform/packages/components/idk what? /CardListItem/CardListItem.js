import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from 'theme-ui';
import { CardButton } from '../CardButton/CardButton';
import { CardProfile } from '../CardProfile/CardProfile';
import { InternalLink } from '../InternalLink/InternalLink';
export const CardListItem = (props) => {
    const { item, onPinClick, isSelectedPin, viewport } = props;
    const testProp = `CardListItem${isSelectedPin ? '-selected' : ''}`;
    const Card = (_jsx(CardButton, { isSelected: isSelectedPin, children: _jsx(CardProfile, { item: item }) }));
    const wrapperProps = {
        'data-cy': testProp,
        'data-testid': testProp,
        sx: {
            borderRadius: 2,
            padding: 2,
        },
    };
    if (viewport === 'mobile') {
        return (_jsx(InternalLink, { target: "_blank", to: `/u/${item.profile.username}`, ...wrapperProps, children: Card }));
    }
    return (_jsx(Box, { "data-cy": testProp, "data-testid": testProp, onClick: () => onPinClick(item), sx: {
            borderRadius: 2,
            padding: 2,
        }, children: Card }));
};
