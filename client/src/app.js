import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Join from "./components/join/join";
import Chat from "./components/chat/chat";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route path="/chat" component={Chat} />

          <Route path="/" component={Join} />
        </Switch>
      </div>
    );
  }
}

export default App;
