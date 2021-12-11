import React from "react";

function Login(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const submitForm = (e) => {
        e.preventDefault()
        props.onSubmit(email, password)
    }
    return (
        <form className="register" name="login" onSubmit={submitForm}>
            <h2 className="register__title">
                Вход
            </h2>
            <input
                id="login__email"
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
                id="login__password"
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
                Войти
            </button>
        </form>
    )
}

export default Login;
