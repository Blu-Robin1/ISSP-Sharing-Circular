import React from 'react';
import 'react-horizontal-scrolling-menu/dist/styles.css';
export interface IProps {
    children: React.ReactNode[];
    dataCy?: string;
}
export declare const LeftArrow: () => import("react/jsx-runtime").JSX.Element;
export declare const RightArrow: () => import("react/jsx-runtime").JSX.Element;
export declare const VerticalList: ({ children, dataCy }: IProps) => import("react/jsx-runtime").JSX.Element;
