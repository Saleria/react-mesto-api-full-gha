import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";

function AddPlacePopup({ isOpen, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const { isLoading, closeAllPopups } = React.useContext(AppContext);

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name, link
        });
    }

    return (
        <PopupWithForm
            name="mesto"
            title="Новое место"
            buttonText={isLoading ? 'Сохранение...' : 'Создать'}
            isOpen={isOpen}
            onClose={closeAllPopups}
            onSubmit={handleSubmit}>
            <div className="popup__input">
                <input id="mesto-name"
                    autoComplete="off"
                    type="text"
                    name="mesto-name"
                    className="popup__text popup__text_type_mesto"
                    placeholder="Название" required
                    minLength="2"
                    maxLength="30"
                    value={name ?? ''}
                    onChange={handleNameChange} />
                <span id="mesto-name-error"
                    className="popup__error-message"></span>
            </div>
            <div className="popup__input">
                <input id="url"
                    autoComplete="off"
                    type="url"
                    name="url"
                    className="popup__text popup__text_type_url"
                    placeholder="Ссылка на картинку" required
                    value={link ?? ''}
                    onChange={handleLinkChange} />
                <span id="url-error"
                    className="popup__error-message"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup; 