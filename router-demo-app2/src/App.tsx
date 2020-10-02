import React from "react";

import { Link, Route, Switch } from "react-router-dom";

import { Home } from "./components/Home";
import { About } from "./components/About";
import { Contact } from "./components/Contact";

function App() {
  return (
    <div>
      <h1>A Cool Company</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/3">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about/:id">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
