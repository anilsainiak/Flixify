import React, { useContext, useState } from 'react'
import './newProduct.css'
import storage from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import Alert from '@mui/material/Alert';

export default function NewProduct() {
    const [movie,setMovie]=useState({'isSeries':'no'});
    const [img,setImg]=useState(null);
    const [imgTitle,setImgTitle]=useState(null);
    const [imgSm,setImgSm]=useState(null);
    const [trailer,setTrailer]=useState(null);
    const [video,setVideo]=useState(null);
    const [uploaded,setUploaded]=useState(0);
    const {dispatch}=useContext(MovieContext);
    const [isLoading,setIsLoading] = useState(false);
    const [isSuccess,setIsSuccess] = useState(null);

    const handleChange=(e)=>{
        const value=e.target.value;
        setMovie({...movie,[e.target.name]:value});
    }
    
    const upload = async (items) => {
        const promises = items.map(item => {
            return new Promise((resolve, reject) => {
                const fileName = new Date().getTime() + '_' + item.label + '_' + item.file.name;
                const storageRef = ref(storage, `/items/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, item.file);
    
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Progress tracking code...
                    },
                    (err) => {
                        reject(err); // Reject the promise if an error occurs
                    },
                    () => {
                        // Resolve the promise when upload is complete
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((downloadURL) => {
                                setMovie(prev => ({ ...prev, [item.label]: downloadURL }));
                                setUploaded(prev => prev + 1);
                                resolve(); // Resolve the promise after successful upload
                            })
                            .catch((error) => {
                                reject(error); // Reject the promise if there's an error in getting download URL
                            });
                    }
                );
            });
        });
    
        try {
            // Wait for all promises to resolve (i.e., all uploads to complete)
            await Promise.all(promises);
            console.log('All uploads complete');
        } catch (error) {
            console.error('Error occurred during upload:', error);
            throw error; // Throw the error to be caught by the caller
        }
    };
    

    const handleUpload=async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        console.log(isLoading);
        await upload([
            {file:img,label:"img"},
            {file:imgTitle,label:"imgTitle"},
            {file:imgSm,label:"imgSm"},
            {file:trailer,label:"trailer"},
            {file:video,label:"video"},
            
        ]);
        setIsLoading(false)
    };
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const temp =await createMovie(movie,dispatch);
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
    <div className="newproduct">
    {isSuccess===true && <Alert severity="success" className='alert'>Movie Added to Database</Alert> }
    {isSuccess===false && <Alert severity="error" className='alert'>Failed</Alert> }

    <div className={isLoading ? "loader show" : "loader hide"}>
        <div className="box">
            <div id="loader"></div>
        </div>
    </div>  
    {/* {loading && 
        <div className="loader show">
        <div className="box">
            <div id="loader"></div>
        </div>
    </div>  
    } */}
    <div className="addProduct">
       
    <h1 className="addProductTitle">New Movie</h1>
    <form className="addProductForm">
        <div className="content">
        <div className="addProductItem">
            <label>Image</label>
            <input type="file" id="img" name="img" onChange={e=>setImg(e.target.files[0])} />
        </div>
        <div className="addProductItem">
            <label>Title Image</label>
            <input type="file" id="imgTitle" name='imgTitle' onChange={e=>setImgTitle(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
            <label>Thumbnail Image</label>
            <input type="file" id="imgSm" name='imgSm' onChange={e=>setImgSm(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder='Movie name' name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Description</label>
            <input type="text" placeholder='Movie Description' name="desc" onChange={handleChange}  />
        </div>
        <div className="addProductItem">
            <label>Duration</label>
            <input type="text" placeholder='Movie Duration' name="duration" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label>Genre</label>
            <select name="genre" onChange={handleChange} id="genre">
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
            <label >Year:</label>
            <input type="text" name="year" placeholder="Year Released" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label >Limit:</label>
            <input type="text" name="limit" placeholder="Age Limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
            <label >Is Series</label>
            <select name="isSeries" onChange={handleChange} id="active" className="addProductSelect">
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </div>

        <div className="addProductItem">
            <label>Trailer</label>
            <input type="file" id="trailer" name='trailer' onChange={e=>setTrailer(e.target.files[0])} />
        </div>
        <div className="addProductItem">
            <label>Video</label>
            <input type="file" id="video" name='video' onChange={e=>setVideo(e.target.files[0])} />
        </div>
        </div>
        <div>
            {uploaded===5 ? (<button className="addProductbutton" onClick={handleSubmit}>Create</button>) : (<button className="addProductbutton" onClick={handleUpload}>Upload</button>) }
        </div>
        {/* <button className="addProductbutton">Create</button> */}
    </form>
</div>
</div>
  )
}
