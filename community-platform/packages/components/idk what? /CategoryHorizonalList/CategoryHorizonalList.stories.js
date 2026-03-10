import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { CategoryHorizonalList } from './CategoryHorizonalList';
export default {
    title: 'Components/CategoryHorizonalList',
    component: CategoryHorizonalList,
};
const allCategoriesForPreciousPlastic = [
    {
        createdAt: new Date('2024-12-03T18:03:51.313Z'),
        id: 1,
        modifiedAt: null,
        name: 'Guides',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-01T18:03:51.313Z'),
        id: 2,
        modifiedAt: null,
        name: 'Machines',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 3,
        modifiedAt: null,
        name: 'Moulds',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 4,
        modifiedAt: null,
        name: 'Products',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 5,
        modifiedAt: null,
        name: 'Starter Kits',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-04T18:03:51.313Z'),
        id: 6,
        modifiedAt: null,
        name: 'Recycling',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-05T18:03:51.313Z'),
        id: 7,
        modifiedAt: null,
        name: 'Version 5',
        type: 'questions',
    },
];
const allCategoriesForProjectKamp = [
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 8,
        modifiedAt: null,
        name: 'Construction',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 9,
        modifiedAt: null,
        name: 'Food',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 10,
        modifiedAt: null,
        name: 'Landscape',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 11,
        modifiedAt: null,
        name: 'Other',
        type: 'questions',
    },
    {
        createdAt: new Date('2022-12-03T18:03:51.313Z'),
        id: 12,
        modifiedAt: null,
        name: 'Utilities',
        type: 'questions',
    },
];
export const Basic = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const allCategories = [...allCategoriesForPreciousPlastic, ...allCategoriesForProjectKamp];
    return (_jsx("div", { style: { maxWidth: '500px' }, children: _jsx(CategoryHorizonalList, { activeCategory: activeCategory, allCategories: allCategories, setActiveCategory: setActiveCategory }) }));
};
export const WhenGlyphNotPresent = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const noGlyphCategories = [
        {
            createdAt: new Date('2022-12-03T18:03:51.313Z'),
            id: 13,
            modifiedAt: null,
            name: 'No Glphy A',
            type: 'questions',
        },
        {
            createdAt: new Date('2022-12-03T18:03:51.313Z'),
            id: 14,
            modifiedAt: null,
            name: 'No Glphy B',
            type: 'questions',
        },
        {
            createdAt: new Date('2022-12-03T18:03:51.313Z'),
            id: 15,
            modifiedAt: null,
            name: 'No Glphy C',
            type: 'questions',
        },
    ];
    return (_jsx("div", { style: { maxWidth: '500px' }, children: _jsx(CategoryHorizonalList, { activeCategory: activeCategory, allCategories: noGlyphCategories, setActiveCategory: setActiveCategory }) }));
};
export const OnlyOne = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const twoCategories = [allCategoriesForPreciousPlastic[0], allCategoriesForPreciousPlastic[1]];
    return (_jsxs("div", { style: { maxWidth: '500px' }, children: [_jsx(CategoryHorizonalList, { activeCategory: activeCategory, allCategories: twoCategories, setActiveCategory: setActiveCategory }), "(Shouldn't see anything, only renders for two or more)"] }));
};
