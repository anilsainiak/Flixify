import React, { useState } from 'react'
import './userList.css';
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material';
import { Userrows } from '../../dummyData';
import { Link } from 'react-router-dom';

export default function UserList() {
    const [data,setData]=useState(Userrows);

    const handleDelete=(id)=>{
        setData(data.filter(item=>item.id!==id))
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'user', headerName: 'User', width: 150, renderCell:(params)=>{
            return (
                <div className='userListUser'>
                    <img src={params.row.avatar} alt="" className='userListImg' />
                    {params.row.username}
                </div>
            )
        } },
        // { field: 'avatar', headerName: 'Avatar', width: 130 },
        {field: 'email',headerName: 'Email',width: 200},
        {field: 'status',headerName: 'Status',width: 90,},
        {field:'transaction',headerName:'Transactions',width:160},
        {field:'action',headerName:'Action',width:150,renderCell:(params)=>{
            return(
                <div className='userListAction'>
                    <Link to={'/user/'+params.row.id}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                </div>
            )
        }}
      ];
      
      
  return (
    <div className="userList">
        <DataGrid
        disableRowSelectionOnClick
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
