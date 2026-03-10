import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { render as testLibReact } from '@testing-library/react';
import { ThemeProvider } from '@theme-ui/core';
import { preciousPlasticTheme } from 'oa-themes';
import { createRoutesStub } from 'react-router';
const customRender = (ui, options) => testLibReact(ui, {
    wrapper: ({ children }) => {
        const RouterStub = createRoutesStub([
            {
                path: '',
                Component() {
                    return _jsx(_Fragment, { children: children });
                },
            },
        ]);
        return (_jsx(ThemeProvider, { theme: preciousPlasticTheme.styles, children: _jsx(RouterStub, {}) }));
    },
    ...options,
});
export { customRender as render };
