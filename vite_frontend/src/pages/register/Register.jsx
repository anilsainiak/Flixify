import React, { useRef, useState } from 'react'
import './register.scss';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Register = () => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const emailRef=useRef();
    const passwordRef=useRef();

    const handleStart = ()=>{
        setEmail(emailRef.current.value);
    };

    const handleFinish=()=>{
        setPassword(passwordRef.current.value);
    };

    return (
        <div className='register'>
            <div className="top">
                <div className="wrapper">
                    <img 
                        className='logo'
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
                        alt="" 
                        />
                    <button className="loginButton">Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Enjoy big movies, hit series and more from ₹ 149.</h1>
                <h2>Join today. Cancel anytime.</h2>
                <p>
                Ready to watch? Enter your email to create or restart your membership.
                </p>
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder='Email address' className='emailInput' ref={emailRef} />
                        <button className="registerButton" onClick={handleStart} >
                            <span className='buttonInfo'>Get Started</span>
                            <ArrowForwardIos className='arrowIcon'/>
                        </button>
                    </div>

                ) :(
                    <form className="input">
                        <input type="password" placeholder='Password' className='emailInput' ref={passwordRef} />
                        <button className="registerButton" onClick={handleFinish} >
                            <span className='buttonInfo'>Start</span>
                        </button>
                    </form>
                ) }
            </div>
        </div>
    )
}

export default Register