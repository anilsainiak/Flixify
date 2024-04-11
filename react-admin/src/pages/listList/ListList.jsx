import React, { useContext, useEffect, useState } from 'react'
import './listList.css'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material';
import { productRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { ListContext } from '../../context/listContext/ListContext';
import { deleteList, getLists } from '../../context/listContext/apiCalls';

export default function ListList() {
    // const [data,setData]=useState(productRows)
    const {lists,dispatch}=useContext(ListContext);

    useEffect(()=>{
      getLists(dispatch);
    },[dispatch]);

    const handleDelete=(id)=>{
        // setData(data.filter(item=>item.id!==id))
        deleteList(id,dispatch);
    }
    // console.log(lists);
    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        // { field: 'avatar', headerName: 'Avatar', width: 130 },
        {field: 'title',headerName: 'Title',width: 250,},
        {field:'type',headerName:'Type',width:80},
        {field: 'genre',headerName: 'Genre',width: 140},
        {field:'action',headerName:'Action',width:150,renderCell:(params)=>{
            return(
                <div className='productListAction'>
                    <Link to={'/list/'+params.row._id} state={{list:params.row}}>
                        <button className="productListEdit">Edit</button>
                    </Link>
                <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row._id)}/>
                </div>
            )
        }}
      ];
  return (
    <div className="productList">
        <DataGrid
        disableRowSelectionOnClick
        rows={lists}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 8 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  )
}
