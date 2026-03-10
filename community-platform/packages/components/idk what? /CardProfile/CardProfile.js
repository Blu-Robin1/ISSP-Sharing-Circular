import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'theme-ui';
import { CardDetailsMemberProfile } from './CardDetailsMemberProfile';
import { CardDetailsSpaceProfile } from './CardDetailsSpaceProfile';
export const CardProfile = ({ item, isLink = false }) => {
    const { profile } = item;
    const isWorkspace = profile?.type && profile?.type.isSpace;
    return (_jsx(Flex, { sx: { alignItems: 'stretch', alignContent: 'stretch' }, children: isWorkspace ? (_jsx(CardDetailsSpaceProfile, { profile: profile, isLink: isLink })) : (_jsx(CardDetailsMemberProfile, { profile: profile, isLink: isLink })) }));
};
