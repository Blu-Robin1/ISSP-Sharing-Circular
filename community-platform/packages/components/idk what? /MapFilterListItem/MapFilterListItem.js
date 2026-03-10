import { jsx as _jsx } from "react/jsx-runtime";
import { CardButton } from '../CardButton/CardButton';
export const MapFilterListItem = (props) => {
    const { active, onClick, children, filterType, sx } = props;
    return (_jsx(CardButton, { "data-cy": `MapFilterListItem-${filterType}${active ? '-active' : ''}`, onClick: onClick, extrastyles: {
            display: 'flex',
            maxWidth: ['100%', '49%'],
            width: '500px',
            flexDirection: 'row',
            backgroundColor: 'offWhite',
            padding: 1,
            alignItems: 'center',
            gap: 2,
            ...(active
                ? {
                    borderColor: 'green',
                    ':hover': { borderColor: 'green' },
                }
                : {
                    borderColor: 'offWhite',
                    ':hover': { borderColor: 'offWhite' },
                }),
            ...sx,
        }, children: children }));
};
