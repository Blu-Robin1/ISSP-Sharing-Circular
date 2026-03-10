import type { ThemeUIStyleObject } from 'theme-ui';
import type { availableGlyphs } from '../Icon/types';
export interface OptionalFollowButtonProps {
    iconFollow?: availableGlyphs;
    iconUnfollow?: availableGlyphs;
    labelFollow?: string;
    labelUnfollow?: string;
    showIconOnly?: boolean;
    small?: boolean;
    sx?: ThemeUIStyleObject;
    tooltipFollow?: string;
    tooltipUnfollow?: string;
    variant?: string;
}
export interface FollowButtonProps extends OptionalFollowButtonProps {
    hasUserSubscribed: boolean;
    isLoggedIn: boolean;
    onFollowClick: () => void;
}
export declare const FollowButton: (props: FollowButtonProps) => import("react/jsx-runtime").JSX.Element;
