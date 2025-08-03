import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPw = () => {
    const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [msg, setMsg] = useState("");
        const navigate=useNavigate();
            const handleLogin=async(e)=>{
            try {
                e.preventDefault();
                const res=await axios.put('http://localhost:8080/api/v1/auth/forgot-pw',{email,password});
                console.log(res && res.data.message);
                setMsg(res && res.data.message);
                if(res && res.data.success){
                    toast.success(res.data & res.data.message);
                    navigate('/login');
                }else{
                    toast.error(res.data & res.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            }
        }
  return (
    <div className='login'>
        <form onSubmit={handleLogin}>
                <label name="email" >Email</label>
                <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email} />
                <label name="password" >Password</label>
                <input type='password' placeholder='Enter new password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <p>{msg}</p>
            <button type='submit'>Update Password</button>
        </form>
        <a href='/login'>Back to login</a>
    </div>
  )
}

export default ForgotPw