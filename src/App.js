import React from "react";
import "./App.css";
import English from "./components/english/input";
import EnglishUK from "./components/englishUK/inputUK";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Router>
        <h1 className="h12 mb-0">dinary</h1>
        <Nav className="justify-content-center" activeKey="/">
          <Nav.Item>
            <Nav.Link><Link to='/'>American English</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
              |
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><Link to='/BritishEnglish'>British English</Link></Nav.Link>
          </Nav.Item>
        </Nav>
        <Switch>
          <Route path="/" exact component={English} />
          <Route path="/BritishEnglish" component={EnglishUK} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;