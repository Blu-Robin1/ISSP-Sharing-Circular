import { jsx as _jsx } from "react/jsx-runtime";
import { Flex } from 'theme-ui';
import { Tag } from '../Tag/Tag';
export const TagList = ({ tags }) => {
    return (_jsx(Flex, { sx: { gap: 1 }, "data-cy": "tag-list", children: tags
            .filter((tag) => !!tag)
            .map((tag) => (_jsx(Tag, { tag: tag }, tag.label))) }));
};
