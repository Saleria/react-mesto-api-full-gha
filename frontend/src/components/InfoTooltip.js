import React from "react";
import imageTrue from "../images/true.svg";
import imageFalse from "../images/false.svg";
import { AppContext } from "../context/AppContext";

function InfoTooltip({ name, isOpen, toolTipStatus }) {
    const { closeAllPopups } = React.useContext(AppContext);

    return (
        <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close"
                    type="button"
                    onClick={closeAllPopups} />
                <div className="popup__tooltip">
                    <img className="popup__tooltip-img" src={toolTipStatus !== 'error' ? imageTrue : imageFalse}
                        alt={toolTipStatus !== 'error' ? 'галочка в круге' : 'красный крестик в круге'} />
                    <h2 className="popup__title popup__title_tooltip">{
                        toolTipStatus !== 'error' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}
                    </h2>
                </div>
            </div>
        </section>
    );
}

export default InfoTooltip;