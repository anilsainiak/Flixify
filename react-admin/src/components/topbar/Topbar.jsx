import React, { useEffect, useState } from 'react'
import "./topbar.css";
import {NotificationsNone,Language,Settings} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Loader from '../../pages/loader/Loader';

export default function Topbar() {
  const [user,setUser] = useState(null);

  useEffect(()=>{
    setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }, 100);
  },[])
  return (
    <div className="topbar">
      {user ? 
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">{user.username}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
              <NotificationsNone/>
              <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
              <Language/>
              <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
              <Settings/>
          </div>
          <Link to="/editProfile">
          <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="topAvatar" />
          </Link>
        </div>
      </div>
      : <Loader/>}
    </div>
  )
}
