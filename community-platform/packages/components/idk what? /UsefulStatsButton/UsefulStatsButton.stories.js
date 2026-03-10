import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { UsefulStatsButton } from './UsefulStatsButton';
export default {
    title: 'Components/UsefulStatsButton',
    component: UsefulStatsButton,
};
export const LoggedOutWithCount = () => (_jsx(UsefulStatsButton, { isLoggedIn: false, hasUserVotedUseful: false, onUsefulClick: () => Promise.resolve() }));
export const LoggedInWithCount = () => {
    const [voted, setVoted] = useState(false);
    const clickVote = async () => {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        setVoted((val) => !val);
    };
    return (_jsx(UsefulStatsButton, { hasUserVotedUseful: voted, isLoggedIn: true, onUsefulClick: clickVote }));
};
export const CurrentUserHasVoted = () => {
    const [voted, setVoted] = useState(true);
    const clickVote = async () => {
        await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        setVoted((val) => !val);
    };
    return (_jsx(UsefulStatsButton, { hasUserVotedUseful: voted, isLoggedIn: true, onUsefulClick: clickVote }));
};
