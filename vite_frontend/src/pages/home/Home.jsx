import React, { useEffect, useState } from 'react'
import "./home.scss";
import Navbar from '../../components/navbar/Navbar.jsx';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import axios from "axios";
const Home = ({type}) => {
  const [lists,setLists]= useState([]);
  const [genre,setGenre]= useState(null);
  
  useEffect(()=>{
    const getRandomLists=async ()=>{
      try{
        const res=await axios.get(`api/lists${type && genre ? "?type="+type+"&genre="+genre : type ? "?type="+type : genre?"?genre="+genre : ""}`,
        {
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTFkNzk2Zjc0NzY2MWU0YmY0OWE4NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNjA3NDMxNSwiZXhwIjoxNzA2MjQ3MTE1fQ.LJPP1uYe3Up8pGeaaxej_irUmRFj_4LeLU_7-s6gmmk"
          }
        });
        console.log(res);
          // setLists(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getRandomLists();
  },[type,genre]);
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type}/>
      <List/> 
      <List/>
      <List/>
    </div>
  )
}

export default Home