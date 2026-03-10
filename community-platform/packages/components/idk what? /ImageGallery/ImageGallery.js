import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { useLayoutEffect, useRef, useState } from 'react';
import { Flex, Image as ThemeImage } from 'theme-ui';
import { Arrow } from '../ArrowIcon/ArrowIcon';
import { usePhotoSwipeLightbox } from '../hooks/usePhotoSwipeLightbox';
import { ImageGalleryThumbnail } from '../ImageGalleryThumbnail/ImageGalleryThumbnail';
import { Loader } from '../Loader/Loader';
import 'photoswipe/style.css';
const NavButton = styled('button') `
  background: transparent;
  border: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  cursor: pointer;
`;
// Container that reserves space to prevent layout shift
const ImageContainer = styled('div') `
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => {
    if (!props.$allowPortrait) {
        return `
        min-height: 300px;
        @media (min-width: 768px) {
          min-height: 450px;
        }
        aspect-ratio: 16/9;
        background: #f5f5f5;
      `;
    }
    // Research/Questions with wide image: flexible, no aspect-ratio
    if (props.$flexibleAspectRatio) {
        return `
        min-height: 200px;
        @media (min-width: 768px) {
          min-height: 300px;
        }
      `;
    }
    // Research/Questions with normal image: use aspect-ratio
    return `
      min-height: 200px;
      @media (min-width: 768px) {
        min-height: 300px;
      }
      aspect-ratio: 16/9;
      background: #f5f5f5;
    `;
}}
`;
export const ImageGallery = (props) => {
    // Initialize with actual images from props, not empty array
    const filteredImages = (props.images || []).filter((img) => img !== null);
    const [state, setState] = useState({
        activeImageIndex: 0,
        showLightbox: false,
        showActiveImgLoading: true,
        activeImageAspectRatio: null,
    });
    const imageRef = useRef(null);
    const activeImageIndex = state.activeImageIndex;
    const activeImage = filteredImages[activeImageIndex];
    const imageNumber = filteredImages.length;
    const showThumbnails = !props.hideThumbnails && filteredImages.length > 1;
    const showNextPrevButton = !!props.showNextPrevButton && filteredImages.length > 1;
    const { open } = usePhotoSwipeLightbox({
        images: filteredImages.map((img) => ({
            src: img.downloadUrl,
            alt: img.alt,
        })),
        photoSwipeOptions: props.photoSwipeOptions,
    });
    const setActive = (imageIndex) => {
        setState((prevState) => ({
            ...prevState,
            activeImageIndex: imageIndex,
            showActiveImgLoading: imageIndex !== prevState.activeImageIndex,
            activeImageAspectRatio: null,
        }));
    };
    const setActiveImgLoaded = () => {
        setState((prevState) => ({
            ...prevState,
            showActiveImgLoading: false,
        }));
    };
    const handleImageLoad = (e) => {
        const img = e.currentTarget;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        setState((prevState) => ({
            ...prevState,
            showActiveImgLoading: false,
            activeImageAspectRatio: aspectRatio,
        }));
    };
    const handleImageError = () => {
        // Also clear loading state on error
        setActiveImgLoaded();
    };
    useLayoutEffect(() => {
        if (typeof window === 'undefined')
            return;
        const img = imageRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            setState((prevState) => ({
                ...prevState,
                showActiveImgLoading: false,
                activeImageAspectRatio: aspectRatio,
            }));
        }
    }, [activeImage?.downloadUrl]);
    const triggerLightbox = () => {
        if (typeof window === 'undefined')
            return;
        open(state.activeImageIndex);
    };
    // Early return if no images - but this should rarely happen now
    if (!filteredImages.length) {
        return null;
    }
    // Detect images wider than 16:9 and remove aspect ratio constraint to prevent letterboxing
    const ASPECT_RATIO_16_9 = 16 / 9;
    const isWideImage = state.activeImageAspectRatio
        ? state.activeImageAspectRatio > ASPECT_RATIO_16_9
        : false;
    const useFlexibleAspectRatio = isWideImage && !!props.allowPortrait;
    const allowPortrait = !!props.allowPortrait;
    return (_jsxs(Flex, { sx: { flexDirection: 'column' }, children: [_jsxs(ImageContainer, { "$flexibleAspectRatio": useFlexibleAspectRatio, "$allowPortrait": allowPortrait, children: [state.showActiveImgLoading && (_jsx(Loader, { sx: { position: 'absolute', alignSelf: 'center', zIndex: 1 } })), _jsx(ThemeImage, { ref: imageRef, "data-cy": "active-image", "data-testid": "active-image", sx: {
                            width: '100%',
                            height: !allowPortrait || !useFlexibleAspectRatio ? '100%' : 'auto',
                            cursor: 'pointer',
                            objectFit: allowPortrait ? 'contain' : 'cover',
                            opacity: state.showActiveImgLoading ? 0.3 : 1,
                            transition: 'opacity 0.2s ease-in-out',
                        }, src: activeImage.downloadUrl, onClick: triggerLightbox, onLoad: handleImageLoad, onError: handleImageError, alt: activeImage.alt ?? activeImage.name, crossOrigin: "" }), showNextPrevButton ? (_jsxs(_Fragment, { children: [_jsx(NavButton, { "aria-label": 'Next image', style: {
                                    right: 0,
                                    zIndex: 2,
                                }, onClick: () => setActive(activeImageIndex + 1 < imageNumber ? activeImageIndex + 1 : 0), children: _jsx(Arrow, { direction: "right", sx: { marginRight: '10px' } }) }), _jsx(NavButton, { "aria-label": 'Previous image', style: {
                                    left: 0,
                                    zIndex: 2,
                                }, onClick: () => setActive(activeImageIndex - 1 >= 0 ? activeImageIndex - 1 : imageNumber - 1), children: _jsx(Arrow, { direction: "left", sx: { marginLeft: '10px' } }) })] })) : null] }), showThumbnails && (_jsx(Flex, { sx: { width: '100%', flexWrap: 'wrap' }, mx: [2, 2, '-5px'], children: filteredImages.map((image, index) => (_jsx(ImageGalleryThumbnail, { activeImageIndex: activeImageIndex, allowPortrait: props.allowPortrait ?? false, setActiveIndex: setActive, alt: image.alt, index: index, name: image.name, thumbnailUrl: image.thumbnailUrl }, image.thumbnailUrl))) }))] }));
};
