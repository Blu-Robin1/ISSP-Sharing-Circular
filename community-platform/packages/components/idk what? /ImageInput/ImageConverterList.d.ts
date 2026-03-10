import type { IConvertedFileMeta } from 'oa-shared';
interface IProps {
    inputFiles: File[];
    handleConvertedFileChange: (meta: IConvertedFileMeta, index: number) => void;
}
export declare const ImageConverterList: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
