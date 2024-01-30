import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-block">
                    <img src={currentUser.avatar}
                        alt="Ваше фото"
                        className="profile__avatar" />
                    <button type="button"
                        className="profile__avatar-edit-button"
                        onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__list">
                    <div className="profile__inform">
                        <h1 className="profile__list-title">{currentUser.name}</h1>
                        <button className="profile__list-edit-button"
                            type="button"
                            onClick={onEditProfile}
                        />
                    </div>
                    <p className="profile__list-subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__add-button"
                    type="button"
                    onClick={onAddPlace} />

            </section>
            <section className="elements">
                <ul className="element">
                    {cards.map((card) => (
                        <Card key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                    ))};
                </ul>
            </section>
        </main>
    );
}

export default Main; 