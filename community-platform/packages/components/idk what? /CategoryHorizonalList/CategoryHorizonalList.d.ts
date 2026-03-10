import type { Category } from 'oa-shared';
export interface IProps {
    activeCategory: Category | null;
    allCategories: Category[];
    setActiveCategory: (category: Category | null) => void;
}
export declare const CategoryHorizonalList: (props: IProps) => import("react/jsx-runtime").JSX.Element | null;
