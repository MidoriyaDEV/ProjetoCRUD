import React, { useState } from 'react';
import '../css/LoginSingnup.css'; 
import user_Icon from '../assets/user.png';
import email_Icon from '../assets/email.png';
import lock_Icon from '../assets/lock.png';

const LoginSingnup = () => {

  const [action,setaction] = useState("Sing Up")

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_Icon} alt="User Icon" className="icon" />
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <img src={email_Icon} alt="Email Icon" className="icon" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={lock_Icon} alt="Password Icon" className="icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>
      <div class="forgot-password">Lost password? <span>Click Here!</span></div>
      <div class="submit-container">
  <div className={action==="login"?"submit gray":"submit"} onClick={()=>setaction("Sing Up")}>Sing Up</div>
  <div className={action==="Sing Up"?"submit gray":"submit"} onClick={()=>setaction("login")}>login</div>
      </div>
    </div>
  );
}

export default LoginSingnup;
