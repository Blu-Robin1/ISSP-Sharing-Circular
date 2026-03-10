import { jsx as _jsx } from "react/jsx-runtime";
import { ImageGallery } from './ImageGallery';
const imageUrls = [
    {
        full: 'https://picsum.photos/id/29/1500/1000',
        thumb: 'https://picsum.photos/id/29/150/150',
    },
    {
        full: 'https://picsum.photos/id/50/4000/3000',
        thumb: 'https://picsum.photos/id/50/150/150',
    },
    {
        full: 'https://picsum.photos/id/110/800/1200',
        thumb: 'https://picsum.photos/id/110/150/150',
    },
    {
        full: 'https://picsum.photos/id/2/1500/1500',
        thumb: 'https://picsum.photos/id/2/150/150',
    },
];
// eslint-disable-next-line storybook/prefer-pascal-case
export const testImages = imageUrls.map((elt, i) => {
    return {
        downloadUrl: elt.full,
        contentType: 'image/jpeg',
        fullPath: 'cat.jpg',
        name: 'cat' + i,
        type: 'image/jpeg',
        size: 115000,
        thumbnailUrl: elt.thumb,
        timeCreated: new Date().toISOString(),
        updated: new Date().toISOString(),
    };
});
export default {
    title: 'Layout/ImageGallery',
    component: ImageGallery,
};
export const Default = (props) => {
    return _jsx(ImageGallery, { images: testImages, ...props });
};
export const NoThumbnails = (props) => {
    return _jsx(ImageGallery, { images: testImages, ...props, hideThumbnails: true });
};
export const HideThumbnailForSingleImage = (props) => {
    return _jsx(ImageGallery, { images: [testImages[0]], ...props });
};
export const ShowNextPrevButtons = (props) => {
    return _jsx(ImageGallery, { images: testImages, ...props, hideThumbnails: true, showNextPrevButton: true });
};
export const DoNotShowNextPrevButtons = (props) => {
    return (_jsx(ImageGallery, { images: [testImages[0]], ...props, hideThumbnails: true, showNextPrevButton: true }));
};
