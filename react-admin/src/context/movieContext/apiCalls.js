import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMoviesFailure, deleteMoviesStart, deleteMoviesSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions"
import axios from 'axios';

//  GET MOVIE
export const getMovies = async (dispatch)=>{
    dispatch(getMoviesStart());
    try{
        const res=await axios.get(process.env.REACT_APP_LINK+'movie',{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(getMoviesSuccess(res.data));
        return res.data
    }catch(err){
        if(err && err.response.status===403){
            return 403
        }else{
            dispatch(getMoviesFailure());
        }
    }
}

// DELETE MOVIE
export const deleteMovie = async (id,dispatch)=>{
    dispatch(deleteMoviesStart());
    try{
        await axios.delete(process.env.REACT_APP_LINK+'movie/'+id,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteMoviesSuccess(id));
    }catch(err){
        if(err && err.response.status===403){
            return 403
        }else{
        dispatch(deleteMoviesFailure());
        }
    }
}

// CREATE MOVIE
export const createMovie= async (movie,dispatch)=>{
    dispatch(createMovieStart());
    try{
        const res=await axios.post(process.env.REACT_APP_LINK+'movie',movie,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(createMovieSuccess(res.data));
        return 'success';
    }catch(err){
        if(err && err.response.status===403){
            return 403
        }else{
        dispatch(createMovieFailure());
        return 'failure';
        }
    }
}

//UPDATE MOVIE
export const updateMovie= async (movie,dispatch)=>{
    dispatch(updateMovieStart());
    try{
        const res=await axios.put(process.env.REACT_APP_LINK+'movie/'+movie._id,movie,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(updateMovieSuccess(res.data));
        return 'success';
    }catch(err){
        if(err && err.response.status===403){
            return 403
        }else{
            dispatch(updateMovieFailure());
            return 'failure'
        }
    }
}