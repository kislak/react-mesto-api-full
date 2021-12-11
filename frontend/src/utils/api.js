class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            credentials: "include"
        }).then(res => this._getResponseData(res));
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            credentials: "include"
        }).then(res => this._getResponseData(res));
    }

    setUser(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(res => this._getResponseData(res))
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(res => this._getResponseData(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: "include"
        }).then(res => this._getResponseData(res));
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: "include",
        }).then(res => this._getResponseData(res))

    }
    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: "include"
        }).then(res => this._getResponseData(res))
    }

    changeLikeCardStatus(cardId, addLike) {
        return (addLike ? this.addLike(cardId) : this.removeLike(cardId))
    }

    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                avatar: link
            }),
        }).then(res => this._getResponseData(res))
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

}

const api = new Api({
    baseUrl: 'http://localhost:3000',
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        // authorization: 'f852889b-4e45-42a6-a8c2-82025ba7c42c',
        'Content-Type': 'application/json'
    }
});

export default api;
