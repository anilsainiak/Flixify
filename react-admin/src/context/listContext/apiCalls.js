import axios from 'axios';
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess, updateListFailure, updateListStart, updateListSuccess } from './ListActions';

//  GET LIST
export const getLists = async (dispatch)=>{
    dispatch(getListsStart());
    try{
        const res=await axios.get('lists/getAll',{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(getListsSuccess(res.data));
    }catch(err){
        dispatch(getListsFailure());
    }
}

// DELETE LIST
export const deleteList = async (id,dispatch)=>{
    dispatch(deleteListStart());
    try{
        await axios.delete('lists/'+id,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteListSuccess(id));
    }catch(err){
        dispatch(deleteListFailure());
    }
}

// CREATE LIST
export const createList= async (list,dispatch)=>{
    dispatch(createListStart());
    try{
        const res=await axios.post('lists',list,{
            headers:{
                token:"Bearer "+ JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(createListSuccess(res.data));
        return 'success'
    }catch(err){
        dispatch(createListFailure());
        return 'failure'
    }
}

//UPDATE LIST
export const updateList= async (list,dispatch)=>{
    dispatch(updateListStart());
    try{
        const res=await axios.put('/lists/'+list._id,list,{
            headers:{
                token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(updateListSuccess(res.data));
        return 'success';
    }catch(err){
        dispatch(updateListFailure());
        return 'failure';
    }
}