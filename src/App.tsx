import React from 'react';
import logo from './logo.svg';
import Navigation from './components/Navigation';
import PageContainer from './components/PageContainer';
import {BrowserRouter} from 'react-router-dom';
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <div id='app-container'>
        <Navigation />
        <PageContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
