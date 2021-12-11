import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
import Card from './Card.js'

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar" onClick={props.onEditAvatar}>
                        <img className="profile__avatar-image" src={currentUser.avatar} alt="аватар"/>
                        <div className="profile__avatar-pencil"></div>
                    </div>
                    <div className="profile__name">
                        <h1 className="profile__name-text">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            aria-label="редактировать профайл"
                            onClick={props.onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__title">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    aria-label="добавить"
                    onClick={props.onAddPlace}
                ></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {
                        props.cards.map((card) => {
                            return(<Card
                                card={card}
                                key={card._id}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />)
                        })
                    }
                </ul>
            </section>
        </main>
    )

}

export default Main;

