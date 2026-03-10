import type { ReactNode } from 'react';
import type { availableGlyphs } from '../Icon/types';
export interface GridFormFields {
    glyph: availableGlyphs;
    name: string;
    description: string;
    component: ReactNode;
}
export interface IProps {
    fields: GridFormFields[];
}
export declare const GridForm: ({ fields }: IProps) => import("react/jsx-runtime").JSX.Element;
