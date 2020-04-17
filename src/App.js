import React from 'react';
import '../src/styles/variables.scss';
import '../src/styles/index.scss';
import Routes from './routes'
import Navbar from '../src/components/navigation'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes/>
    </div>
  );
}

export default App;
