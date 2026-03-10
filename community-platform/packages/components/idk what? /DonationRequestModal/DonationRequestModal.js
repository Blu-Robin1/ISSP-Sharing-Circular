import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AspectImage, Card, Flex, Text } from 'theme-ui';
import { Modal } from '../Modal/Modal';
const FALLBACK_DONATION_WIDGET = 'https://donorbox.org/embed/onearmy?a=b&hide_donation_meter=true';
const REQUEST_THANKYOU = 'Thank you for helping to make this possible!';
export const DonationRequestModal = (props) => {
    const { spaceName, description, iframeSrc, imageUrl, isOpen, onDidDismiss, children } = props;
    const title = spaceName ? `Support ${spaceName}` : 'Support our work';
    const iframeArgs = {
        allowpaymentrequest: 'allowpaymentrequest',
        allow: 'payment',
        'data-donorbox-id': 'DonorBox-f2',
        'data-testid': 'donationRequestIframe',
        name: 'donorbox',
        seamless: true,
        src: iframeSrc ? iframeSrc + '?hide_donation_meter=true' : FALLBACK_DONATION_WIDGET,
    };
    return (_jsxs(Modal, { onDismiss: onDidDismiss, isOpen: isOpen, sx: {
            width: ['500px', '750px', '1050px'],
            minWidth: '350px',
            border: '0 !important',
            background: 'none !important',
        }, children: [_jsxs(Card, { sx: {
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    borderRadius: '4px 4px 0 0',
                }, "data-cy": "DonationRequest", "data-testid": "DonationRequest", children: [_jsx("script", { src: "https://donorbox.org/widget.js", type: "module", "data-paypalexpress": "false", async: true }), _jsxs(Flex, { sx: {
                            flexDirection: ['column', 'row'],
                        }, children: [_jsxs(Flex, { sx: { flexDirection: 'column', flex: 1 }, children: [imageUrl && (_jsx(Flex, { sx: { display: ['none', 'inline'] }, children: _jsx(AspectImage, { loading: "lazy", ratio: 16 / 9, src: imageUrl, alt: title, "data-testid": "donationRequestImage" }) })), _jsxs(Text, { sx: { padding: [2, 4, 6] }, children: [_jsx(Text, { as: "h1", children: title }), _jsx("p", { children: description }), _jsx("p", { children: REQUEST_THANKYOU })] })] }), _jsx(Flex, { sx: {
                                    borderLeft: [0, '2px solid'],
                                    minHeight: '524px',
                                    width: ['100%', '350px', '400px'],
                                }, children: _jsx("iframe", { ...iframeArgs, loading: "lazy", style: { border: '0', overflow: 'scroll', width: '100%' } }) })] })] }), children] }));
};
