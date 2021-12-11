import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])


    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.handleSubmit({
            name: name,
            link: link
        });
    }

    return(
        <PopupWithForm
            name="add-place"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText="Создать"
            onSubmit={handleSubmit}

        >
            <input
                id="popup__input-place-name"
                className="popup__field popup__field_name_name"
                type="text"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameChange}
                required
            />
            <span className="popup__input-error popup__input-place-name-error"></span>
            <input
                id="popup__input-place-link"
                className="popup__field popup__field_name_link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                value={link}
                onChange={handleLinkChange}
                required
            />
            <span className="popup__input-error popup__input-place-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup
