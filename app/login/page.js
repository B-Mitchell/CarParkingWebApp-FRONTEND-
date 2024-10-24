'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import greenCar from '../../public/images/greenCar.jpeg';
import { useUserContext } from '../../context/UseContext';

const Login = () => {
    const router = useRouter();
    const { setUserId, setFetchedUsername, updateUserDetails} = useUserContext();
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const data = {
        username: username,
        password: password
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
              // Handle error scenarios
              alert('login failed!')
              setUsername('');
              setPassword('');
              return;
            } else {
              alert('Login successful!');
            }
            const responseData = await response.json();
            // Extract userId from the response
            const { _id, username } = responseData.user;
            console.log(responseData);
            //save user Id and username in useContext
            setUserId(_id);
            setFetchedUsername(username);
            updateUserDetails(_id, username);
            // Redirect to the user's profile using Next.js router
            router.push(`/profile/${_id}`);
          } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div className='mt-[3rem] md:flex block'>
        <div className='md:w-[40%]'>
            <Image className='m-auto md:mt-[6rem]' src={greenCar} alt='a green car' />
        </div>

        <div className='md:w-[60%]'>
        <p className='text-center font-bold text-[1.5rem] '>Login to Your Account</p>
        <form onSubmit={handleSubmit} className='w-[80%] m-auto p-5'>
            <p className='text-[1.2rem] mb-2'>Username:</p>
            <input placeholder='username eg: johndoe' type='string' required value={username} onChange={(e) => {setUsername(e.target.value)}} className='border border-green-400 focus:scale-110 transition outline-none w-[100%] rounded-xl p-4'/>

            <p className='text-[1.2rem] mb-2 mt-5'>Password:</p>
            <input placeholder='password' type='password' required value={password} onChange={(e) => {setPassword(e.target.value)}} className='border border-green-400 focus:scale-110 transition outline-none w-[100%] rounded-xl p-4 mb-4'/>

            <button type='submit' onClick={handleSubmit} className='block m-auto bg-green-400 p-3 rounded-[1rem] text-white w-[13rem] hover:scale-110 transition mb-4'>submit</button>
        </form>
        <p className='text-center mb-3'>don't have an account ? <span className='hover:cursor-pointer text-green-400' onClick={() => {router.push('/register')}}>Create an account</span></p>
        </div>
    </div>
  )
}

export default Login