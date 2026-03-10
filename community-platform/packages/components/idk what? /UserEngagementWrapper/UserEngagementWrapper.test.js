import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render } from '../test/utils';
import { Default } from './UserEngagementWrapper.stories';
describe('UserEngagementWrapper', () => {
    it('renders the children', () => {
        const DefaultComponent = Default;
        const { getByText } = render(_jsx(DefaultComponent, {}));
        expect(getByText('Mark as useful')).toBeInTheDocument();
    });
});
