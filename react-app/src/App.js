import { useState, useEffect, useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import JumbotronWrapper from './components/JumbotronWrapper/JumbotronWrapper'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Categories from './components/Category/Categories';
import Demo from './components/Demo/Demo';
import Demo2 from './components/Demo/Demo2';
import Footer from './components/Footer/Footer';
import Notification from './components/Shared/Notification';

import NotificationContext from './contexts/notificationContext';

import Register from './components/User/Register';
import SignIn from './components/User/SignIn';
import apiRoutes from './helpers/apiRoutes';
import AuthContext from './contexts/authContext';
import authService from './services/authService';

const Auth = ({ children }) => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    fetch(apiRoutes.auth, { credentials: "include" })
      .then(res => res.json())
      .then(user => {
        if (typeof user === "object") {
          auth.setUserCredentials(user)
        } else {
          auth.setUserCredentials(null);
        }
      })
      .catch((error) => {
        auth.setUserCredentials(null);
        throw error;
      })
  }, []);

  return (
    <>
      {children}
    </>
  );
}


const App = () => {
  const [userCredentials, setUserCredentials] = useState(null);
  const [notificationData, setNotificationData] = useState({ show: false });

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

  const notificationValue = {
    update: updateNotification,
    reset: resetNotification
  }



  // constructor(props){
  //   super(props)
  //   this.state = {
  //     shouldFormatHeader: false,
  //     pageYOffset: 0
  //   }

  //   componentDidMount() {
  //     window.addEventListener('scroll', this.props.handleScroll);
  // }

  // componentWillUnmount(){
  //     window.removeEventListener('scroll', this.props.handleScroll)
  // }

  //   this.handleScroll = this.handleScroll.bind(this);
  // }

  // handleScroll(){
  //   this.setState({ 
  //     pageYOffset: window.pageYOffset,
  //     shouldFormatHeader: this.state.pageYOffset < 344 ? false : true
  //   });
  // }

  // componentDidUpdate(prevProps, prevState){
  //   if(this.state.shouldFormatHeader === prevState.shouldFormatHeader){
  //     return;
  //   }
  // }

  return (
    <AuthContext.Provider value={{ userCredentials, setUserCredentials }}>
      <Auth>
        <NotificationContext.Provider value={notificationValue}>
          <Header username={userCredentials?.username} />

          {notificationData.show && <Notification type={notificationData.type} message={notificationData.message} />}
          <JumbotronWrapper />

          <Switch>
            <Layout>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/demo" exact component={Demo} />
              <Route path="/demo2" exact component={Demo2} />

              <Route path="/user/register" exact component={Register} />
              <Route path="/user/signIn" exact component={SignIn} />
              <Route path="/user/logout" exact render={() => {
                  authService.logOut().then(text => {
                    notificationValue.update("success", text);
                    setUserCredentials(null);
                    return <Redirect to="/" />
                  })
                }} 
              />

              <Route path="/categories" exact component={Categories} />
            </Layout>
          </Switch>

          <Footer />
        </NotificationContext.Provider>
      </Auth >
    </AuthContext.Provider>
  );
}

export default App;
