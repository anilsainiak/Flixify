import axios from 'axios';
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess, updateListFailure, updateListStart, updateListSuccess } from './ListActions';
import eventBus from '../../common/EventBus';

//  GET LIST
export const getLists = async (dispatch)=>{
    dispatch(getListsStart());
    try{
        const res=await axios.get(process.env.REACT_APP_LINK+'lists/getAll',{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(getListsSuccess(res.data));
        return 'success'
    }catch(err){
        if(err && err.response.status===403){
            return 403
        }else{
            dispatch(getListsFailure());
            return 'failure'
        }
    }
}

// DELETE LIST
export const deleteList = async (id,dispatch)=>{
    dispatch(deleteListStart());
    try{
        await axios.delete(process.env.REACT_APP_LINK+'lists/'+id,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteListSuccess(id));
        return 'success'
    }catch(err){
        if(err && err.response.status===403){
            return 403;
        }else{
            dispatch(deleteListFailure());
            return 'failure'
        }
    }
}

// CREATE LIST
export const createList= async (list,dispatch)=>{
    dispatch(createListStart());
    try{
        const res=await axios.post(process.env.REACT_APP_LINK+'lists',list,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(createListSuccess(res.data));
        return 'success'
    }catch(err){
        if(err && err.response.status===403){
            return 403
        }else{
        dispatch(createListFailure());
        return 'failure'
        }
    }
}

//UPDATE LIST
export const updateList= async (list,dispatch)=>{
    dispatch(updateListStart());
    try{
        const res=await axios.put(process.env.REACT_APP_LINK+'lists/'+list._id,list,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(updateListSuccess(res.data));
        return 'success';
    }catch(err){
        if(err && err.response.status===403){
            return 403
        }else{
        dispatch(updateListFailure());
        return 'failure';
        }
    }
}