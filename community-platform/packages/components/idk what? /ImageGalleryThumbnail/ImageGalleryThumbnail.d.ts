import React from 'react';
import 'photoswipe/style.css';
export interface ImageGalleryThumbnailProps {
    setActiveIndex: (index: number) => void;
    allowPortrait: boolean;
    activeImageIndex: number;
    thumbnailUrl: string;
    index: number;
    alt?: string;
    name?: string;
}
export declare const ThumbCard: import("@emotion/styled").StyledComponent<any, {}, {
    ref?: React.Ref<any> | undefined;
}>;
export declare const ImageGalleryThumbnail: (props: ImageGalleryThumbnailProps) => import("react/jsx-runtime").JSX.Element;
