import React, { useContext, useState } from 'react'
import './newList.css'
import storage from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ListContext } from '../../context/listContext/ListContext';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useEffect } from 'react';
import { getMovies } from '../../context/movieContext/apiCalls';
import {MultiSelect} from 'react-multi-select-component'
import { createList } from '../../context/listContext/apiCalls';
import Alert from '@mui/material/Alert';

export default function NewList() {
    const [list,setList]=useState(null);
    const {dispatch}=useContext(ListContext);
    const {movies,dispatch:dispatchMovie}=useContext(MovieContext);
    const [selected,setSelected] = useState([]);
    const [isSuccess,setIsSuccess] = useState(null);

    useEffect(()=>{
        getMovies(dispatchMovie);
    },[dispatchMovie])

    useEffect(()=>{
        setList({...list,content:selected.map(item=>item.value)})
    },[selected])

    const handleChange=(e)=>{
        const value=e.target.value;
        setList({...list,[e.target.name]:value});
    }
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const temp = await createList(list,dispatch);
        if(temp==='success'){
            setIsSuccess(true);
            setTimeout(()=>{
                window.location.reload();
            },3000)
        }else{
            setIsSuccess(false);
        }
    }

  return (
    <div className="addProduct">
        {isSuccess===true && <Alert severity="success" className='alert'>List Added to Database</Alert> }
    {isSuccess===false && <Alert severity="error" className='alert'>Failed</Alert> }
    <h1 className="addProductTitle">New List</h1>
    <form className="addProductForm">
        <div className="content">
        <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder='List title' name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Genre</label>
            <select name="genre" onChange={handleChange} id="genre">
            <option value="">Select Genre</option>
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
        </div>
        <div className="addProductItem">
            <label >Type</label>
            <select name="type" onChange={handleChange} id="active" className="addProductSelect">
                <option value="">Select Type</option>
                <option value="movies">Movie</option>
                <option value="series">Series</option>
            </select>
        </div>
        <div className="addProductItem">
            <label >Content</label>
            {/* <select multiple name="content" id="content" onChange={handleSelect}>
                {movies.map(movie=>(
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                ))}
            </select> */}
            <MultiSelect options={movies.map(movie=>({label:movie.title,value:movie._id}))} value={selected} onChange={setSelected}/>
        </div>
        </div>
        <div>
            <button className="addProductbutton" onClick={handleSubmit}>Create</button>
        </div>
        {/* <button className="addProductbutton">Create</button> */}
    </form>
</div>
  )
}
