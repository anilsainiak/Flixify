import React, { useEffect, useState } from 'react';
import './editProfile.scss';
import { useLayoutEffect } from 'react';
import { Link,useLocation } from 'react-router-dom'
import { ArrowBackOutlined } from '@mui/icons-material';
import Loader from '../loader/Loader';
const EditProfile = () => {
  const [user,setUser] = useState(null);

  useEffect(()=>{
    setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }, 2000);
  },[])
  return (
    <div className="editProfile">
      {user ? 
        <div className="container">
        <Link to="/">

          <div className="back">
              <ArrowBackOutlined className='arrowIcon' />
              Home
          </div>
          </Link>
            <h1>Edit Profile</h1>
            <div className="divider"></div>

            <div className="info">
              <div className="lhs">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350" alt="profile" />
              </div>
              <div className="rhs">
                <input type="text" name='text' placeholder={user.username} />

                <div className="language">
                  <label htmlFor="language" className='language'>Language</label>
                  <select name="language" id="language" >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish </option>
                    <option value="French">French </option>
                    <option value="Hindi">Hindi </option>
                  </select>
                </div>

                <input type="text" name='text' placeholder={user.email} disabled />

              </div>
            </div>
            <div className="divider"></div>
            <div className="buttons">
              <button variant='dark'>Save</button>
              <button variant='dark'>Cancel</button>
              <button variant='dark'>Delete Profile</button>
            </div>
        </div>
        : <Loader/>}
    </div>
  )
}

export default EditProfile;