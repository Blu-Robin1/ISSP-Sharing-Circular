import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import { render } from '../test/utils';
import { ResearchEditorOverview } from './ResearchEditorOverview';
const defaultProps = {
    updates: [
        {
            isActive: true,
            title: 'Update 1',
            id: 1,
            isDraft: false,
        },
        {
            isActive: false,
            title: 'Update 2',
            id: 2,
            isDraft: false,
        },
        {
            isActive: false,
            title: 'Update 3',
            id: 3,
            isDraft: false,
        },
    ],
    researchSlug: 'abc',
    showBackToResearchButton: true,
    showCreateUpdateButton: true,
};
describe('ResearchEditorOverview', () => {
    it('renders correctly', () => {
        const { container } = render(_jsx(ResearchEditorOverview, { ...defaultProps }));
        expect(container).toMatchSnapshot();
    });
    it('links back to research', () => {
        const { getByText } = render(_jsx(ResearchEditorOverview, { ...defaultProps, showBackToResearchButton: true }));
        expect(getByText('Back to research')).toBeInTheDocument();
    });
    it('links to create update', () => {
        const { getByText } = render(_jsx(ResearchEditorOverview, { ...defaultProps, showCreateUpdateButton: true }));
        expect(getByText('Create update')).toBeInTheDocument();
    });
    it('handles empty updates', () => {
        const { container } = render(_jsx(ResearchEditorOverview, { ...defaultProps, updates: [] }));
        expect(container).toMatchSnapshot();
    });
    it('handles falsey updates', () => {
        const { container } = render(_jsx(ResearchEditorOverview, { ...defaultProps, updates: null }));
        expect(container).toMatchSnapshot();
    });
    it('handles malformed update item', () => {
        const { getByText } = render(_jsx(ResearchEditorOverview, { ...defaultProps, updates: [
                {
                    isActive: true,
                    title: 'Update title',
                    slug: 'a-slug',
                },
            ] }));
        expect(getByText('Update title')).toBeInTheDocument();
    });
    it('displays a Draft label', () => {
        const { getByText } = render(_jsx(ResearchEditorOverview, { ...defaultProps, updates: [
                {
                    isActive: false,
                    title: 'Update 1',
                    id: 1,
                    isDraft: true,
                },
            ] }));
        expect(getByText('Draft')).toBeInTheDocument();
    });
});
