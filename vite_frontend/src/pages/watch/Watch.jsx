import React from 'react'
import './watch.scss';
import { ArrowBackOutlined } from '@mui/icons-material';
import { useLocation } from 'react-router-dom'

const Watch = () => {
  const location=useLocation();
  const movie=location.movie;
  console.log(movie.video);
  return (
    <div className="watch">
        <div className="back">
            <ArrowBackOutlined className='arrowIcon' />
            Home
        </div>
        <video src={movie.video} className="video" autoPlay progress controls></video>
    </div>
  )
}

export default Watch