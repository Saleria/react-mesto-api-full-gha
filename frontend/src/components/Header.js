import React from "react";
import logo from "../images/logo-img.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onLogOut }) {
    return (
        <header className="header">
            <div className="header__container">
                <img src={logo}
                    alt="Логотип Место"
                    className="header__logo" />
                <div className="header__registration">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <p className="header__email">{email}</p>
                                <Link className="header__subtitle" to="/sign-in" onClick={onLogOut}>Выйти</Link>
                            </>} />
                        <Route path="/sign-up" element={<Link to="/sign-in" className="header__subtitle">Войти</Link>} />
                        <Route path="/sign-in" element={<Link to="/sign-up" className="header__subtitle">Регистрация</Link>} />
                    </Routes>
                </div>
            </div>
        </header>
    );
}

export default Header; 