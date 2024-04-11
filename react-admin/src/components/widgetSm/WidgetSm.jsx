import React, { useEffect, useState } from 'react';
import './widgetSm.css';
import { Visibility } from '@mui/icons-material';
import axios from 'axios';

export default function WidgetSm() {
    const [newUsers,setNewUsers]=useState([]);

    useEffect(()=>{
        const getNewUsers=async ()=>{
            try{
                const res=await axios.get('/users?new=true',{
                    headers:{
                        token:'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken
                    }
                });
                setNewUsers(res.data);
            }catch(err){
                console.log(err);
            }  
        };
        getNewUsers();
    },[]);
    console.log(newUsers);
  return (
    <div className='widgetSm'>
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
            {newUsers.map((user)=>(
                <li key={user._id} className="widgetSmListItem">
                    <img src={user.profilePic || "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"} alt="" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.username}</span>
                        <span className="widgetSmUserTitle">{user.email}</span>
                    </div>
                    <button className="widgetSmbutton">
                        <Visibility className="widgetSmIcon" />
                        Display
                    </button>
                </li>
            ))}
        </ul>
    </div>
  )
}
