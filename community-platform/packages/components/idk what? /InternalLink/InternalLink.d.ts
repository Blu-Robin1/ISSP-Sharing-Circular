import type { LinkProps as RouterLinkProps } from 'react-router';
import type { LinkProps as ThemedUILinkProps } from 'theme-ui';
export type Props = RouterLinkProps & ThemedUILinkProps;
export declare const InternalLink: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLButtonElement>>;
