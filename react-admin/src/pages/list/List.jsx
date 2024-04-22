import React, { useContext, useState } from 'react'
import './list.css'
import { Link,useLocation } from 'react-router-dom'
import Chart from '../../components/chart/Chart'
import { ProductData } from '../../dummyData'
import { Publish } from '@mui/icons-material'
import { ListContext } from '../../context/listContext/ListContext'
import axios from 'axios';
import { useEffect } from 'react';
import {MultiSelect} from 'react-multi-select-component';
import { MovieContext } from '../../context/movieContext/MovieContext'
import { getMovies } from '../../context/movieContext/apiCalls'
import { updateList } from '../../context/listContext/apiCalls';
import Alert from '@mui/material/Alert';
import { logoutStart } from '../../context/authContext/apiCalls'
import { AuthContext } from '../../context/authContext/AuthContext'

export default function List() {
    const location=useLocation();
    const list=location.state.list;
    console.log(list);
    const {dispatch}=useContext(ListContext);
    const {movies,dispatch:dispatchMovie}=useContext(MovieContext);
    const {dispatch:authDispatch} = useContext(AuthContext);
    const [selected,setSelected] = useState([]);
    const [updatedList,setUpdatedList] = useState(list);
    const [isSuccess,setIsSuccess] = useState(null);

    const initialLoad=async()=>{
        const temp =await getMovies(dispatchMovie);
        const promises = temp.map(movie=>{
            return new Promise((resolve,reject)=>{
                try{
                    if(list.content.includes(movie._id)){
                        setSelected(prev=>[...prev,{label:movie.title,value:movie._id}])
                        resolve();
                    }
                }catch(err){
                    reject(err);   
                }
            })
        })
        await Promise.all(promises);
        console.log('done');
    }
    
    useEffect(()=>{
        initialLoad();
    },[dispatchMovie])

    useEffect(()=>{
        setUpdatedList({...updatedList,content:selected.map(item=>item.value)})
       },[selected])    

    const handleChange=(e)=>{
        const value = e.target.value;
        setUpdatedList({...updatedList,[e.target.name]:value});
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
        const result = await updateList(updatedList,dispatch);
        if(result==='success'){
            setIsSuccess(true);
            setTimeout(()=>{
                // window.location.reload();
                setIsSuccess(null);
            },3000)
        }else if(result==='failure'){
            setIsSuccess(false);
        }else if(result===403){
            logoutStart(authDispatch);
        }
    }
  return (
    <div className="product">
        {isSuccess===true && <Alert severity="success" className='alert'>List Updated</Alert> }
        {isSuccess===false && <Alert severity="error" className='alert'>Failed</Alert> }
        <div className="productTitleContainer">
            <h1 className="productTitle">List</h1>
            <Link to='/newList'>
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            {/* <div className="productTopLeft">
                <Chart data={ProductData} title="Sales Performance" dataKey="Sales"></Chart>
            </div> */}
            <div className="productTopRight">
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{list._id}</span>
                    </div>
                <div className="productInfoItem">
                        <span className="productInfoKey">Title:</span>
                        <span className="productInfoValue">{list.title}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Genre:</span>
                        <span className="productInfoValue">{list.genre}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Type:</span>
                        <span className="productInfoValue">{list.type}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label >List Title</label>
                    <input type="text" defaultValue={list.title} name='title' onChange={handleChange} />
                    <label >List Type</label>
                    <select name="type" onChange={handleChange} defaultValue={list.type} id="genre">
                        <option value="series">Series</option>
                        <option value="movies">Movies</option>
                    </select>
                    <label >Genre</label>
                    <select name="genre" id="genre" defaultValue={list.genre} onChange={handleChange}>
                        <option value="">Select Genre</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="animation">Animation</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="drama">Drama</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="horror">Horror</option>
                        <option value="mystery">Mystery</option>
                        <option value="romance">Romance</option>
                        <option value="superhero">Superhero</option>
                        <option value="sci-fi">Sci-fi</option>
                    </select>
                    <label>Movies</label>
                    <MultiSelect options={movies.map(movie=>({label:movie.title,value:movie._id}))} value={selected} onChange={setSelected}/>
                </div>
                <div className="productFormRight">
                    <button className="productButton" onClick={handleSubmit}>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}
