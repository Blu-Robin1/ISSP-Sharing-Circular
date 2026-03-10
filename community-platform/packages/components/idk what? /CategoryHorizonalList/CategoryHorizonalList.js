import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from 'theme-ui';
import { CardButton } from '../CardButton/CardButton';
import { getGlyph, Icon } from '../Icon/Icon';
import { VerticalList } from '../VerticalList/VerticalList.client';
export const CategoryHorizonalList = (props) => {
    const { activeCategory, allCategories, setActiveCategory } = props;
    if (!allCategories || !allCategories.length || allCategories.length < 3) {
        return null;
    }
    const orderedCategories = allCategories
        .slice()
        .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    const isCategorySelected = (category) => {
        return category.id === activeCategory?.id;
    };
    return (_jsx(VerticalList, { dataCy: "CategoryHorizonalList", children: orderedCategories.map((category, index) => {
            const isSelected = isCategorySelected(category);
            const name = category.name;
            const glyph = name.toLowerCase();
            const hasGlyph = getGlyph(glyph);
            return (_jsxs(CardButton, { "data-cy": `CategoryHorizonalList-Item${isSelected ? '-active' : ''}`, "data-testid": "CategoryHorizonalList-Item", title: name, onClick: () => setActiveCategory(isSelected ? null : category), extrastyles: {
                    alignItems: 'center',
                    background: 'none',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: ['80px', '100px', '130px'],
                    marginX: 1,
                    paddingY: 2,
                    textAlign: 'center',
                    width: ['80px', '100px', '130px'],
                    ...(isSelected
                        ? {
                            borderColor: 'green',
                            ':hover': { borderColor: 'green' },
                        }
                        : {
                            borderColor: 'background',
                            ':hover': { borderColor: 'background' },
                        }),
                }, isSelected: isSelected, children: [_jsx(Icon, { size: 40, glyph: hasGlyph ? glyph : 'category' }), _jsx(Text, { variant: "quiet", sx: { fontSize: 1 }, children: name })] }, index));
        }) }));
};
