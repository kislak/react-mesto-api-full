import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const submitForm = (e) => {
        e.preventDefault()
        props.onSubmit(email, password)
    }

    return (
        <form className="register" name="register" onSubmit={submitForm}>
            <h2 className="register__title">
                Регистрация
            </h2>

            <input
                id="register__input-email"
                className="register__input"
                type="text"
                name="email"
                placeholder="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.currentTarget.value)}
                value={email}
                required
            />
            <input
                id="register__input-password"
                className="register__input"
                type="password"
                name="password"
                placeholder="Пароль"
                autoComplete="off"
                onChange={(e) => setPassword(e.currentTarget.value)}
                value={password}
                required
            />

            <button className="register__submit" type="submit">
                Зарегистрироваться
            </button>
            <div className="register__ref" >
                Уже зарегистрированы? <Link className="register__link" to="sign-in" >Войти</Link>
            </div>
        </form>
    )
}

export default Register;
