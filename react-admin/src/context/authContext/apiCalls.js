import axios from 'axios';
import { loginFailure, loginStart, loginSuccess,logout } from './AuthActions';

export const login=async (user,dispatch)=>{
    dispatch(loginStart());
    try{
        const res=await axios.post(process.env.REACT_APP_LINK+'auth/login',user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));
    }catch(err){
        dispatch(loginFailure());
    }
}

export const logoutStart=async (dispatch)=>{
    dispatch(logout());
}