import React from 'react';
import logo from './logo.svg';
import Navigation from './components/Navigation';
import PageContainer from './components/PageContainer';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  return (
    <div id='app-container'>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <PageContainer currentPage={currentPage} />
    </div>
  );
}

export default App;
