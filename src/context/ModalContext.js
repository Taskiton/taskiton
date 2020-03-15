import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export default function ModalContextProvider(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    let toggleModalState = () => {
        setIsModalOpen(!isModalOpen);
    }

    <ModalContext.Provider value={{isModalOpen, toggleModalState}}>
        {props.children}
    </ModalContext.Provider>
}


//Not using this code anywhere as of now