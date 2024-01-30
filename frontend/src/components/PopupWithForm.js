import React from "react";

function PopupWithForm({ name, title, onClose, isOpen, children, buttonText, onSubmit }) {
    return (
        <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close"
                    type="button"
                    onClick={onClose} />
                <h2 className="popup__title">{title}</h2>
                <form className={`popup__form popup__${name}`}
                    name={name}
                    onSubmit={onSubmit}>
                    <fieldset className="popup__info">
                        {children}
                    </fieldset>
                    <button className="popup__save-button"
                        type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm; 