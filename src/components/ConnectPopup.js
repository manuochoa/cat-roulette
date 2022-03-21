import { useState } from "react";
import Popup from "./common/Popup";

import metamaskIcon from "../images/svg/metamask.svg";
import wcIcon from "../images/svg/wc.svg";
import Close from "./../Icons/Close";

export default function ConnectPopup({
  connectMetamask,
  connectWalletConnect,
  popupVisible,
  setPopupVisible,
}) {
  const [checkboxes, setCheckboxes] = useState({
    metamask: false,
    walletConnect: false,
  });

  function closePopup() {
    setPopupVisible(false);
  }

  return (
    <Popup
      className="popup--connect"
      popupShow={popupVisible}
      setPopupShow={setPopupVisible}
    >
      <button className="popup__close" onClick={closePopup}>
        <Close className="popup__close-icon" />
      </button>
      <button
        className={"popup__button" + (checkboxes.metamask ? " active" : "")}
        onClick={() => {
          connectMetamask();
          closePopup();
        }}
      >
        <img src={metamaskIcon} className="popup__button-icon" alt="metamask" />
        <h1 className="popup__button-title">Metamask</h1>
        <span className="popup__button-text">
          Connect to your MetaMask Wallet
        </span>
      </button>
      <button
        className={
          "popup__button" + (checkboxes.walletConnect ? " active" : "")
        }
        onClick={() => {
          connectWalletConnect();
          closePopup();
        }}
      >
        <img src={wcIcon} className="popup__button-icon" alt="wallet connect" />
        <h1 className="popup__button-title">WalletConnect</h1>
        <span className="popup__button-text">
          Scan with WalletConnect to connect
        </span>
      </button>
    </Popup>
  );
}
