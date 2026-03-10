import { jsx as _jsx } from "react/jsx-runtime";
import { fakePinProfile, fakeProfileType } from '../utils';
import { CardProfile } from './CardProfile';
export default {
    title: 'Components/CardProfile',
    component: CardProfile,
};
const member = fakePinProfile();
const space = fakePinProfile({
    type: fakeProfileType({ isSpace: true }),
});
export const Member = () => (_jsx(CardProfile, { item: { profile: member } }));
export const Space = () => (_jsx(CardProfile, { item: { profile: space } }));
