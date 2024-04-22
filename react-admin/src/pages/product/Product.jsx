import React, { useContext, useState } from 'react'
import './product.css'
import { Link,useLocation } from 'react-router-dom'
import Chart from '../../components/chart/Chart'
import { ProductData } from '../../dummyData'
import { Publish } from '@mui/icons-material'
import { MovieContext } from '../../context/movieContext/MovieContext'
import { updateMovie } from '../../context/movieContext/apiCalls'
import { AuthContext } from '../../context/authContext/AuthContext'
import { logoutStart } from '../../context/authContext/apiCalls'

export default function Product() {
    const location=useLocation();
    const movie=location.state.movie;
    const [updatedMovie,setUpdatedMovie]=useState(movie);
    const [img,setImg]=useState(movie.img);
    const [trailer,setTrailer]=useState(movie.trailer);
    const [video,setVideo]=useState(movie.video);
    const {dispatch}=useContext(MovieContext);
    const {dispatch:authDispatch} = useContext(AuthContext);
    const [isSuccess,setIsSuccess] = useState(null);

    const handleChange=(e)=>{
        const value = e.target.value;
        setUpdatedMovie({...updatedMovie,[e.target.name]:value});
    }

    const upload=(item)=>{
            const fileName=new Date().getTime() +'_'+ item.label +'_' + item.file.name;
            const storageRef = ref(storage,`/items/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.file);
            // const uploadTask=storage.ref(`/items/${item.file.name}`).put(item);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                },
                (err)=>{console.log(err)},
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setMovie(prev=>{return {...prev,[item.label]:downloadURL}});
                            setUploaded((prev)=>prev+1);
                    // uploadTask.snapshot.ref.getDownloadUrl().then(url=>{
                    //     setMovie(prev=>{return {...prev,[item.label]:url}});
                    //     setUploaded((prev)=>prev+1);
                    });
                }
            )
    }

    const handleUpload = ()=>{
        console.log(video,movie.video);
        if(img!=movie.img){
            upload({file:img,label:'img'});
        }
        if(trailer!=movie.trailer){
            upload({file:trailer,label:'trailer'});
        }
        if(video!=movie.video){
            upload({file:video,label:'video'});
        }
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        handleUpload();
        console.log(updatedMovie);
        const result = updateMovie(updatedMovie,dispatch);
        if(result==='success'){
            setIsSuccess(true);
        }else if(result==='failure'){
            setIsSuccess(false);
        }else if(result===403){
            logoutStart(authDispatch);
        }
    }
  return (
      <div className="product">
        {isSuccess===true && <Alert severity="success" className='alert'>Movie Updated</Alert> }
        {isSuccess===false && <Alert severity="error" className='alert'>Failed to update movie</Alert> }
        <div className="productTitleContainer">
            <h1 className="productTitle">Movie</h1>
            <Link to='/newProduct'>
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
            {/* <div className="productTopLeft">
                <Chart data={ProductData} title="Sales Performance" dataKey="Sales"></Chart>
            </div> */}
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={movie.img} alt="" className="productInfoImg" />
                    <span className="productName">{movie.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">id:</span>
                        <span className="productInfoValue">{movie._id}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Genre:</span>
                        <span className="productInfoValue">{movie.genre}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Year:</span>
                        <span className="productInfoValue">{movie.year}</span>
                    </div>
                    <div className="productInfoItem">
                        <span className="productInfoKey">Limit:</span>
                        <span className="productInfoValue">{movie.limit}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottom">
            <form className="productForm">
                <div className="productFormLeft">
                    <label >Movie Name</label>
                    <input type="text" placeholder={movie.title} name='title' onChange={handleChange} />
                    <label >Movie Description</label>
                    <input type="text" placeholder={movie.desc} name='desc' onChange={handleChange} />
                    <label >Movie Duration</label>
                    <input type="text" placeholder={movie.duration} name='duration' onChange={handleChange}/>
                    <label >Genre</label>
                    <select name="genre" id="genre" onChange={handleChange}>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="superhero">Superhero</option>
                    </select>
                    <label >Year:</label>
                    <input type="text" placeholder={movie.year} name='year' onChange={handleChange} />

                    <label >Limit:</label>
                    <input type="text" placeholder={movie.limit} name='limit' onChange={handleChange} />

                    <label >Trailer:</label>
                    <input type="file" placeholder={movie.trailer} name='trailer' onChange={e=>setTrailer(e.target.files[0])} />
                    <label >Video:</label>
                    <input type="file" placeholder={movie.video} name='video' onChange={e=>setVideo(e.target.files[0])} />
                </div>
                <div className="productFormRight">
                    <div className="productUpload">
                        <img src={movie.img} alt="" className="productUploadImg" />
                        <label for="file">
                            <Publish/>
                        </label>
                        <input type="file" id="img" style={{display:"none"}} name='img' onChange={e=>setImg(e.target.files[0])}/>
                    </div>
                    <button className="productButton" onClick={handleSubmit}>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}
