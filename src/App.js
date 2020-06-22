import React from 'react';
import logo from './logo.svg';
import Navigation from './components/Navigation';
import PageContainer from './components/PageContainer';
import './styles/App.css';

function App() {
  return (
    <div id='app-container'>
      <Navigation />
      <PageContainer />
    </div>
  );
}

export default App;
