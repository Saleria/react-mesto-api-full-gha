import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as auth from '../utils/auth.js'

const Register = ({ onSubmit, onChange, email, password }) => {

    return (
        <div className="registration">
            <h1 className="registration__title">Регистрация</h1>
            <form className="registration__form"
                onSubmit={onSubmit}>
                <input className="registration__input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={onChange}
                    value={email}
                    required />
                <input className="registration__input"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={onChange}
                    value={password}
                    required />
                <button className="registration__button"
                    type="submit">
                    Зарегистрироваться
                </button>
                <Link to="/sign-in" className="registration__enter">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    );
};

export default Register; 