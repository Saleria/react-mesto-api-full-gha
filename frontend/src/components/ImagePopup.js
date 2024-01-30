import React from "react";

function ImagePopup({ card, onClose }) {

    return (
        <section className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
            <figure className="popup__img">
                <img className="popup__img-content"
                    src={card?.link}
                    alt={card?.name}
                />
                <figcaption className="popup__img-title">
                    {card?.name}
                </figcaption>
                <button className="popup__close popup__close_type_img"
                    type="button"
                    onClick={onClose} />
            </figure>
        </section>
    );
}

export default ImagePopup; 