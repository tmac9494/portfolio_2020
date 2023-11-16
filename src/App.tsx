import React from "react";
import Navigation from "./components/Navigation";
import PageContainer from "./components/PageContainer";
import { BrowserRouter } from "react-router-dom";
import "./styles/App.scss";
import { Toast } from "./components/General/Toast";

function App() {
  return (
    <BrowserRouter>
      <Toast
        title="Under Construction"
        message="Portfolio is still a work in progress, thanks for understanding!"
        persist
      />
      <div id="app-container">
        <Navigation />
        <PageContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
