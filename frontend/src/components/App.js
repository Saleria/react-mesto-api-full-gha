import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { AppContext } from '../context/AppContext.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [registrationTooltip, setRegistrationTooltip] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    handleTokenCheck();
  }, [navigate]);

  React.useEffect(() => { 
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCardsData]) => {
        setCurrentUser(userData);
        setCards(initialCardsData);
      })
      .catch(console.error); 
    }             
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeState(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch(console.error)
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.changeUserInfo(data)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.changeUserAvatar(data)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
    setUserEmail('');
    localStorage.removeItem('jwt');
    navigate("/sign-in", { replace: true });
  }

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleRegistedSubmit(evt) {
    evt.preventDefault();
    auth.register(formValue.email, formValue.password).then((res) => {
      if (res) {
        setRegistrationTooltip("success");
        navigate('/sign-in');
      }
    }).catch((err) => {
      if (err.status === 400) {
        console.log('Некорректно заполнено одно из полей');
      } setRegistrationTooltip("error");

    }).finally(() => {
      setIsInfoTooltipOpen(true);
    })
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setUserEmail(formValue.email)
          setFormValue({ email: '', password: '' });
          handleLogin();
          navigate('/mesto', { replace: true });
        }
      }).catch((err) => {
        if (err.status === 400) {
          console.log('не передано одно из полей');
        }
        if (err.status === 401) {
          console.log('пользователь с email не найден');
        } setRegistrationTooltip("error");
        setIsInfoTooltipOpen(true);
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if ('jwt') {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate('/mesto', { replace: true });
          setUserEmail(res.email);
        }
      }).catch((error) => {
        if (error.status === 400) {
          console.log('Токен не передан или передан не в том формате');
        }
        if (error.status === 401) {
          console.log('Переданный токен некорректен');
        }
      });
    }
  }

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            email={userEmail}
            onLogOut={handleLogOut} />
          <Routes>
            <Route
              path='/'
              element={
                loggedIn ? (
                  <Navigate to="/mesto" replace />
                ) : (<Navigate to="/sign-in" replace />)
              }
            />
            <Route path="/mesto"
              element={<ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn} />
              }
            />
            <Route path="/sign-up"
              element={
                <Register
                  onChange={handleChange}
                  onSubmit={handleRegistedSubmit}
                  email={formValue.email}
                  password={formValue.password}
                />}
            />
            <Route path='/sign-in' element={
              <Login
                email={formValue.email}
                password={formValue.password}
                onChange={handleChange}
                onSubmit={handleLoginSubmit} />} />
          </Routes>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да" />
          <ImagePopup
            card={selectedCard}
          />
          <InfoTooltip
            name="inform-about-registration"
            isOpen={isInfoTooltipOpen}
            toolTipStatus={registrationTooltip}
          />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
