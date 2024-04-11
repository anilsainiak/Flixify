import React from 'react';
import "./app.scss";
import Home from './pages/home/Home.jsx';
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";

const App = () => {
  const user=true;
  return (
    <Router>
      <Routes>
        <Route path='/' element={user ?<Home/> : <Navigate to="/register"/>}/>
        <Route path='/register' element={!user ?<Register/> : <Navigate to="/"/>}/>
        <Route path='/login' element={!user ?<Login/> : <Navigate to="/"/>}/>
        <Route path='/movies' element={user ? <Home type="movies" />: <Navigate to="/register"/> }/>
        <Route path='/series' element={user?<Home type="series"/> : <Navigate to="/register"/>}/>
        <Route path='/watch' element={user?<Watch/>:<Navigate to="/register"/> }/>
      </Routes>

    </Router>
    
    
  )
};

export default App;
