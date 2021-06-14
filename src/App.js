import './assets/scss/default.scss';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Anagram from 'pages/Anagram';
import OMDBApp from 'pages/OMDBApp';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <h1>Choose app</h1>
          <Link to="/anagram">Anagram Test</Link>
          <br/>
          <Link to="/omdb-app">OMDB App</Link>
        </Route>
        <Route component={Anagram} path="/anagram"/>
        <Route component={OMDBApp} path="/omdb-app"/>
      </Router>
    </div>
  );
}

export default App;
