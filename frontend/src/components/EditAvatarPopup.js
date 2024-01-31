import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
    const avatarRef = React.useRef();
    const { isLoading, closeAllPopups } = React.useContext(AppContext);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={closeAllPopups}
            onSubmit={handleSubmit}>
            <div className="popup__input">
                <input id="avatar-url"
                    autoComplete="off"
                    type="url"
                    name="avatar-url"
                    className="popup__text popup__text_type_avatar-url"
                    placeholder="Ссылка на картинку" required
                    ref={avatarRef} />
                <span id="avatar-url-error"
                    className="popup__error-message"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup; 