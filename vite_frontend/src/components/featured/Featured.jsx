import React from 'react'
import './featured.scss';
import { InfoOutlined, PlayArrow } from '@mui/icons-material';

const Featured = ({type}) => {
  return (
    <div className='featured'>
      {type && (
        <div className="category">
          
          <span>{type === "movies" ? 'Movies' : 'Series'}</span>
          <select name="genre" id="genre">
            <option value="Genre">Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Drama">Drama</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
          </select>
        </div>
      )}
      
        <img
            width="100%"
            src="https://4kwallpapers.com/images/walls/thumbs_3t/6967.jpg"
            alt=""
          />
        <div className="info">
        <img
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt=""
        />
        <span className='desc'>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
        </span>
        <div className="buttons">
          <button className='play'>
            <PlayArrow/>
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlined/>
            <span>Info</span>
          </button>
        </div>
        </div>
    </div>
  );
}

export default Featured