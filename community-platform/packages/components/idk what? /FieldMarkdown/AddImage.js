import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { insertImage$, usePublisher } from '@mdxeditor/editor';
import { useState } from 'react';
import { Box, Flex } from 'theme-ui';
import { Button } from '../Button/Button';
import { ImageInput } from '../ImageInput/ImageInput';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
export const AddImage = ({ imageUploadHandler }) => {
    const insertImage = usePublisher(insertImage$);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const onFilesChange = async (fileMeta) => {
        setIsLoading(true);
        if (fileMeta) {
            const file = await imageUploadHandler(fileMeta.photoData);
            insertImage({
                src: file,
                altText: fileMeta.name,
                title: fileMeta.name,
            });
        }
        setIsLoading(false);
        setIsOpen(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { small: true, variant: "subtle", icon: "image", type: "button", showIconOnly: true, onClick: () => setIsOpen(true), children: "Upload" }), _jsx(Modal, { isOpen: isOpen, width: 600, onDismiss: () => setIsOpen(false), children: _jsxs(Flex, { sx: { flexDirection: 'column', gap: 2 }, children: [isLoading && _jsx(_Fragment, { children: "Loading" }), _jsx(Box, { sx: { height: '300px' }, children: _jsx(ImageInput, { onFilesChange: onFilesChange }) }), _jsx(Flex, { children: isLoading ? (_jsx(Loader, {})) : (_jsx(Button, { variant: "secondary", type: "button", onClick: () => setIsOpen(false), children: "Cancel" })) })] }) })] }));
};
