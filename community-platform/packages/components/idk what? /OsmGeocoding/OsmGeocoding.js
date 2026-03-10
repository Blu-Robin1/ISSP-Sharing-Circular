import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { SearchField } from '../SearchField/SearchField';
import { OsmGeocodingLoader } from './OsmGeocodingLoader';
import { OsmGeocodingResultsList } from './OsmGeocodingResultsList';
export const OsmGeocoding = ({ placeholder = 'Search for an address', debounceMs = 800, callback, acceptLanguage = 'en', viewbox = '', loading = false, }) => {
    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showLoader, setShowLoader] = useState(loading);
    const [queryLocationService, setQueryLocationService] = useState(false);
    const mainContainerRef = useRef(null);
    document.addEventListener('click', function (event) {
        const isClickInside = mainContainerRef?.current?.contains(event.target);
        if (!isClickInside) {
            setShowResults(false);
        }
    });
    document.onkeyup = function (event) {
        if (event.key === 'Escape') {
            setShowResults(false);
        }
    };
    function getGeocoding(address = '') {
        if (address.length === 0)
            return;
        setShowLoader(true);
        let url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}&accept-language=${acceptLanguage}`;
        if (viewbox.length) {
            url = `${url}&viewbox=${viewbox}&bounded=1`;
        }
        fetch(url, {
            headers: new Headers({
                'User-Agent': 'onearmy.earth Community Platform (https://platform.onearmy.earth)',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            setResults(data);
            setShowResults(true);
        })
            .catch(null)
            .finally(() => setShowLoader(false));
    }
    const showResultsListing = !!results.length && showResults && !showLoader;
    const dcb = useDebouncedCallback((search) => getGeocoding(search), debounceMs);
    useEffect(() => {
        if (queryLocationService) {
            dcb(searchValue);
        }
    }, [searchValue, queryLocationService, dcb]);
    return (_jsxs("div", { "data-cy": "osm-geocoding", ref: mainContainerRef, style: { width: '100%' }, children: [_jsx(SearchField, { autoComplete: "off", name: "geocoding", id: "geocoding", dataCy: "osm-geocoding-input", placeHolder: placeholder, value: searchValue, onChange: (value) => {
                    setQueryLocationService(true);
                    setSearchValue(value);
                }, onClickDelete: () => {
                    setSearchValue('');
                    setQueryLocationService(false);
                }, onClickSearch: () => {
                    setQueryLocationService(true);
                    setSearchValue(searchValue);
                }, additionalStyle: {
                    background: 'white',
                    fontFamily: 'Varela Round',
                    fontSize: '14px',
                    border: '2px solid black',
                    height: '44px',
                    display: 'flex',
                    borderRadius: showResultsListing || showLoader ? '5px 5px 0 0' : '5px',
                    marginBottom: 0,
                } }), showLoader && _jsx(OsmGeocodingLoader, {}), showResultsListing && (_jsx(OsmGeocodingResultsList, { results: results, callback: (result) => {
                    if (result) {
                        setQueryLocationService(false);
                        setSearchValue(result.display_name);
                    }
                    callback(result);
                }, setShowResults: setShowResults }))] }));
};
