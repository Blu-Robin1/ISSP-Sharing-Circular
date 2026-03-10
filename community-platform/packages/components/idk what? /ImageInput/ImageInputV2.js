import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useState } from 'react';
import Dropzone from 'react-dropzone-esm';
import { Box, Flex, Image as ImageComponent, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { ImageInputDeleteImage } from './ImageInputDeleteImage';
import { ImageInputWrapper } from './ImageInputWrapper';
import { imageValid } from './imageValid';
export const ImageInputV2 = (props) => {
    const fileInputRef = useRef(null);
    const { imageDisplaySx, onFilesChange, existingImage } = props;
    const [file, setFile] = useState(null);
    const [isImageCorrupt, setIsImageCorrupt] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const src = useMemo(() => {
        if (file) {
            return URL.createObjectURL(file);
        }
    }, [file]);
    const onDrop = async (selectedImage) => {
        try {
            await imageValid(selectedImage[0]);
            setIsImageCorrupt(false);
            setFile(selectedImage[0]);
            onFilesChange(selectedImage[0]);
        }
        catch (_) {
            setIsImageCorrupt(true);
            setShowErrorModal(true);
        }
    };
    const handleImageDelete = (event) => {
        event.stopPropagation();
        setFile(null);
        onFilesChange(undefined);
    };
    return (_jsxs(Box, { p: 0, sx: imageDisplaySx ? imageDisplaySx : { height: '100%' }, children: [_jsx(Dropzone, { accept: {
                    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg', '.webp'],
                }, multiple: false, onDrop: onDrop, children: ({ getRootProps, getInputProps, rootRef }) => (_jsxs(ImageInputWrapper, { ...getRootProps(), ref: rootRef, hasUploadedImg: !!existingImage, children: [_jsx("input", { ref: fileInputRef, "data-testid": 'image-input', ...getInputProps() }), src ? _jsx(ImageComponent, { src: src, sx: imageDisplaySx }) : _jsx(ImageComponent, { src: existingImage?.publicUrl, sx: imageDisplaySx }), !src && !existingImage ? (_jsx(Button, { small: true, variant: "outline", icon: "image", type: "button", children: "Upload" })) : (_jsx(ImageInputDeleteImage, { onClick: (event) => handleImageDelete(event) }))] })) }), _jsx(Modal, { width: 600, isOpen: showErrorModal, onDismiss: () => setShowErrorModal(false), children: isImageCorrupt && (_jsxs(Flex, { "data-cy": "ImageUploadError", mt: [1, 1, 1], sx: {
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '20px',
                    }, children: [_jsx(Text, { children: "The uploaded image appears to be corrupted or a type we don't accept." }), _jsx(Text, { children: "Check your image is valid and one of the following formats: jpeg, jpg, png, gif, heic, svg or webp." }), _jsx(Button, { "data-cy": "ImageUploadError-Button", sx: { marginTop: '20px', justifyContent: 'center' }, onClick: () => setShowErrorModal(false), children: "Try uploading something else" })] })) })] }));
};
