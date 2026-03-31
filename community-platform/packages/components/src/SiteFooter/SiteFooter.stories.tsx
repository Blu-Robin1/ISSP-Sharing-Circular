import { SiteFooter } from './SiteFooter';

import type { Meta, StoryFn } from '@storybook/react-vite';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Layout/SiteFooter',
  component: SiteFooter,
} as Meta<typeof SiteFooter>;

export const Default: StoryFn<typeof SiteFooter> = () => <SiteFooter siteName="British Columbia Institute of Technology" />;
