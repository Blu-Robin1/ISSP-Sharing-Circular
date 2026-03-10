import { jsx as _jsx } from "react/jsx-runtime";
import accountSVG from '../../assets/icons/account.svg';
import approvedSVG from '../../assets/icons/approved.svg';
import attentionSVG from '../../assets/icons/attention.svg';
import categorySVG from '../../assets/icons/category.svg';
import chevronDownSVG from '../../assets/icons/chevron-down.svg';
import chevronLeftSVG from '../../assets/icons/chevron-left.svg';
import chevronRightSVG from '../../assets/icons/chevron-right.svg';
import chevronUpSVG from '../../assets/icons/chevron-up.svg';
import collaboratorSVG from '../../assets/icons/collaborator.svg';
import commentOutlineSVG from '../../assets/icons/comment-outline.svg';
import constructionSVG from '../../assets/icons/construction.svg';
import contactSVG from '../../assets/icons/contact.svg';
import copyLinkSVG from '../../assets/icons/copy-link.svg';
import closeSVG from '../../assets/icons/cross-close.svg';
import declinedSVG from '../../assets/icons/declined.svg';
import deleteSVG from '../../assets/icons/delete.svg';
import discussionSVG from '../../assets/icons/discussion.svg';
import discussionFollowSVG from '../../assets/icons/discussion-follow.svg';
import discussionUnfollowSVG from '../../assets/icons/discussion-unfollow.svg';
import doubleTickSVG from '../../assets/icons/double-tick.svg';
import editSVG from '../../assets/icons/edit.svg';
import emailSVG from '../../assets/icons/email.svg';
import employeeSVG from '../../assets/icons/employee.svg';
import eyeSVG from '../../assets/icons/eye.svg';
import eyeCrossedSVG from '../../assets/icons/eye-crossed.svg';
import flagUnknownSVG from '../../assets/icons/flag-unknown.svg';
import foodSVG from '../../assets/icons/food.svg';
import fromTheTeamSVG from '../../assets/icons/from-the-team.svg';
import guidesSVG from '../../assets/icons/guides.svg';
import hyperlinkSVG from '../../assets/icons/hyperlink.svg';
import arrowFullDownSVG from '../../assets/icons/icon-arrow-down.svg';
import arrowFullUpSVG from '../../assets/icons/icon-arrow-up.svg';
import bazarSVG from '../../assets/icons/icon-bazar.svg';
import commentSVG from '../../assets/icons/icon-comment.svg';
import discordSVG from '../../assets/icons/icon-discord.svg';
import emailOutlineSVG from '../../assets/icons/icon-email-outline.svg';
import researchSVG from '../../assets/icons/icon-research.svg';
import searchSVG from '../../assets/icons/icon-search.svg';
import socialMediaSVG from '../../assets/icons/icon-social-media.svg';
import starActiveSVG from '../../assets/icons/icon-star-active.svg';
import starSVG from '../../assets/icons/icon-star-default.svg';
import updateSVG from '../../assets/icons/icon-update.svg';
import usefulSVG from '../../assets/icons/icon-useful.svg';
import verifiedSVG from '../../assets/icons/icon-verified-badge.svg';
import websiteSVG from '../../assets/icons/icon-website.svg';
import impactSVG from '../../assets/icons/impact.svg';
import informationSVG from '../../assets/icons/information.svg';
import landscapeSVG from '../../assets/icons/landscape.svg';
import machineSVG from '../../assets/icons/machine.svg';
import machinesSVG from '../../assets/icons/machines.svg';
import mapSVG from '../../assets/icons/map.svg';
import globe from '../../assets/icons/map-globe.svg';
import gpsLocation from '../../assets/icons/map-gpsLocation.svg';
import megaphoneSVG from '../../assets/icons/megaphone.svg';
import megaphoneActiveSVG from '../../assets/icons/megaphone-active.svg';
import megaphoneInactiveSVG from '../../assets/icons/megaphone-inactive.svg';
import mouldsSVG from '../../assets/icons/moulds.svg';
import otherSVG from '../../assets/icons/other.svg';
import patreonSVG from '../../assets/icons/patreon.svg';
import plasticSVG from '../../assets/icons/plastic.svg';
import productsSVG from '../../assets/icons/products.svg';
import profileSVG from '../../assets/icons/profile.svg';
import recyclingSVG from '../../assets/icons/recycling.svg';
import replySVG from '../../assets/icons/reply.svg';
import replyOutlineSVG from '../../assets/icons/reply-outline.svg';
import reportSVG from '../../assets/icons/report.svg';
import revenueSVG from '../../assets/icons/revenue.svg';
import serviceEmailSVG from '../../assets/icons/service-email.svg';
import slidersSVG from '../../assets/icons/sliders.svg';
import starterKitsSVG from '../../assets/icons/starter-kits.svg';
import stepSVG from '../../assets/icons/step.svg';
import supporterSVG from '../../assets/icons/supporter.svg';
import thunderboltSVG from '../../assets/icons/thunderbolt.svg';
import thunderboltGreySVG from '../../assets/icons/thunderbolt-grey.svg';
import utilitiesSVG from '../../assets/icons/utilities.svg';
import visitorsAppointmentSVG from '../../assets/icons/visitors-appointment.svg';
import visitorsClosedSVG from '../../assets/icons/visitors-closed.svg';
import visitorsOpenSVG from '../../assets/icons/visitors-open.svg';
import volunteerSVG from '../../assets/icons/volunteer.svg';
import loadingSVG from '../../assets/images/loading.svg';
const imgStyle = {
    maxWidth: '100%',
};
const ImageIcon = (props) => {
    return _jsx("img", { alt: "icon", style: imgStyle, ...props });
};
export const iconMap = {
    approved: _jsx(ImageIcon, { src: approvedSVG }),
    arrowFullDown: _jsx(ImageIcon, { src: arrowFullDownSVG }),
    arrowFullUp: _jsx(ImageIcon, { src: arrowFullUpSVG }),
    attention: _jsx(ImageIcon, { src: attentionSVG }),
    account: _jsx(ImageIcon, { src: accountSVG }),
    bazar: _jsx(ImageIcon, { src: bazarSVG }),
    category: _jsx(ImageIcon, { src: categorySVG, "data-testid": "category-icon" }),
    chevronDown: _jsx(ImageIcon, { src: chevronDownSVG }),
    chevronLeft: _jsx(ImageIcon, { src: chevronLeftSVG }),
    chevronRight: _jsx(ImageIcon, { src: chevronRightSVG }),
    chevronUp: _jsx(ImageIcon, { src: chevronUpSVG }),
    collaborator: _jsx(ImageIcon, { src: collaboratorSVG }),
    close: _jsx(ImageIcon, { src: closeSVG, "data-cy": "close" }),
    comment: _jsx(ImageIcon, { src: commentSVG }),
    commentOutline: _jsx(ImageIcon, { src: commentOutlineSVG }),
    construction: _jsx(ImageIcon, { src: constructionSVG }),
    contact: _jsx(ImageIcon, { src: contactSVG }),
    copyLink: _jsx(ImageIcon, { src: copyLinkSVG }),
    declined: _jsx(ImageIcon, { src: declinedSVG }),
    delete: _jsx(ImageIcon, { src: deleteSVG }),
    discord: _jsx(ImageIcon, { src: discordSVG }),
    discussion: _jsx(ImageIcon, { src: discussionSVG }),
    discussionFollow: _jsx(ImageIcon, { src: discussionFollowSVG }),
    discussionUnfollow: _jsx(ImageIcon, { src: discussionUnfollowSVG }),
    doubleTick: _jsx(ImageIcon, { src: doubleTickSVG }),
    edit: _jsx(ImageIcon, { src: editSVG }),
    email: _jsx(ImageIcon, { src: emailSVG }),
    emailOutline: _jsx(ImageIcon, { src: emailOutlineSVG }),
    employee: _jsx(ImageIcon, { src: employeeSVG }),
    flagUnknown: _jsx(ImageIcon, { src: flagUnknownSVG }),
    food: _jsx(ImageIcon, { src: foodSVG }),
    fromTheTeam: _jsx(ImageIcon, { src: fromTheTeamSVG }),
    globe: _jsx(ImageIcon, { src: globe }),
    gpsLocation: _jsx(ImageIcon, { src: gpsLocation }),
    guides: _jsx(ImageIcon, { src: guidesSVG }),
    hide: _jsx(ImageIcon, { src: eyeCrossedSVG }),
    hyperlink: _jsx(ImageIcon, { src: hyperlinkSVG }),
    impact: _jsx(ImageIcon, { src: impactSVG }),
    information: _jsx(ImageIcon, { src: informationSVG }),
    landscape: _jsx(ImageIcon, { src: landscapeSVG }),
    loading: _jsx(ImageIcon, { src: loadingSVG, "data-cy": "icon-loading" }),
    machine: _jsx(ImageIcon, { src: machineSVG }),
    machines: _jsx(ImageIcon, { src: machinesSVG }),
    map: _jsx(ImageIcon, { src: mapSVG }),
    megaphone: _jsx(ImageIcon, { src: megaphoneSVG }),
    megaphoneActive: _jsx(ImageIcon, { src: megaphoneActiveSVG }),
    megaphoneInactive: _jsx(ImageIcon, { src: megaphoneInactiveSVG }),
    moulds: _jsx(ImageIcon, { src: mouldsSVG }),
    other: _jsx(ImageIcon, { src: otherSVG }),
    patreon: _jsx(ImageIcon, { src: patreonSVG }),
    plastic: _jsx(ImageIcon, { src: plasticSVG }),
    profile: _jsx(ImageIcon, { src: profileSVG }),
    products: _jsx(ImageIcon, { src: productsSVG }),
    recycling: _jsx(ImageIcon, { src: recyclingSVG }),
    reply: _jsx(ImageIcon, { src: replySVG }),
    replyOutline: _jsx(ImageIcon, { src: replyOutlineSVG }),
    report: _jsx(ImageIcon, { src: reportSVG }),
    research: _jsx(ImageIcon, { src: researchSVG }),
    revenue: _jsx(ImageIcon, { src: revenueSVG }),
    search: _jsx(ImageIcon, { src: searchSVG }),
    serviceEmail: _jsx(ImageIcon, { src: serviceEmailSVG }),
    show: _jsx(ImageIcon, { src: eyeSVG }),
    sliders: _jsx(ImageIcon, { src: slidersSVG }),
    socialMedia: _jsx(ImageIcon, { src: socialMediaSVG }),
    star: _jsx(ImageIcon, { src: starSVG }),
    starActive: _jsx(ImageIcon, { src: starActiveSVG }),
    starterKits: _jsx(ImageIcon, { src: starterKitsSVG }),
    step: _jsx(ImageIcon, { src: stepSVG }),
    supporter: _jsx(ImageIcon, { src: supporterSVG }),
    thunderbolt: _jsx(ImageIcon, { src: thunderboltSVG }),
    thunderboltGrey: _jsx(ImageIcon, { src: thunderboltGreySVG }),
    update: _jsx(ImageIcon, { src: updateSVG }),
    useful: _jsx(ImageIcon, { src: usefulSVG }),
    utilities: _jsx(ImageIcon, { src: utilitiesSVG }),
    verified: _jsx(ImageIcon, { src: verifiedSVG }),
    volunteer: _jsx(ImageIcon, { src: volunteerSVG }),
    visitorsAppointment: _jsx(ImageIcon, { src: visitorsAppointmentSVG }),
    visitorsClosed: _jsx(ImageIcon, { src: visitorsClosedSVG }),
    visitorsOpen: _jsx(ImageIcon, { src: visitorsOpenSVG }),
    website: _jsx(ImageIcon, { src: websiteSVG }),
};
