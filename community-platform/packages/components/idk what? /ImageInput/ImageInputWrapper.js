import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Flex } from 'theme-ui';
// any export to fix: https://github.com/microsoft/TypeScript/issues/37597
export const ImageInputWrapper = forwardRef((props, ref) => {
    const { hasUploadedImg, sx, ...rest } = props;
    return (_jsx(Flex, { className: 'image-input__wrapper', ref: ref, sx: {
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            borderColor: 'background',
            borderStyle: hasUploadedImg ? 'none' : 'dashed',
            borderRadius: 1,
            backgroundColor: 'white',
            height: '100%',
            ...sx,
        }, ...rest, children: props.children }));
});
ImageInputWrapper.displayName = 'ImageInputWrapper';
