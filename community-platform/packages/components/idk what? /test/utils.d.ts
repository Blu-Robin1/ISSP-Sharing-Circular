import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
declare const customRender: (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
export { customRender as render };
