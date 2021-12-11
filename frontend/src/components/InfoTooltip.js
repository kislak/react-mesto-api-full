import React from "react";
import cross from "../images/cross.svg";
import check from "../images/check.svg";

function InfoTooltip(props) {
    return (
        <div className={`popup popup_type_info ${!!props.isOpen && 'popup_opened'}`}>
            <div className="popup__container tooltip">
                <button
                    className="popup__close"
                    type="button"
                    onClick={props.onClose}
                />
                <img className="tooltip__image"
                   src={ !!props.success ? check : cross }
                   alt={ !!props.success ? "успех" : "что-то не так" }
                />
                <div className="tooltip__notice">
                  { !!props.success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
                </div>

            </div>
        </div>
    )
}

export default InfoTooltip;
