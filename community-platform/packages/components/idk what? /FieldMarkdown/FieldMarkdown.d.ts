import type { FieldRenderProps } from 'react-final-form';
import '@mdxeditor/editor/style.css';
import './style.css';
type FieldProps = FieldRenderProps<any, any> & {
    children?: React.ReactNode;
};
export interface IProps extends FieldProps {
    imageUploadHandler: (image: File) => Promise<string>;
    disabled?: boolean;
    children?: React.ReactNode;
    'data-cy'?: string;
}
export declare const FieldMarkdown: (props: IProps) => import("react/jsx-runtime").JSX.Element;
export {};
