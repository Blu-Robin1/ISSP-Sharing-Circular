import type { IStatistic } from './types';
interface Props {
    statistics: IStatistic[];
    visible: boolean;
    onOpenModal: (stat: IStatistic) => Promise<void>;
}
export declare const StatisticsList: ({ statistics, visible, onOpenModal }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
