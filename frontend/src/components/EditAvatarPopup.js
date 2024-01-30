import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() =>{
        avatarRef.current.value = ''; 
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
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