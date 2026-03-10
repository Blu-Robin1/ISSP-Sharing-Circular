import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Box, Image as ThemeImage } from 'theme-ui';
import { Loader } from '../Loader/Loader';
import 'photoswipe/style.css';
export const ThumbCard = styled(Box) `
  cursor: pointer;
  padding: 5px;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;
export const ImageGalleryThumbnail = (props) => {
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    const imgRef = useRef(null);
    useEffect(() => {
        // Check if image is already loaded (for hydration mismatch cases)
        if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
            setThumbnailLoaded(true);
        }
    }, [props.index]);
    return (_jsxs(_Fragment, { children: [!thumbnailLoaded && _jsx(Loader, { sx: { mb: 3, mt: 4, width: 100, height: 67 } }), _jsx(ThumbCard, { "data-cy": "thumbnail", "data-testid": "thumbnail", mb: 3, mt: 4, opacity: props.index === props.activeImageIndex ? 1.0 : 0.5, onClick: () => props.setActiveIndex(props.index), children: _jsx(ThemeImage, { ref: imgRef, loading: "lazy", src: props.thumbnailUrl, alt: props.alt ?? props.name, onLoad: () => setThumbnailLoaded(true), onError: () => setThumbnailLoaded(true), sx: {
                        width: thumbnailLoaded ? 100 : 0,
                        height: 67,
                        objectFit: props.allowPortrait ? 'contain' : 'cover',
                        borderRadius: 1,
                        border: '1px solid offWhite',
                    }, crossOrigin: "" }) })] }));
};
