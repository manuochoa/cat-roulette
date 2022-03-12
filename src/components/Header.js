import logo from "../images/logo.svg";

export default function Header({ setPopupVisible }) {

    return (
        <header className="header container">
            <a href="/" className="logo header__logo">
                <img src={logo} className="logo__icon" alt="logo" />
            </a>
            <button className="button button--header header__button" onClick={() => setPopupVisible(true)}>Connect wallet</button>
        </header>
    )
}