import { jsx as _jsx } from "react/jsx-runtime";
import { Image } from 'theme-ui';
import badge from '../../assets/icons/icon-star-active.svg';
const MINIMUM_SIZE = 40;
export const MemberBadge = (props) => {
    const { profileType, size, useLowDetailVersion, sx } = props;
    const badgeSize = size ? size : MINIMUM_SIZE;
    if (!profileType) {
        return null;
    }
    return (_jsx(Image, { loading: "lazy", className: "avatar", "data-cy": `MemberBadge-${profileType.name}`, sx: { width: badgeSize, borderRadius: '50%', ...sx }, width: badgeSize, height: badgeSize, title: profileType.displayName, src: badgeSize > MINIMUM_SIZE && !useLowDetailVersion
            ? profileType.imageUrl || badge
            : profileType.smallImageUrl || badge }));
};
