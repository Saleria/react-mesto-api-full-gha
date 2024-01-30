import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <div className="popup__input">
                <input type="text"
                    id="text-name"
                    name="text-name"
                    className="popup__text popup__text_type_name"
                    placeholder="Имя" required
                    minLength="2"
                    maxLength="40"
                    value={name ?? ''}
                    onChange={handleNameChange} />
                <span id="text-name-error"
                    className="popup__error-message"></span>
            </div>
            <div className="popup__input">
                <input type="text"
                    id="inform"
                    name="job-name"
                    className="popup__text popup__text_type_job"
                    placeholder="Вид деятельности" required
                    minLength="2"
                    maxLength="200"
                    value={description ?? ''}
                    onChange={handleDescriptionChange} />
                <span id="inform-error"
                    className="popup__error-message"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup; 