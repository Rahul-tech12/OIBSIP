import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        try {
            e.preventDefault();
            const res=await axios.post('http://localhost:8080/api/v1/auth/login',{email,password});
            console.log(res && res.data.user.role);
            setMsg(res && res.data.message);
            if(res && res.data.user.role=='admin'){
                navigate('/admin-dashboard');
            }else{
                navigate('/user-dashboard');
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
                <input type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <p>{msg}</p>
            <a href='/login/forgot-pw'>Forgot password?</a>
            <button type='submit'>Login</button>
        </form>
        <a href='/register'>Not registered yet? Register</a>
    </div>
  )
}

export default Login