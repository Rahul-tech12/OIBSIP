import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [role, setRole] = useState("");
    const navigate=useNavigate();
    const handleForm=async(e)=>{
        try {
            e.preventDefault();
            const res=await axios.post('http://localhost:8080/api/v1/auth/register',{name,email,password,contact,role});
            console.log(res && res.data.message);
            setMsg(res && res.data.message);
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data & res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }
  return (
        <div className='register'>
            <form onSubmit={handleForm}>
                <label name="username" >Name</label>
                <input type='text' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name} />
                <label name="email" >Email</label>
                <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email} />
                <label name="password" >Password</label>
                <input type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <label name="contact" >Contact</label>
                <input type='tel' placeholder='Enter your contact' onChange={(e)=>setContact(e.target.value)} value={contact} />
                <label name="role" >Role</label>
                <select onChange={(e)=>setRole(e.target.value)} value={role}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <p>{msg}</p>
                <button type='submit'>Register</button>
            </form>
            <a href='/login'>Already registered? Click here to login!</a>
        </div>
  )
}

export default Register