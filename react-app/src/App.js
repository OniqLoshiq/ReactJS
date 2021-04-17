import { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/Header/Header';
import JumbotronWrapper from './components/JumbotronWrapper/JumbotronWrapper'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Category/Categories';
import ViewArticle from './components/Article/ViewArticle';
import Footer from './components/Footer/Footer';
import Notification from './components/Shared/Notification';
// import ErrorPage from './pages/ErrorPage';

import NotificationContext from './contexts/notificationContext';

import Register from './components/User/Register';
import SignIn from './components/User/SignIn';
import apiRoutes from './helpers/apiRoutes';
import AuthContext from './contexts/authContext';
import usersService from './services/usersService';
import ListUsers from './components/User/ListUsers';
import CreateCategory from './components/Category/CreateCategory';
import CreateArticle from './components/Article/CreateArticle';
import EditArticle from './components/Article/EditArticle';
import ViewCategory from './components/Category/ViewCategory';
import isAuth from './hoc/isAuth';
import isGuest from './hoc/isGuest';
import isAdmin from './hoc/isAdmin';
import isNotBasic from './hoc/isNotBasic';
import Demo from './components/Demo/Demo';
import jumboProps from './helpers/jumboProps';

const App = () => {
  const [userCredentials, setUserCredentials] = useState(null); //id email profilePicture username role
  const [notificationData, setNotificationData] = useState({ show: false });
  const history = useHistory();

  useEffect(() => {
    fetch(apiRoutes.auth, { credentials: "include" })
      .then(res => res.json())
      .then(user => {
        if (typeof user === "object") {
          setUserCredentials(user)
        } else {
          setUserCredentials(null);
        }
      })
      .catch((error) => {
        setUserCredentials(null);
        throw error;
      })
  }, []);

  const updateNotification = (type, message) => {
    setNotificationData({
      show: true,
      type: type,
      message: message
    });
  }

  const resetNotification = () => {
    setNotificationData({
      show: false
    })
  }

  const setTimeoutNotification = (type, message) => {
    updateNotification(type, message);
    setTimeout(() => {
      resetNotification();
    }, 2000);
  }

  const notificationValue = {
    update: updateNotification,
    reset: resetNotification,
    timeout: setTimeoutNotification
  }

  return (
    <AuthContext.Provider value={{ userCredentials, setUserCredentials }}>
      <NotificationContext.Provider value={notificationValue}>

        <Header username={userCredentials?.username} role={userCredentials?.role} profilePicture={userCredentials?.profilePicture} />

        {notificationData.show && <Notification type={notificationData.type} message={notificationData.message} />}
        {/* <JumbotronWrapper /> */}

        <Switch>
          {/* <Layout> */}
            <Route path="/" exact component={Demo(Home)} />
            <Route path="/categories" exact component={Demo(Categories)} />
            <Route path="/category/create" exact component={isAuth(isAdmin(Demo(CreateCategory)))} />
            <Route path="/category/:id" exact component={Demo(ViewCategory)} />
            <Route path="/article/create" exact component={isAuth(Demo(CreateArticle))} />
            <Route path="/article/:id" exact component={Demo(ViewArticle)} />
            <Route path="/article/edit/:id" exact component={isAuth(isNotBasic(Demo(EditArticle)))} />

            <Route path="/user/register" exact component={isGuest(Demo(Register))} />
            <Route path="/user/signIn" exact component={isGuest(Demo(SignIn))} />
            <Route path="/user/list" exact component={isAuth(isAdmin(Demo(ListUsers)))} />

            {
              userCredentials?.username && (
                <Route path="/user/logout" exact render={() => {
                  usersService.logOut().then(text => {
                    setUserCredentials(null);
                    console.log(text)
                    history.push('/')
                  })
                    .catch(err => {
                      console.log(err);
                      history.push('/')
                    })
                }}
                />
              )
            }
            {/* <Route path="*" component={ErrorPage} /> */}
          {/* </Layout> */}
        </Switch>

        <Footer />

      </NotificationContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
