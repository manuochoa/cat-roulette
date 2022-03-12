import { useState } from 'react';
import ConnectPopup from './components/ConnectPopup';
import Header from './components/Header';
import Mint from './components/Mint';

export default function App() {
    const [popupVisible, setPopupVisible] = useState(false);

    return (
        <>
            <Header setPopupVisible={setPopupVisible} />
            <Mint />
            <ConnectPopup popupVisible={popupVisible} setPopupVisible={setPopupVisible} />
        </>
    );
}
