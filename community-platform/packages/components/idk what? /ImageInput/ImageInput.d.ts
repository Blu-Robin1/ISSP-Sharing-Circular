import type { ThemeUIStyleObject } from 'theme-ui';
import type { IFileMeta, IValue } from './types';
interface IProps {
    onFilesChange: (fileMeta: IFileMeta) => void;
    imageDisplaySx?: ThemeUIStyleObject | undefined;
    value?: IValue;
    hasText?: boolean;
    dataTestId?: string;
}
export declare const ImageInput: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
