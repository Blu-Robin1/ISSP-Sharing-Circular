import type { IConvertedFileMeta } from 'oa-shared';
interface IProps {
    file: File;
    onImgConverted: (meta: IConvertedFileMeta) => void;
}
export declare const ImageConverter: (props: IProps) => import("react/jsx-runtime").JSX.Element | null;
/** Insert a base-16 timestamp into a file's name and return it
 */
export declare const addTimestampToFileName: (str: string) => string;
export {};
