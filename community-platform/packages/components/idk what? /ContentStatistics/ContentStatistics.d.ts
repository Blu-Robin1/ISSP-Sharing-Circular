import type { IStatistic } from './types';
export interface IProps {
    statistics: IStatistic[];
    alwaysShow?: boolean;
}
export declare const ContentStatistics: ({ statistics, alwaysShow }: IProps) => import("react/jsx-runtime").JSX.Element;
