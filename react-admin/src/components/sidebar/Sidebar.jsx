import React from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/authContext/AuthContext';
import { useContext } from 'react';
import {LineStyle,List,Timeline,TrendingUp,PermIdentity,Storefront,MailOutline,ChatBubbleOutline,DynamicFeed,WorkOutline,Report,AttachMoney,BarChart, PlayCircleOutline, Add} from '@mui/icons-material';
import { logout, logoutStart } from '../../context/authContext/apiCalls';

export default function Sidebar() {
    const {isFetching,dispatch}=useContext(AuthContext);

    const handleLogout=(e)=>{
        e.preventDefault();
        logoutStart(dispatch);
    };
  return (
    <div className='sidebar'>
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <Link to="/" className='sidebarLink'>
                        <li className="sidebarListItem">
                            <LineStyle className='sidebarIcon'/>
                            Home 
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <Timeline className='sidebarIcon'/>
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <TrendingUp className='sidebarIcon'/>
                        Sales
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Quick Access</h3>
                <ul className="sidebarList">
                    <Link to='/users' className='sidebarLink'>
                        <li className="sidebarListItem">
                            <PermIdentity className='sidebarIcon'/>
                            Users
                        </li>
                    </Link>
                    <Link to='/movies' className='sidebarLink'>
                        <li className="sidebarListItem">
                            <PlayCircleOutline className='sidebarIcon'/>
                            Movies
                        </li>
                    </Link>
                    <Link to='/lists' className='sidebarLink'>
                        <li className="sidebarListItem">
                            <List className='sidebarIcon'/>
                            Lists
                        </li>
                    </Link>
                    <Link to='/newProduct' className='sidebarLink'>
                    <li className="sidebarListItem">
                        <Add className='sidebarIcon'/>
                        New Movie
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <MailOutline className='sidebarIcon'/>
                        Mail
                    </li>
                    <li className="sidebarListItem">
                        <DynamicFeed className='sidebarIcon'/>
                        Feedback
                    </li>
                    <li className="sidebarListItem">
                        <ChatBubbleOutline className='sidebarIcon'/>
                        Messages
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">   
                <h3 className="sidebarTitle">Staff</h3>
                <ul className="sidebarList">
                <Link to='/newList' className='sidebarLink'>
                    <li className="sidebarListItem">
                        <List className='sidebarIcon'/>
                        Create List
                    </li>
                    </Link>
                    
                    <li className="sidebarListItem">
                        <Timeline className='sidebarIcon'/>
                        Analytics
                    </li>
                    <li className="sidebarListItem">
                        <Report className='sidebarIcon'/>
                        Reports
                    </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Account</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem" onClick={handleLogout}>
                        <WorkOutline className='sidebarIcon'/>
                        Log Out
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
