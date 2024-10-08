import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import Navbar from './Navbar/Navbar';
import axios from 'axios';
import url from '../../utils/api';
import { useNavigate } from 'react-router-dom';
function EmailVerify() {
  const [otp, setOtp] = useState("");
  const [attempts ,setAttempt] = useState(3)
  const nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if(otp.length>3){
       verifyOtp()
    }else{
        alert('invalid')
    }
   
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${url.url}/verifyOtp`, {
        code: otp
      });
  
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('token',response.data.token)
          nav('/dashboard')
      } 


      console.log(response)
    } catch (error) {
      console.log(error)
      if(error.status === 400){
        // setAttempt(error.response.data)
        setAttempt(error.response.data.attempts)
        alert('Incorrect Otp');

      }
      
      if(error.status === 500){
        setAttempt(0)
        
        alert('No Attempts Left');
        nav('/')
      }
   
    }
  };
  
  return (
    <div className="leftContainer w-1/2 flex flex-col items-center">
      <Navbar />
      <form onSubmit={handleSubmit} className="h-[50%] flex flex-col justify-evenly items-center">
        {/* Form Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify Email Address</h1>
          <p className="text-gray-400 my-2 font-bold">Enter OTP sent to your email address.</p>
        </div>
        {/* OTP Input */}
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          inputStyle={{
            width: '3rem', // Set a fixed width for better visibility
            height: '3rem', // Set a fixed height for better visibility
            margin: '0 0.5rem', // Add some margin for spacing
            fontSize: '1.5rem', // Increase font size for better visibility
            borderRadius: '0.5rem', // Slightly round the corners
            border: '1px solid #ccc', // Add a light border for definition
            textAlign: 'center', // Center the text in each input
            outline: 'red',
        
          }}
          inputType='tel'
          renderSeparator={<span className='w-2'></span>} // Adjust width as needed
          renderInput={(props) => <input {...props} />}
        />
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-200">
          Verify
        </button> 
        <p>{attempts} Attempts Left</p>
      </form>
    </div>
  );
}

export default EmailVerify;
