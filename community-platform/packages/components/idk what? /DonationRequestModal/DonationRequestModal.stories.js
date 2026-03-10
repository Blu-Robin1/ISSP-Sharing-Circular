import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { DonationRequestModal } from './DonationRequestModal';
export default {
    title: 'Components/DonationRequestModal',
    component: DonationRequestModal,
};
export const Default = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);
    return (_jsx(DonationRequestModal, { description: "All of the content here is free. Your donation supports this library of Open Source recycling knowledge. Making it possible for everyone in the world to use it and start recycling.", iframeSrc: "https://donorbox.org/embed/ppcpdonor?language=en", imageUrl: "https://images.unsplash.com/photo-1520222984843-df35ebc0f24d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9", isOpen: isModalOpen, onDidDismiss: () => toggleIsModalOpen() }));
};
