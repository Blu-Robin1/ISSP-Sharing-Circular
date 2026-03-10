import { Username } from './Username';
import type { Meta } from '@storybook/react-vite';
import type { Author } from 'oa-shared';
declare const _default: Meta<typeof Username>;
export default _default;
export declare const NoBadge: {
    args: {
        user: Author;
    };
};
export declare const OneBadge: {
    args: {
        user: Author;
    };
};
export declare const TwoBadges: {
    args: {
        user: Author;
    };
};
export declare const WithoutFlag: {
    args: {
        user: Author;
    };
};
export declare const InvalidCountryCode: {
    args: {
        user: Author;
    };
};
export declare const InlineStyles: {
    args: {
        user: Author;
        sx: {
            outline: string;
        };
    };
};
