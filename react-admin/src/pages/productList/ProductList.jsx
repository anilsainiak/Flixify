import React, { useContext, useEffect, useState } from 'react'
import './productList.css'
import { DataGrid } from '@mui/x-data-grid'
import { DeleteOutline } from '@mui/icons-material';
import { productRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { deleteMovie, getMovies } from '../../context/movieContext/apiCalls';

export default function ProductList() {
    // const [data,setData]=useState(productRows)
    const {movies,dispatch}=useContext(MovieContext);

    useEffect(()=>{
      getMovies(dispatch);
    },[dispatch]);

    const handleDelete=(id)=>{
        // setData(data.filter(item=>item.id!==id))
        deleteMovie(id,dispatch);
    }
    // console.log(movies);
    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'movie', headerName: 'Movie', width: 150, renderCell:(params)=>{
            return (
                <div className='ProductListProduct'>
                    <img src={params.row.img} alt="" className='ProductListImg' />
                    {params.row.title}
                </div>
            )
        } },
        // { field: 'avatar', headerName: 'Avatar', width: 130 },
        {field: 'genre',headerName: 'Genre',width: 120},
        {field: 'year',headerName: 'Year',width: 120,},
        {field:'limit',headerName:'Age Limit',width:120},
        {field:'isSeries',headerName:'is Series',width:120},
        {field:'action',headerName:'Action',width:150,renderCell:(params)=>{
            return(
                <div className='productListAction'>
                    <Link to={'/product/'+params.row._id} state={{movie:params.row}}>
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
        rows={movies}
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
