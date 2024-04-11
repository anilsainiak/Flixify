import React from 'react';
import './home.css';
import FeaturedInfo from '../../components/featuredinfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import {Userdata} from '../../dummyData';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const MONTHS= useMemo(()=>["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],[]);
  const [userStats,setUserStats]=useState([]);

  useEffect(()=>{
    const getStats=async ()=>{
      try{
        const res=await axios.get("/users/stats",{
          headers:{
            token:JSON.parse(localStorage.getItem("user")).accessToken
          }
        });
        const statsList=res.data.sort(function (a,b){
          return a._id - b._id;
        })
        statsList.map(item=>setUserStats((prev)=>[...prev,{name:MONTHS[item._id - 1],"New User":item.total},]));
        // setUserStats(res.data);
      }catch(err){
        console.log(err);
      } 
    };
    getStats();
  },[MONTHS])
  return (
    <div className='home'>
        <FeaturedInfo/>
        <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
        <div className="homeWidgets">
            <WidgetSm/>
            <WidgetLg/>
        </div>
    </div>
  )
}
