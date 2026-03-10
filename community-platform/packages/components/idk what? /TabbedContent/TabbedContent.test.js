import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { render } from '../test/utils';
import { Default } from './TabbedContent.stories';
const DefaultComponent = Default;
describe('TabbedContent', () => {
    it('basic interaction', () => {
        const wrapper = render(_jsx(DefaultComponent, {}));
        expect(wrapper.getByText('Tab #1')).toBeVisible();
        expect(() => wrapper.getByText('Tab Panel #2')).toThrow();
    });
    it('switches between tabs', () => {
        const wrapper = render(_jsx(DefaultComponent, {}));
        act(() => {
            wrapper.getByText('Tab #2').click();
        });
        expect(wrapper.getByText('Tab #1')).toBeVisible();
        expect(() => wrapper.getByText('Tab Panel #1')).toThrow();
        expect(wrapper.getByText('Tab Panel #2')).toBeInTheDocument();
    });
});
