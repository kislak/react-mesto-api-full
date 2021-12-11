class AuthApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    signUp(email, password) {
        return this._sendRequest('signup', email, password)
    }

    signIn(email, password) {
        return this._sendRequest('signin', email, password)
    }

    getUserEmail() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("AuthToken")}`
            }
        }).then(res => this._getResponseData(res));
    }

    _sendRequest(endpoint, email, password) {
        return fetch(`${this._baseUrl}/${endpoint}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "password": password,
                    "email": email
                }),
        }).then(res => this._getResponseData(res));
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

const authApi = new AuthApi({
    baseUrl: "http://localhost:3000"
    // baseUrl: "https://auth.nomoreparties.co"
});

export default authApi;
