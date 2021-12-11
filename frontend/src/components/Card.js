import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__heart ${isLiked && 'element__heart_active'}`
    )

    return(
        <li className="element">
            <img
                className="element__picture"
                src={props.card.link}
                alt={props.card.name}
                onClick={ () => { props.onCardClick(props.card)} }
            />
            {isOwn &&
              <button
                  className="element__delete-button"
                  type="button"
                  aria-label="удалить"
                  onClick={ () => { props.onCardDelete(props.card)} }
              >
              </button>
            }
            <div className="element__footer">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        aria-label="лайкнуть"
                        onClick={ () => { props.onCardLike(props.card) } }
                    >
                    </button>
                    <div className="element__like-counter">
                        {props.card.likes.length}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Card
