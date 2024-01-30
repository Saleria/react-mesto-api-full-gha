import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__item-button ${isLiked && 'element__item-button_active'}`
    );
    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element__item">
            <img className="element__item-img element__photo"
                alt={card.name}
                src={card.link}
                onClick={handleClick} />
            {isOwn && <button className='element__item-delete' onClick={handleDeleteClick} />}
            <div className="element__item-content">
                <h2 className="element__item-title element__photo-title">{card.name}</h2>
                <div className="element__item-like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <div className="element__item-quantity">{card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card; 