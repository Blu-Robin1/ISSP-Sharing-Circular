import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ImageConverter } from './ImageConverter';
export const ImageConverterList = (props) => {
    const { inputFiles, handleConvertedFileChange } = props;
    return (_jsx(_Fragment, { children: inputFiles.map((file, index) => {
            return (_jsx(ImageConverter, { file: file, onImgConverted: (meta) => handleConvertedFileChange(meta, index) }, file.name));
        }) }));
};
