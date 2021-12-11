import React from "react";
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import ImagePopup from "./ImagePopup.js"
import api from "../utils/api"
import authApi from "../utils/authApi"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from "./Login.js"
import Register from "./Register.js"
import InfoTooltip from "./InfoTooltip.js"
import ProtectedRoute from "./ProtectedRoute";

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isEditProfilePopupOpen: false,
            isAddPlacePopupOpen: false,
            isEditAvatarPopupOpen: false,
            isInfoTooltipPopupOpen: false,
            isSuccessfulAuth: false,
            selectedCard: {name: '', link: ''},
            currentUser: {},
            email: '',
            cards: []
        };
    }

    componentDidMount() {
        api.getUser().then((user) => {
            this.setState({currentUser: user})
        }).catch((err) => {
            console.log(err);
        })

        api.getInitialCards().then((initialCards) => {
            this.setState({
                cards: initialCards,
            });
        }).catch((err) => {
            console.log(err);
        });

        if (localStorage.getItem("AuthToken")) {
            authApi.getUserEmail().then((res) => {
                this.setState({email: res.data.email})
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    handleEditProfileClick = () => {
        this.setState({isEditProfilePopupOpen: true})
    }

    handleAddPlaceClick = () => {
        this.setState({isAddPlacePopupOpen: true})
    }

    handleEditAvatarClick = () => {
        this.setState({isEditAvatarPopupOpen: true})
    }

    handleCardClick = (card) => {
        this.setState({selectedCard: card})
    }

    closeAllPopups = (evt) =>  {
          this.setState({
                            isEditProfilePopupOpen: false,
                            isAddPlacePopupOpen: false,
                            isEditAvatarPopupOpen: false,
                            isInfoTooltipPopupOpen: false,
                            selectedCard: {name: '', link: ''},
                        })
    }

    handleUpdateUser = (obj) => {
        api.setUser(obj.name, obj.description).then((user) => {
          this.setState({ currentUser: user })
          this.closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }

    handleUpdateAvatar = (link) => {
        api.updateAvatar(link).then((user) => {
            this.setState({ currentUser: user })
            this.closeAllPopups();
        }).catch((err) => {
            console.log(err);
        })
    }

    handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            this.setState({cards: this.state.cards.map((c) => c._id === card._id ? newCard : c)});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            this.setState({cards: this.state.cards.filter((c) => c._id !== card._id)});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleAddPlaceSubmit(card) {
        api.addCard(card.name, card.link).then((newCard) => {
            this.setState({ cards: [newCard, ...this.state.cards] });
            this.closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    handleSignUp = (email, password) => {
        authApi.signUp(email, password).then(() => {
            this.setState({
                isInfoTooltipPopupOpen: true,
                isSuccessfulAuth: true
            })
        }).catch((err) => {
            this.setState({
                isInfoTooltipPopupOpen: true,
                isSuccessfulAuth: false
            })
            console.log(err);
        })
    }

    handleSignIn = (email, password) => {
        authApi.signIn(email, password).then((res) => {
            const { token } = res
            localStorage.setItem("AuthToken", token)
            this.setState({
                email: email,
                isInfoTooltipPopupOpen: true,
                isSuccessfulAuth: true
            })
            this.props.history.push('/');
        }).catch((err) => {
            this.setState({
                isInfoTooltipPopupOpen: true,
                isSuccessfulAuth: false
            })
            console.log(err);
        })
    }

    onSignOut = () => {
        localStorage.removeItem("AuthToken")
        this.props.history.push('/sign-in');
    }

    gotoSignUp = () => {
        localStorage.removeItem("AuthToken")
        this.props.history.push('/sign-up');
    }

    render(){
        return (
            <CurrentUserContext.Provider value={this.state.currentUser}>
                <Header
                    email={this.state.email}
                    gotoSignIn={this.onSignOut}
                    gotoSignUp={this.gotoSignUp}
                />
                <InfoTooltip
                    success={this.state.isSuccessfulAuth}
                    isOpen={this.state.isInfoTooltipPopupOpen}
                    onClose={this.closeAllPopups}
                />

                <Switch>
                    <Route path="/sign-up">
                        <Register onSubmit={this.handleSignUp} />
                    </Route>

                    <Route path="/sign-in">
                        <Login onSubmit={this.handleSignIn} />
                    </Route>

                    <ProtectedRoute path="/">
                            <Main
                                onEditProfile={this.handleEditProfileClick}
                                onAddPlace={this.handleAddPlaceClick}
                                onEditAvatar={this.handleEditAvatarClick}
                                onCardClick={this.handleCardClick}
                                cards={this.state.cards}
                                onCardLike={this.handleCardLike.bind(this)}
                                onCardDelete={this.handleCardDelete.bind(this)}
                            />
                            <Footer />

                            <EditProfilePopup
                                isOpen={this.state.isEditProfilePopupOpen}
                                onClose={this.closeAllPopups}
                                onUpdateUser={this.handleUpdateUser}
                            />

                            <AddPlacePopup
                                isOpen={this.state.isAddPlacePopupOpen}
                                onClose={this.closeAllPopups}
                                handleSubmit={this.handleAddPlaceSubmit.bind(this)}
                            />


                            <EditAvatarPopup
                                isOpen={this.state.isEditAvatarPopupOpen}
                                onClose={this.closeAllPopups}
                                onUpdateAvatar={this.handleUpdateAvatar}
                            />

                            <PopupWithForm
                                name="confirmation"
                                title="Вы уверены?"
                                buttonText="Да"
                            />

                            <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
                    </ProtectedRoute>
                </Switch>
            </CurrentUserContext.Provider>
        )
    }
}

export default withRouter(App);
