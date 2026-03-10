import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render } from '../test/utils';
import { fakePinProfile, fakeProfileType } from '../utils';
import { CardProfile } from './CardProfile';
describe('CardProfile', () => {
    it('renders the member profile', () => {
        const member = fakePinProfile();
        const { getByTestId } = render(_jsx(CardProfile, { item: { profile: member } }));
        expect(getByTestId('CardDetailsMemberProfile')).toBeInTheDocument();
    });
    it('renders the space profile', () => {
        const space = fakePinProfile({
            type: fakeProfileType({ isSpace: true }),
        });
        const { getByTestId } = render(_jsx(CardProfile, { item: { profile: space } }));
        expect(getByTestId('CardDetailsSpaceProfile')).toBeInTheDocument();
    });
});
