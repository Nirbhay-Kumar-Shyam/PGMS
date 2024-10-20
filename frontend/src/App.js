import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import Home from './pages/home';
function App() {
  return (
    // <div className="App">
    //   <LoginSignup/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route exact path= '/' element={<LoginSignup/>}/>
        <Route exact path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
