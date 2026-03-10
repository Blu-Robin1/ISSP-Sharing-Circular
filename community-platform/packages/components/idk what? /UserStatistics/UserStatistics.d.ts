import type { MapPin, Profile } from 'oa-shared';
import type { ThemeUIStyleObject } from 'theme-ui';
export interface UserStatisticsProps {
    profile: Pick<Profile, 'id' | 'username' | 'badges' | 'totalViews' | 'country'>;
    pin?: Pick<MapPin, 'country'>;
    libraryCount: number;
    usefulCount: number;
    researchCount: number;
    questionCount: number;
    showViews: boolean;
    sx?: ThemeUIStyleObject | undefined;
}
export declare const UserStatistics: (props: UserStatisticsProps) => import("react/jsx-runtime").JSX.Element | null;
