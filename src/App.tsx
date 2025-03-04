import React from "react";
import Navigation from "./components/Navigation";
import PageContainer from "./components/PageContainer";
import { HashRouter } from "react-router-dom";
import "./styles/App.scss";
import { Toast } from "./components/General/Toast";

function App() {
  return (
    <HashRouter>
      <Toast
        title="Under Construction"
        message="My Portfolio is still in the process of a re-design, some sections may appear abnormal."
        persist
      />
      <div id="app-container">
        <Navigation />
        <PageContainer />
      </div>
    </HashRouter>
  );
}

export default App;
