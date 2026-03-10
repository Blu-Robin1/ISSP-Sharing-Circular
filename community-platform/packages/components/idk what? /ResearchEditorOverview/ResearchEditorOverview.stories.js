import { jsx as _jsx } from "react/jsx-runtime";
import { ResearchEditorOverview } from './ResearchEditorOverview';
export default {
    title: 'Layout/ResearchEditorOverview',
    component: ResearchEditorOverview,
};
const Template = (args) => (_jsx(ResearchEditorOverview, { ...args }));
export const Default = Template.bind({});
Default.args = {
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
export const ShowBackToResearchButton = Template.bind({});
ShowBackToResearchButton.args = {
    ...Default.args,
    showBackToResearchButton: true,
};
export const ShowCreateUpdateButton = Template.bind({});
ShowCreateUpdateButton.args = {
    ...Default.args,
    showCreateUpdateButton: true,
};
export const DraftItem = Template.bind({});
DraftItem.args = {
    ...Default.args,
    updates: [
        {
            isActive: false,
            title: 'Update 1',
            id: 1,
            isDraft: true,
        },
    ],
};
