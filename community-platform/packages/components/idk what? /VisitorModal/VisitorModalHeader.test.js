import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { act } from '@testing-library/react';
import { Flex } from 'theme-ui';
import { describe, expect, it, vi } from 'vitest';
import { render } from '../test/utils';
import { VisitorModalHeader } from './VisitorModalHeader';
describe('VisitorHeaderFooter', () => {
    const data = {
        icon: _jsx(Flex, { children: "icon" }),
        label: 'visitor policy label',
        default: 'policy default text',
    };
    it('shows the data icon and label', () => {
        const { getByText } = render(_jsx(VisitorModalHeader, { data: data, hide: () => { } }));
        expect(getByText('icon')).toBeInTheDocument();
        expect(getByText('visitor policy label')).toBeInTheDocument();
    });
    it('passes the "contact" target to the hide function on click', () => {
        const hideTrigger = vi.fn();
        const { getByTestId } = render(_jsx(VisitorModalHeader, { data: data, hide: hideTrigger }));
        act(() => {
            getByTestId('VisitorModal-CloseButton').click();
        });
        expect(hideTrigger).toHaveBeenCalled();
    });
});
