import { jsx as _jsx } from "react/jsx-runtime";
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UsefulButtonLite } from './UsefulButtonLite';
const mockTheme = {
    colors: {
        background: '#f4f6f7',
        silver: '#c0c0c0',
        softblue: '#e6f3ff',
    },
};
const mockNavigate = vi.fn();
vi.mock('react-router', async (importOriginal) => {
    const actual = await importOriginal();
    const actualObj = typeof actual === 'object' && actual !== null ? actual : {};
    return {
        ...actualObj,
        useNavigate: () => mockNavigate,
    };
});
vi.mock('theme-ui', async () => {
    const actual = await import('theme-ui');
    const actualObj = typeof actual === 'object' && actual !== null ? actual : {};
    return {
        ...actualObj,
        useThemeUI: () => ({ theme: mockTheme }),
        Flex: ({ children, sx, ...props }) => (_jsx("div", { style: sx, ...props, children: children })),
        Box: ({ children, sx, ...props }) => (_jsx("div", { style: sx, ...props, children: children })),
        Text: ({ children, sx, ...props }) => (_jsx("span", { style: sx, ...props, children: children })),
    };
});
vi.mock('../Icon/Icon', async () => {
    const actual = await import('theme-ui');
    const actualObj = typeof actual === 'object' && actual !== null ? actual : {};
    return {
        ...actualObj,
        Icon: ({ filter, sx, ...props }) => (_jsx("img", { ...props, style: {
                filter,
                ...sx,
            } })),
    };
});
const TestWrapper = ({ children }) => (_jsx(BrowserRouter, { children: children }));
describe('UsefulButtonLite', () => {
    const mockOnUsefulClick = vi.fn();
    beforeEach(() => {
        vi.clearAllMocks();
        mockOnUsefulClick.mockResolvedValue(undefined);
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });
    const defaultProps = {
        usefulButtonLiteConfig: {
            hasUserVotedUseful: false,
            votedUsefulCount: 5,
            isLoggedIn: true,
            onUsefulClick: mockOnUsefulClick,
        },
    };
    it('does not show count when votedUsefulCount is 0', () => {
        const props = {
            usefulButtonLiteConfig: {
                ...defaultProps.usefulButtonLiteConfig,
                votedUsefulCount: 0,
            },
        };
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...props }) }));
        expect(screen.queryByText('0')).not.toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('shows the icon as gray when hasUserVotedUseful is false', () => {
        const props = {
            usefulButtonLiteConfig: {
                ...defaultProps.usefulButtonLiteConfig,
                hasUserVotedUseful: false,
            },
        };
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...props }) }));
        const icon = screen.getByRole('img', { hidden: true });
        expect(icon).toHaveStyle('filter: grayscale(1)');
    });
    it('shows the icon as coloured when hasUserVotedUseful is true', () => {
        const props = {
            usefulButtonLiteConfig: {
                ...defaultProps.usefulButtonLiteConfig,
                hasUserVotedUseful: true,
            },
        };
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...props }) }));
        const icon = screen.getByRole('img', { hidden: true });
        expect(icon).not.toHaveStyle('filter: grayscale(1)');
    });
    it('increases votedUsefulCount by 1 when user clicks and has not already voted', async () => {
        const props = {
            usefulButtonLiteConfig: {
                ...defaultProps.usefulButtonLiteConfig,
                hasUserVotedUseful: false,
                votedUsefulCount: 3,
            },
        };
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...props }) }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(mockOnUsefulClick).toHaveBeenCalledWith('add', 'Comment');
            expect(mockOnUsefulClick).toHaveBeenCalledTimes(1);
        });
    });
    it('decreases votedUsefulCount by 1 when user clicks and has already voted', async () => {
        const props = {
            usefulButtonLiteConfig: {
                ...defaultProps.usefulButtonLiteConfig,
                hasUserVotedUseful: true,
                votedUsefulCount: 5,
            },
        };
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...props }) }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(mockOnUsefulClick).toHaveBeenCalledWith('delete', 'Comment');
            expect(mockOnUsefulClick).toHaveBeenCalledTimes(1);
        });
    });
    it('disables button during click handling', async () => {
        // Make the onUsefulClick return a promise that we can control
        const slowPromise = new Promise((resolve) => setTimeout(resolve, 100));
        mockOnUsefulClick.mockReturnValue(slowPromise);
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...defaultProps }) }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(button).toBeDisabled();
        await waitFor(() => {
            expect(button).not.toBeDisabled();
        });
    });
    it('redirects to sign-in when user is not logged in', () => {
        const props = {
            usefulButtonLiteConfig: {
                ...defaultProps.usefulButtonLiteConfig,
                isLoggedIn: false,
            },
        };
        Object.defineProperty(window, 'location', {
            value: {
                pathname: '/test-path',
            },
            writable: true,
        });
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...props }) }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith('/sign-in?returnUrl=%2Ftest-path');
        expect(mockOnUsefulClick).not.toHaveBeenCalled();
    });
    it('handles errors gracefully during onUsefulClick', async () => {
        mockOnUsefulClick.mockRejectedValue(new Error('Network error'));
        render(_jsx(TestWrapper, { children: _jsx(UsefulButtonLite, { ...defaultProps }) }));
        const button = screen.getByRole('button');
        fireEvent.click(button);
        await waitFor(() => {
            expect(mockOnUsefulClick).toHaveBeenCalled();
            expect(button).not.toBeDisabled();
        });
    });
});
