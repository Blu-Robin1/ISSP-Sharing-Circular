import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import MenuDesktop from './MenuDesktop';

const meta: Meta<typeof MenuDesktop> = {
    title: 'Layout/MenuDesktop',
    component: MenuDesktop,
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={['/']}>
                <div style={{ padding: 20 }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof MenuDesktop>;

export const Default: Story = {}