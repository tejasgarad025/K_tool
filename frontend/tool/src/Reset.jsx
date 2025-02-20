import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate, useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function Reset() {
    const navigate = useNavigate()
    const location = useLocation()
    const {email, otp} = location.state || {}
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const ip =''
    
    const reset= async(e)=>{
        e.preventDefault()
        const data = {
            email: email,
            otp: otp,
            password: password,
        }
        try{
        if((password && password2).length >= 8 ){
           
            if(password === password2){
                setError('')
                const response = await axios.post(`http://${ip}:8000/api/changePassword`, data);
                console.log('password changed, login')

                toast.success('password changed, login', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                navigate('/Login')
            } else {
                setError('Passwords do not match')
            }
        } else {
            setError('Password must be at least 8 characters long')
        }
        
    } catch(error) {
        console.log('error changing password')
        toast.error('error changing password', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    }
    }

  return (
    <>
    <h2>Reset Password</h2>
    <div>
      <input type="text" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='enter password'/>
      <input type="text" value={password2} onChange={(e)=> setPassword2(e.target.value)} placeholder='Re-enter password'/>
      <button type='submit' onClick={reset}>Reset Password</button>
      <p>{error}</p>
      <ToastContainer/>
    </div>
    </>
  )
}
export default Reset