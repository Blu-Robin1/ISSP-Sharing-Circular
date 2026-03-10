import { jsx as _jsx } from "react/jsx-runtime";
import { ImageGalleryThumbnail } from './ImageGalleryThumbnail';
export default {
    title: 'Layout/ImageGallery/ImageGalleryThumbnail',
    component: ImageGalleryThumbnail,
};
export const Default = (props) => {
    return (_jsx(ImageGalleryThumbnail, { ...props, activeImageIndex: 0, allowPortrait: false, alt: "alt", name: "name", index: 0, setActiveIndex: () => { }, thumbnailUrl: "https://picsum.photos/id/29/150/150" }));
};
export const AllowPortrait = (props) => {
    return (_jsx(ImageGalleryThumbnail, { ...props, activeImageIndex: 0, allowPortrait: true, alt: "alt", name: "name", index: 0, setActiveIndex: () => { }, thumbnailUrl: "https://picsum.photos/id/29/150/150" }));
};
export const DisallowPortrait = (props) => {
    return (_jsx(ImageGalleryThumbnail, { ...props, activeImageIndex: 0, allowPortrait: false, alt: "alt", name: "name", index: 0, setActiveIndex: () => { }, thumbnailUrl: "https://picsum.photos/id/29/150/150" }));
};
export const ImageIsActive = (props) => {
    return (_jsx(ImageGalleryThumbnail, { ...props, activeImageIndex: 0, allowPortrait: false, alt: "alt", name: "name", index: 0, setActiveIndex: () => { }, thumbnailUrl: "https://picsum.photos/id/29/150/150" }));
};
export const ImageIsNotActive = (props) => {
    return (_jsx(ImageGalleryThumbnail, { ...props, activeImageIndex: 1, allowPortrait: false, alt: "alt", name: "name", index: 0, setActiveIndex: () => { }, thumbnailUrl: "https://picsum.photos/id/29/150/150" }));
};
export const ThumbnailUrlInvalidAltText = (props) => {
    return (_jsx(ImageGalleryThumbnail, { ...props, activeImageIndex: 1, allowPortrait: false, alt: "alt", name: "name", index: 0, setActiveIndex: () => { }, thumbnailUrl: "https://fastly.picsum.photos/404" }));
};
export const ThumbnailUrlInvalidNameText = (props) => {
    return (_jsx(ImageGalleryThumbnail, { ...props, activeImageIndex: 1, allowPortrait: false, name: "name", index: 0, setActiveIndex: () => { }, thumbnailUrl: "https://fastly.picsum.photos/404" }));
};
