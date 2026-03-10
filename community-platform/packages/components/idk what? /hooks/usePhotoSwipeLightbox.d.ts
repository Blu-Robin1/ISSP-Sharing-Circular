import type { PhotoSwipeOptions } from 'photoswipe/lightbox';
import 'photoswipe/style.css';
export interface UsePhotoSwipeLightboxProps {
    images: {
        src: string;
        alt?: string;
    }[];
    photoSwipeOptions?: PhotoSwipeOptions;
}
export declare const usePhotoSwipeLightbox: ({ images, photoSwipeOptions, }: UsePhotoSwipeLightboxProps) => {
    open: (index: number) => void;
    lightboxRef: import("react").RefObject<any>;
};
