import React from "react";
import logo from "../images/logo-img.svg";

function Header() {
    return (
        <header className="header">
            <img src={logo}
                alt="Логотип Место"
                className="header__logo" />
        </header>
    );
}

export default Header; 