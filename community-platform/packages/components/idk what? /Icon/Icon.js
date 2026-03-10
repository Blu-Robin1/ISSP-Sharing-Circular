import { jsx as _jsx } from "theme-ui/jsx-runtime";
/** @jsxImportSource theme-ui */
import styled from '@emotion/styled';
import { IconContext } from 'react-icons';
import { FaCloudUploadAlt, FaFacebookF, FaFilePdf, FaFilter, FaInstagram, FaSignal, FaSlack, } from 'react-icons/fa';
import { MdAccessTime, MdAccountCircle, MdAdd, MdArrowBack, MdArrowForward, MdCheck, MdFileDownload, MdImage, MdKeyboardArrowDown, MdLocationOn, MdLock, MdMailOutline, MdMenu, MdMoreVert, MdNotifications, MdTurnedIn, } from 'react-icons/md';
import { space, verticalAlign } from 'styled-system';
import { DonateIcon } from './DonateIcon';
import { DownloadIcon } from './DownloadIcon';
import { ExternalUrl } from './ExternalUrl';
import { iconMap } from './svgs';
export const glyphs = {
    'account-circle': _jsx(MdAccountCircle, {}),
    add: _jsx(MdAdd, {}),
    account: iconMap.account,
    approved: iconMap.approved,
    'arrow-back': _jsx(MdArrowBack, {}),
    'arrow-down': _jsx(MdKeyboardArrowDown, {}),
    'arrow-forward': _jsx(MdArrowForward, {}),
    'arrow-full-down': iconMap.arrowFullDown,
    'arrow-full-up': iconMap.arrowFullUp,
    attention: iconMap.attention,
    bazar: iconMap.bazar,
    category: iconMap.category,
    comment: iconMap.comment,
    'comment-outline': iconMap.commentOutline,
    donate: _jsx(DonateIcon, {}),
    construction: iconMap.construction,
    contact: iconMap.contact,
    'copy-link': iconMap.copyLink,
    check: _jsx(MdCheck, {}),
    'chevron-down': iconMap.chevronDown,
    'chevron-left': iconMap.chevronLeft,
    'chevron-right': iconMap.chevronRight,
    'chevron-up': iconMap.chevronUp,
    close: iconMap.close,
    declined: iconMap.declined,
    delete: iconMap.delete,
    difficulty: _jsx(FaSignal, {}),
    discord: iconMap.discord,
    discussion: iconMap.discussion,
    discussionFollow: iconMap.discussionFollow,
    discussionUnfollow: iconMap.discussionUnfollow,
    doubleTick: iconMap.doubleTick,
    download: _jsx(MdFileDownload, {}),
    'download-cloud': _jsx(DownloadIcon, {}),
    edit: iconMap.edit,
    email: iconMap.email,
    employee: iconMap.employee,
    'email-outline': iconMap.emailOutline,
    'external-url': _jsx(ExternalUrl, {}),
    facebook: _jsx(FaFacebookF, {}),
    filter: _jsx(FaFilter, {}),
    'flag-unknown': iconMap.flagUnknown,
    food: iconMap.food,
    'version 5': iconMap.fromTheTeam,
    globe: iconMap.globe,
    'gps-location': iconMap.gpsLocation,
    guides: iconMap.guides,
    hide: iconMap.hide,
    hyperlink: iconMap.hyperlink,
    information: iconMap.information,
    image: _jsx(MdImage, {}),
    impact: iconMap.impact,
    instagram: _jsx(FaInstagram, {}),
    landscape: iconMap.landscape,
    loading: iconMap.loading,
    'location-on': _jsx(MdLocationOn, {}),
    lock: _jsx(MdLock, {}),
    machine: iconMap.machine,
    machines: iconMap.machines,
    'mail-outline': _jsx(MdMailOutline, {}),
    map: iconMap.map,
    megaphone: iconMap.megaphone,
    'megaphone-active': iconMap.megaphoneActive,
    'megaphone-inactive': iconMap.megaphoneInactive,
    menu: _jsx(MdMenu, {}),
    moulds: iconMap.moulds,
    'more-vert': _jsx(MdMoreVert, {}),
    notifications: _jsx(MdNotifications, {}),
    other: iconMap.other,
    patreon: iconMap.patreon,
    pdf: _jsx(FaFilePdf, {}),
    plastic: iconMap.plastic,
    products: iconMap.products,
    profile: iconMap.profile,
    recycling: iconMap.recycling,
    reply: iconMap.reply,
    'reply-outline': iconMap.replyOutline,
    report: iconMap.report,
    research: iconMap.research,
    revenue: iconMap.revenue,
    search: iconMap.search,
    'service-email': iconMap.serviceEmail,
    slack: _jsx(FaSlack, {}),
    sliders: iconMap.sliders,
    star: iconMap.star,
    'starter kits': iconMap.starterKits,
    'star-active': iconMap.starActive,
    step: iconMap.step,
    thunderbolt: iconMap.thunderbolt,
    'thunderbolt-grey': iconMap.thunderboltGrey,
    time: _jsx(MdAccessTime, {}),
    'turned-in': _jsx(MdTurnedIn, {}),
    'social-media': iconMap.socialMedia,
    supporter: iconMap.supporter,
    show: iconMap.show,
    update: iconMap.update,
    upload: _jsx(FaCloudUploadAlt, {}),
    utilities: iconMap.utilities,
    useful: iconMap.useful,
    verified: iconMap.verified,
    volunteer: iconMap.volunteer,
    website: iconMap.website,
};
const IconWrapper = styled.div `
  display: inline-block;
  flex: 0 0 ${(props) => (props.size ? `${props.size}px` : '32px')};
  width: ${(props) => (props.size ? `${props.size}px` : '32px')};
  height: ${(props) => (props.size ? `${props.size}px` : '32px')};
  min-width: ${(props) => (props.size ? `${props.size}px` : '32px')};
  min-height: ${(props) => (props.size ? `${props.size}px` : '32px')};
  position: relative;
  ${verticalAlign} ${space}
    ${(props) => props.onClick &&
    `
    cursor: pointer;
  `};
`;
const sizeMap = {
    xs: 8,
    sm: 16,
    md: 32,
    lg: 48,
    xl: 64,
};
export const getGlyph = (glyph) => {
    return glyph in glyphs ? glyphs[glyph] : null;
};
export const Icon = (props) => {
    const { glyph, size, sx } = props;
    if (!getGlyph(glyph)) {
        return null;
    }
    const isSizeNumeric = !isNaN(size);
    let definedSize = 16;
    if (isSizeNumeric) {
        definedSize = size;
    }
    else if (Object.keys(sizeMap).includes(size)) {
        const pointer = size;
        definedSize = sizeMap[pointer];
    }
    return (_jsx(IconWrapper, { ...props, sx: {
            color: props.color ?? 'inherit',
            opacity: props.opacity ?? '1',
            '& svg': {
                fontSize: definedSize,
                fill: props.color,
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: props.filter ?? 'unset',
            ...sx,
        }, size: definedSize, children: _jsx(IconContext.Provider, { value: {
                style: {
                    width: definedSize,
                    height: definedSize,
                },
            }, children: getGlyph(glyph) }) }));
};
