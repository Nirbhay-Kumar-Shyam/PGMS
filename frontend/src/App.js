import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import Home from './pages/home';
import Wings from './pages/wings';
import Rooms from './pages/rooms';
import PG_member from './pages/pg_member';
import WingOfPG from './pages/wings_for_pg';
import PgRoom from './pages/pg_room';
import RoomMember from './pages/room_member';
function App() {
  return (
    // <div className="App">
    //   <LoginSignup/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route exact path= '/' element={<LoginSignup/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/wings' element={<Wings/>}/>
        <Route exact path = '/wings_of_PG' element = {<WingOfPG/>}/>
        <Route exact path = '/pg_room' element = {<PgRoom/>}/>
        <Route exact path='/rooms' element={<Rooms/>}/>
        <Route exact path='/pg_member' element={<PG_member/>}/>
        <Route exact path= '/room_member' element={<RoomMember/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
