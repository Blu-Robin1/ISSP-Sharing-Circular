import { jsx as _jsx } from "react/jsx-runtime";
import { ReactCountryFlag } from 'react-country-flag';
export const FlagIcon = ({ countryCode }) => {
    return (_jsx(ReactCountryFlag, { "data-cy": `country:${countryCode}`, countryCode: countryCode, title: countryCode, svg: true, style: {
            borderRadius: '3px',
            backgroundSize: 'cover',
            height: '14px',
            width: '21px',
        } }));
};
