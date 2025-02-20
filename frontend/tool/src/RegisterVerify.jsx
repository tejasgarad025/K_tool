import React, {useState} from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

 function RegisterVerify() {
    const navigate = useNavigate()
    const location = useLocation()
    const {email} = location.state || {}
    const [error, setError] = useState()
    const [otp, setOtp] = useState()
    const ip = ''

    const sendOtp= async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post(`http://${ip}:8000/api/account/register/resendotp/`, {email})
            console.log(res.data)
            console.log('otp re-sent')
            toast.success('OTP sent', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch(error) {
            console.log(error)
            setError(error.message)
        }

    }

    const verifyOtp = async(e)=>{
        e.preventDefault();
        const data = {
            email: email,
            otp: otp
        }
        try{
            const res = await axios.post(`http://${ip}:8000/api/account/register/resendotp/`, {data})
            console.log(res.data)

            if(otp){
                if(res.status === 200){
                    console.log('verified')
                    navigate('/login')
                }
            } else {
                setError('enter otp')
            }
        } catch {
            toast.error('invalid OTP', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
            console.log('error verifying otp')
        }

    }

  return (
    <>
    <h2>Verifying email</h2>
    <div>
      <label >Enter an OTP sent to your email address</label>
      <input type="text" placeholder='enter OTP...' value={otp} onChange={(e)=> setOtp(e.target.value)}/>
      <button type='submit' onClick={sendOtp}>Resend OTP</button>
      <button type='submit' onClick={verifyOtp}>confirm OTP</button>
      <p>{error}</p>
      <ToastContainer/>
    </div>
    </>
  )
}

export default RegisterVerify
