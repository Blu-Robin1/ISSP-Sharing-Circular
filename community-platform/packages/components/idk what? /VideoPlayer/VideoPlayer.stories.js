import { jsx as _jsx } from "react/jsx-runtime";
import { VideoPlayer } from './VideoPlayer';
export default {
    title: 'Components/VideoPlayer',
    component: VideoPlayer,
};
const Template = (args) => _jsx(VideoPlayer, { ...args });
export const Youtube = Template.bind({});
Youtube.args = {
    videoUrl: 'https://www.youtube.com/watch?v=anqfVCLRQHE',
};
export const Vimeo = Template.bind({});
Vimeo.args = {
    videoUrl: 'https://vimeo.com/492811707',
};
