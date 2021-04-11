import { useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import JumbotronWrapper from './components/JumbotronWrapper/JumbotronWrapper'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Categories from './components/Category/Categories';
import Demo from './components/Demo/Demo';
import Footer from './components/Footer/Footer';
import Notification from './components/Shared/Notification';

import NotificationContext from './contexts/notificationContext';

import Register from './components/User/Register';
import SignIn from './components/User/SignIn';

const App = () => {
  const [notificationData, setNotificationData] = useState({show: false});

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
      <>
        <NotificationContext.Provider value={notificationValue}>
          <Header />
          {notificationData.show && <Notification type={notificationData.type} message={notificationData.message} />}
          <JumbotronWrapper />


          <Switch>
            <Layout>
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/demo" exact component={Demo} />

              <Route path="/user/register" exact component={Register} />
              <Route path="/user/signIn" exact component={SignIn} />

              <Route path="/categories" exact component={Categories} />
            </Layout>
          </Switch>


          <Footer />
        </NotificationContext.Provider>
      </>
    );
}

export default App;
