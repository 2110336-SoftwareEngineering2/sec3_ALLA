import logo from './logo.svg';
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
//import "netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.no-icons.min.css";
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Routes from './routes';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
