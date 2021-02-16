import logo from './logo.svg';
import './App.css';
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
