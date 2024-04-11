import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import './app.css';
import Home from './pages/home/Home';
import {BrowserRouter as Router,Routes,Route,useLocation, Navigate} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import ListList from './pages/listList/ListList';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
import List from './pages/list/List';
import NewList from './pages/newList/NewList';
import EditProfile from './pages/editProfile/EditProfile';

function App() {
  const location = useLocation();
  const shouldShowTopbarAndSidebar = () => {
    return location.pathname !== '/login';
  };
  const {user}=useContext(AuthContext);
  return (

      <div className="App">
        {shouldShowTopbarAndSidebar() && <Topbar />}
        {/* <Topbar /> */}
        <div className='container'>
        {shouldShowTopbarAndSidebar() && <Sidebar />}
        {/* <Sidebar /> */}
            <Routes>
              <Route path='/' element={user? <Home/> : <Navigate to='/login'/>} />
              <Route path='/users' element={user? <UserList/> : <Navigate to='/login'/>} />
              <Route path='/user/:userId' element={user? <User/> : <Navigate to='/login'/>}/>
              <Route path='/newUser' element={user? <NewUser/> : <Navigate to='/login'/>} />
              <Route path='/movies' element={user? <ProductList/> : <Navigate to='/login'/>} />
              <Route path='/lists' element={user? <ListList/> : <Navigate to='/login'/>} />
              <Route path='/list/:listId' element={user? <List/>: <Navigate to='/login'/>} />
              <Route path='/newList' element={user? <NewList/> : <Navigate to='/login'/>} />
              <Route path='/product/:productId' element={user? <Product/>: <Navigate to='/login'/>} />
              <Route path='/newProduct' element={user? <NewProduct/> : <Navigate to='/login'/>} />
              <Route path='/login' element={user? <Navigate to='/'/> : <Login/>}/>
              <Route path='/editProfile' element={user? <EditProfile/> : <Navigate to='/'/>}/>
              
              
            </Routes>
        </div>
      </div>
  );
}

export default App;
