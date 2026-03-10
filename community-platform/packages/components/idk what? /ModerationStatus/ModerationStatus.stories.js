import { jsx as _jsx } from "react/jsx-runtime";
import { ModerationStatus } from './ModerationStatus';
export default {
    title: 'Layout/ModerationStatus',
    component: ModerationStatus,
};
export const Accepted = () => (_jsx(ModerationStatus, { status: "accepted" }));
export const AwaitingModeration = () => (_jsx(ModerationStatus, { status: "awaiting-moderation" }));
export const ImprovementsNeeded = () => (_jsx(ModerationStatus, { status: "improvements-needed" }));
export const Rejected = () => (_jsx(ModerationStatus, { status: "rejected" }));
