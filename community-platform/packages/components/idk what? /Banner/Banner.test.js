import { jsx as _jsx } from "react/jsx-runtime";
import { fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { render } from '../test/utils';
import { Banner } from './Banner';
describe('Banner', () => {
    it('sets the default variant if none is provided', () => {
        const onClick = vi.fn();
        const { getByText } = render(_jsx(Banner, { onClick: onClick, children: "Some words" }));
        fireEvent.click(getByText('Some words'));
        expect(onClick).toHaveBeenCalled();
    });
});
