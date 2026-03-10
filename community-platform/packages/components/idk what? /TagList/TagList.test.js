import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render } from '../test/utils';
import { TagList } from './TagList';
describe('TagList', () => {
    it('renders multiple tags', () => {
        const tagList = [{ label: 'The best tag' }, { label: 'The second best tag' }];
        const { getByText } = render(_jsx(TagList, { tags: tagList }));
        expect(getByText(tagList[0].label)).toBeInTheDocument();
        expect(getByText(tagList[1].label)).toBeInTheDocument();
    });
});
