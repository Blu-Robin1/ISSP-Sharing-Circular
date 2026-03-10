import type { Image } from 'oa-shared';
import type { ThemeUIStyleObject } from 'theme-ui';
interface IProps {
    onFilesChange: (fileMeta: File | undefined) => void;
    imageDisplaySx?: ThemeUIStyleObject | undefined;
    existingImage?: Image;
}
export declare const ImageInputV2: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
