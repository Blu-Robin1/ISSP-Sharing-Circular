import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import Dropzone from 'react-dropzone-esm';
import { Box, Flex, Image as ImageComponent, Text } from 'theme-ui';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { getPresentFiles } from './getPresentFiles';
import { ImageConverterList } from './ImageConverterList';
import { ImageInputDeleteImage } from './ImageInputDeleteImage';
import { ImageInputWrapper } from './ImageInputWrapper';
import { imageValid } from './imageValid';
import { setSrc } from './setSrc';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB in bytes
export const ImageInput = (props) => {
    const fileInputRef = useRef(null);
    const prevPropsValue = useRef(null);
    const { dataTestId, imageDisplaySx, onFilesChange, value } = props;
    const [inputFiles, setInputFiles] = useState([]);
    const [convertedFiles, setConvertedFiles] = useState([]);
    const [presentFiles, setPresentFiles] = useState(getPresentFiles(value));
    const [isImageCorrupt, setIsImageCorrupt] = useState(false);
    const [isImageTooLarge, setIsImageTooLarge] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const onDrop = async (selectedImage) => {
        try {
            // Check file size first
            if (selectedImage[0].size > MAX_FILE_SIZE) {
                setIsImageTooLarge(true);
                setIsImageCorrupt(false);
                setShowErrorModal(true);
                return;
            }
            await imageValid(selectedImage[0]);
            setIsImageCorrupt(false);
            setIsImageTooLarge(false);
            setInputFiles(selectedImage);
        }
        catch (_) {
            setIsImageCorrupt(true);
            setIsImageTooLarge(false);
            setShowErrorModal(true);
        }
    };
    const handleConvertedFileChange = (newFile, index) => {
        const nextFiles = convertedFiles;
        nextFiles[index] = newFile;
        setConvertedFiles(convertedFiles);
        props.onFilesChange(convertedFiles[0]);
    };
    const handleImageDelete = (event) => {
        // TODO - handle case where a server image is deleted (remove from server)
        event.stopPropagation();
        setInputFiles([]);
        setConvertedFiles([]);
        setPresentFiles([]);
        onFilesChange(null);
    };
    useEffect(() => {
        if (JSON.stringify(value) !== JSON.stringify(prevPropsValue.current)) {
            setPresentFiles(getPresentFiles(value));
        }
        prevPropsValue.current = value || null;
    }, [props]);
    const hasImages = presentFiles.length > 0 || inputFiles.length > 0;
    const showUploadedImg = presentFiles.length > 0;
    const src = setSrc(presentFiles[0]);
    return (_jsxs(Box, { p: 0, sx: imageDisplaySx ? imageDisplaySx : { height: '100%' }, children: [_jsx(Dropzone, { accept: {
                    'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg', '.webp'],
                }, multiple: false, onDrop: onDrop, children: ({ getRootProps, getInputProps, rootRef }) => (_jsxs(ImageInputWrapper, { ...getRootProps(), ref: rootRef, hasUploadedImg: showUploadedImg, children: [_jsx("input", { ref: fileInputRef, "data-testid": dataTestId || 'image-input', ...getInputProps() }), showUploadedImg && _jsx(ImageComponent, { src: src, sx: imageDisplaySx }), !showUploadedImg && _jsx(ImageConverterList, { inputFiles: inputFiles, handleConvertedFileChange: handleConvertedFileChange }), !hasImages && (_jsx(Button, { small: true, variant: "outline", icon: "image", type: "button", children: "Upload" })), hasImages && _jsx(ImageInputDeleteImage, { onClick: (event) => handleImageDelete(event) })] })) }), _jsxs(Modal, { width: 600, isOpen: showErrorModal, onDismiss: () => setShowErrorModal(false), children: [isImageTooLarge && (_jsxs(Flex, { "data-cy": "ImageUploadSizeError", mt: [1, 1, 1], sx: {
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '20px',
                        }, children: [_jsx(Text, { children: "The maximum image size is 10MB." }), _jsx(Text, { children: "Please optimize your image and try again." }), _jsx(Button, { "data-cy": "ImageUploadSizeError-Button", sx: { marginTop: '20px', justifyContent: 'center' }, onClick: () => setShowErrorModal(false), children: "Close" })] })), isImageCorrupt && (_jsxs(Flex, { "data-cy": "ImageUploadError", mt: [1, 1, 1], sx: {
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '20px',
                        }, children: [_jsx(Text, { children: "The uploaded image appears to be corrupted or a type we don't accept." }), _jsx(Text, { children: "Check your image is valid and one of the following formats: jpeg, jpg, png, gif, heic, svg or webp." }), _jsx(Button, { "data-cy": "ImageUploadError-Button", sx: { marginTop: '20px', justifyContent: 'center' }, onClick: () => setShowErrorModal(false), children: "Try uploading something else" })] }))] })] }));
};
