import { Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Footer from './components/Footer/Footer'


function App() {
  return (
    <>
      <Header />

      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </Layout>
      
      <Footer />
    </>
  );
}

export default App;
