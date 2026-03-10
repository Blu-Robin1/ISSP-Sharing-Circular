import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { SearchField } from './SearchField';
export default {
    title: 'Forms/SearchField',
    component: SearchField,
};
export const Default = () => {
    const [searchValue, setSearchValue] = useState('');
    return (_jsx(SearchField, { dataCy: "default-search-box", placeHolder: "Default search", value: searchValue, onChange: (value) => setSearchValue(value), onClickDelete: () => setSearchValue(''), onClickSearch: () => { } }));
};
