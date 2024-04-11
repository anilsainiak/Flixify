import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMoviesFailure, deleteMoviesStart, deleteMoviesSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions"
import axios from 'axios';

//  GET MOVIE
export const getMovies = async (dispatch)=>{
    dispatch(getMoviesStart());
    try{
        const res=await axios.get('/movie',{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(getMoviesSuccess(res.data));
        return res.data
    }catch(err){
        dispatch(getMoviesFailure());
    }
}

// DELETE MOVIE
export const deleteMovie = async (id,dispatch)=>{
    dispatch(deleteMoviesStart());
    try{
        await axios.delete('movie/'+id,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteMoviesSuccess(id));
    }catch(err){
        dispatch(deleteMoviesFailure());
    }
}

// CREATE MOVIE
export const createMovie= async (movie,dispatch)=>{
    dispatch(createMovieStart());
    try{
        const res=await axios.post('movie',movie,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(createMovieSuccess(res.data));
        return 'success';
    }catch(err){
        dispatch(createMovieFailure());
        return 'failure';
    }
}

//UPDATE MOVIE
export const updateMovie= async (movie,dispatch)=>{
    dispatch(updateMovieStart());
    try{
        const res=await axios.put('/movie/'+movie._id,movie,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(updateMovieSuccess(res.data));
    }catch(err){
        dispatch(updateMovieFailure());
    }
}