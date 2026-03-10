import type { Profile } from 'oa-shared';
import type { DisplayData, HideProp } from './props';
export declare const visitorDisplayData: Map<"open" | "appointment" | "closed", DisplayData>;
export type VisitorModalProps = HideProp & {
    show: boolean;
    user: Profile;
};
export declare const VisitorModal: ({ show, hide, user }: VisitorModalProps) => import("react/jsx-runtime").JSX.Element;
