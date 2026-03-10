import { jsx as _jsx } from "react/jsx-runtime";
import { Image } from 'theme-ui';
import Celebration from '../../assets/images/celebration.svg';
import Email from '../../assets/images/email.svg';
export const HeroBanner = ({ type }) => {
    const src = {
        celebration: Celebration,
        email: Email,
    };
    return _jsx(Image, { loading: "lazy", src: src[type] });
};
