import React from "react";

const Login = ({ email, password, onChange, onSubmit }) => {

    return (
        <div className="registration">
            <h1 className="registration__title">Вход</h1>
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
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login; 
