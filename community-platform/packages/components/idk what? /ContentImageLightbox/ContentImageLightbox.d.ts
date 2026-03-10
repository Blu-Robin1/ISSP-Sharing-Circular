import type { PhotoSwipeOptions } from 'photoswipe/lightbox';
interface Props {
    children: React.ReactNode;
    selector?: string;
    photoSwipeOptions?: PhotoSwipeOptions;
    prependImages?: HTMLImageElement[];
}
export declare const ContentImageLightbox: ({ children, selector, photoSwipeOptions, prependImages, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
