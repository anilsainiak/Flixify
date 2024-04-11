import React from 'react'
import './user.css'
import { Link } from 'react-router-dom'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material'

export default function User() {
  return (
    <div className="user">
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to='/newUser'>
                <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="userShowImg" />
                    <div className="usershowTopTitle">
                        <span className="userShowUsername">Anil Saini</span>
                        <span className="userShowUserTitle">Software Engineer</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className='userShowIcon'/>
                        <span className="userShowInfoTitle">anilak10</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarToday className='userShowIcon'/>
                        <span className="userShowInfoTitle">10.12.2000</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className='userShowIcon'/>
                        <span className="userShowInfoTitle">7014252980</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className='userShowIcon'/>
                        <span className="userShowInfoTitle">anilsaini1012@gmail.com</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className='userShowIcon'/>
                        <span className="userShowInfoTitle">Ahmedabad, Gujarat</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label >Username</label>
                            <input type="text" placeholder='anilak10' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label >Full Name</label>
                            <input type="text" placeholder='Anil Saini' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label >Email</label>
                            <input type="text" placeholder='anilsaini1012@gmail.com' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label >Phone</label>
                            <input type="text" placeholder='7014252980' className='userUpdateInput' />
                        </div>
                        <div className="userUpdateItem">
                            <label >Address</label>
                            <input type="text" placeholder='Jaipur, Rajasthan' className='userUpdateInput' />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img src="https://miro.medium.com/v2/resize:fit:1200/1*9ldt4UL_uUGWTwnL8_XyLA.jpeg" alt="" className="usrUpdateImg" />
                            <label htmlFor="file"><Publish className='userUpdateIcon'/></label>
                            <input type="file" id="file" style={{display:"none"}}/>
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
