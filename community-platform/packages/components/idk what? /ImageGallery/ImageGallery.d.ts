import type { PhotoSwipeOptions } from 'photoswipe/lightbox';
import 'photoswipe/style.css';
export interface IImageGalleryItem {
    downloadUrl: string;
    thumbnailUrl: string;
    contentType?: string | null;
    fullPath: string;
    name: string;
    type: string;
    size: number;
    timeCreated: string;
    updated: string;
    alt?: string;
}
export interface ImageGalleryProps {
    images: IImageGalleryItem[];
    allowPortrait?: boolean;
    photoSwipeOptions?: PhotoSwipeOptions;
    hideThumbnails?: boolean;
    showNextPrevButton?: boolean;
}
export declare const ImageGallery: (props: ImageGalleryProps) => import("react/jsx-runtime").JSX.Element | null;
