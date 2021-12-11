import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = '';
    })

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(avatarRef.current.value);
    }

    return(
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                id="popup__input-avatar-link"
                className="popup__field popup__field_name_link"
                type="url"
                name="link"
                ref={avatarRef}
                required
            />
            <span className="popup__input-error popup__input-avatar-link-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
