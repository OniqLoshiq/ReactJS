import { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import JumbotronWrapper from './components/JumbotronWrapper/JumbotronWrapper'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Footer from './components/Footer/Footer'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      shouldFormatHeader: false,
      pageYOffset: 0
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(){
    this.setState({ 
      pageYOffset: window.pageYOffset,
      shouldFormatHeader: this.state.pageYOffset < 344 ? false : true
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.shouldFormatHeader === prevState.shouldFormatHeader){
      return;
    }
  }

  render(){
    let shouldFormatHeader = this.state.shouldFormatHeader;

    return (
      <>
        <Header shouldFormatHeader={shouldFormatHeader} />
        <JumbotronWrapper />

        <Layout>
          <Switch>
            <Route path="/" exact render={(props) => ( <Home {...props} handleScroll={this.handleScroll}/>)} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Layout>
  
        <Footer />
      </>
    );
  }
}

export default App;
