import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            description: description
        });
    }

    return(
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                id="popup__input-profile-name"
                className="popup__field popup__field_name_name"
                type="text"
                name="name"
                placeholder="имя"
                minLength="2"
                maxLength="40"
                value={name || ''}
                onChange={handleNameChange}
                required
            />
            <span className="popup__input-error popup__input-profile-name-error"></span>
            <input
                id="popup__input-profile-title"
                className="popup__field popup__field_name_title"
                type="text"
                name="title"
                placeholder="звание"
                minLength="2"
                maxLength="200"
                value={description || ''}
                onChange={handleDescriptionChange}
                required
            />
            <span className="popup__input-error popup__input-profile-title-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup
