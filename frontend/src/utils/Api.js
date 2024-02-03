class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials:"include"
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials:"include"
        })
            .then(this._checkResponse)
    }

    changeUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials:"include",
            body: JSON.stringify(data)
        })
            .then(this._checkResponse)
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials:"include",
            body: JSON.stringify(data)
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials:"include"
        })
            .then(this._checkResponse)
    }

    changeUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials:"include",
            body: JSON.stringify(data)
        })
            .then(this._checkResponse)
    }

    changeLikeState(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers,
            credentials:"include"
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
    url: 'https://api.mesto.saleria.nomoredomainsmonster.ru',
    headers: {
        "Content-Type": "application/json",
        "Autorization": `Bearer ${localStorage.getItem('jwt')}`,        
    },    
});

export default api; 
