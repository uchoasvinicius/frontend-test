import React from 'react';
import '../src/styles/variables.scss';
import '../src/styles/index.scss';
import Routes from './routes'
import Navbar from '../src/components/navigation'
import Footer from "./components/footer";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes/>
      <Footer/>
    </div>
  );
}

export default App;
