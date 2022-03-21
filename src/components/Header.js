import logo from "../images/logo.svg";

export default function Header({
  userAddress,
  disconnectWallet,
  setPopupVisible,
}) {
  return (
    <header className="header container">
      <a href="/" className="logo header__logo">
        <img src={logo} className="logo__icon" alt="logo" />
      </a>

      <button
        className="button button--header header__button"
        onClick={
          userAddress ? () => disconnectWallet() : () => setPopupVisible(true)
        }
      >
        {userAddress
          ? `${userAddress.slice(0, 6)}...${userAddress.slice(-6)}`
          : "Connect wallet"}
      </button>
    </header>
  );
}
