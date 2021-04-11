import React from "react";
import "./App.css";
import English from "./components/english/input";
import EnglishUK from "./components/englishUK/inputUK";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <h1>Dinary - Dictionary English</h1>
      <ul>
        <Link to="/">
          <li>Dictionary English</li>
        </Link>
        <Link to="/BritainsEnglish">
          <li>Dictionary Britains English</li>
        </Link>
      </ul>
      <Switch>
      <Route path="/" exact component={English} />
      <Route path="/BritainsEnglish" component={EnglishUK} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;