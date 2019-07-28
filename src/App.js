import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, HashRouter } from "react-router-dom";
import SendFiles from "./components/layout/SendFiles";
import DownloadFiles from "./components/layout/DownloadFiles";
import MainDesc from "./components/layout/MainDesc";

function App() {
  return (
    <Router>
      <div className="container flex-container">
        <div className="inner-container">
          <Route path="/" component={MainDesc} />
          <Route exact path="/" component={SendFiles} />
          <Route path="/download/:confirmID" component={DownloadFiles} />
        </div>
      </div>
    </Router>
  );
}

export default App;
