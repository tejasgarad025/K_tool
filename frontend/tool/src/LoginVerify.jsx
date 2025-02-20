import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function LoginVerify() {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();
    const [error, setError] = useState(null);
    const ip = '';

    const sendOtp = async (e) =>{
        e.preventDefault();
        try { 
            const response = await axios.post(`http://${ip}:8000/api/account/forgot-password/`, {email})
            console.log(response.data);
            console.log("otp sent")

            toast.success('OTP has been sent', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log('error sending otp')
            setError('user does not exist, please signup first')
        }
    };

    const verify= async(e) =>{
        e.preventDefault();
        const data = {
            email: email,
            otp: otp
        }
        try{
            if (email && otp){
                const response = await axios.post(`http://${ip}:8000/api/account/register/verifyotp/`, data)
                console.log(response.data);

                if(response.status === 200){
                    console.log("verified")
                    navigate('/Reset', {state: {email: email, otp: otp}});
                }  else {
                    console.log("not verified")
                }
            } else {
                setError('Please Enter both fields correctly')
            }
        } catch (error) {
            setError(error) 
            console.log('error verifying otp');   
        }
    }

  return (
    <>
    <h2>Verifying Email to change Password</h2>
      <input type="email" placeholder='enter email' value={email} onChange={(e)=> setEmail(e.target.value)} required/>
      <input type="text" placeholder='enter otp' value={otp} onChange={(e)=> setOtp(e.target.value)} required/>
      <button type='submit' onClick={sendOtp}>send otp</button>
      <button type='submit' onClick={sendOtp}>Resend otp</button>
      <button type='submit' onClick={verify}>Confirm</button>
      <Link to="/Changepass" className='reg-btn'>reset password</Link>
      <p>{error}</p>
      <ToastContainer/>
    </>
  )
}
export default LoginVerify