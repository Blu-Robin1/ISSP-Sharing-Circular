import { jsx as _jsx } from "react/jsx-runtime";
import { Card, Checkbox, Text } from 'theme-ui';
import { GridForm } from './GridForm';
export default {
    title: 'Components/GridForm',
    component: GridForm,
};
export const Default = () => (_jsx(Card, { sx: { maxWidth: '600px', padding: 2 }, children: _jsx(GridForm, { fields: [
            {
                glyph: 'discussion',
                name: 'An Odd Row',
                description: 'With a description.',
                component: _jsx(Text, { sx: { textAlign: 'center' }, children: "Any old component" }),
            },
            {
                glyph: 'plastic',
                name: 'An Even Row',
                description: 'With a description.',
                component: _jsx(Checkbox, {}),
            },
        ] }) }));
