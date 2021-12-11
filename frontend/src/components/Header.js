import React from "react";
import { Route, Switch  } from 'react-router-dom';

function Header(props) {
    const [menuVisible, showMenu] = React.useState(false)

    const actions = <Switch>
        <Route exact path="/sign-up">
            <div className="header__link" onClick={props.gotoSignIn}> Войти </div>
        </Route>
        <Route exact path="/sign-in">
            <div className="header__link" onClick={props.gotoSignUp}> Регистрация </div>
        </Route>
        <Route exact path="/">
            <div className="header__email">{props.email}</div>
            <div className="header__link" onClick={props.gotoSignIn}> Выйти </div>
        </Route>
    </Switch>

    return (
        <>
            {menuVisible &&
                <div className="header__mobile-actions">
                    { actions }
                </div>
            }
            <header className="header">
                <div className="header__logo"></div>
                { !menuVisible && <div onClick={() => showMenu(true)} className="header__mobile-menu-open"></div> }
                { menuVisible && <div onClick={() => showMenu(false)} className="header__mobile-menu-close"></div> }

                <div className="header__actions">
                    { actions }
                </div>
            </header>
        </>
    )
}

export default Header;
