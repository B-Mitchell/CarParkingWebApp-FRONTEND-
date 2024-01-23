'use client'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import greenCar from '../../../public/images/greenCar.jpeg';
import Image from 'next/image';
import { useUserContext } from '../../../context/UseContext';

const RegisterVehicle = ({ params }) => {
  let route = params.username;
  const router = useRouter();
  const { userId, fetchedUsername } = useUserContext();
  const [plateNumber, setPlateNumber] = useState('');
  const [model, setModel] = useState('');
  const [make, setMake] = useState('');
  const data = {
    plateNumber: plateNumber,
    model: model,
    make: make,
    userId: route,
  }
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/profile/6587161c5e8c1edb3f93e07d/register-vehicle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    
        if (!response.ok) {
            // Handle error scenarios
            console.error('Registration failed');
            alert('registration failed, try another car details');
            setPlateNumber('');
            setMake('');
            setModel('');
            return;
        } else {
            alert('Car Registration Successful!');
            setPlateNumber('');
            setMake('');
            setModel('');
            router.push(`/profile/${route}`);
        }
    
        const responseData = await response.json();
        // Extract userId from the response
        const { _id, username } = responseData.user;
        console.log(responseData);
        console.log(username);
    
        // Redirect to the user's profile using Next.js router
        router.push(`/profile/${_id}`);
    } catch (error) {
        console.error('Error:', error);
    }
  }

  return (
    <div className='w-[95%] m-auto'>
        <p className='text-[2rem]'>Hello, </p>
        <p className='ml-[2rem]'>{fetchedUsername}</p>
      <br />
        <p className='text-center font-bold text-[1.5rem] '>Register your Car</p>
      <div className='md:w-[100%] md:flex justify-between block'>

      <div className='md:w-[40%]'>
            <Image className='m-auto md:mt-[6rem]' src={greenCar} alt='a green car' />
        </div>
        <form onSubmit={handleSubmit} className='w-[80%] m-auto p-5'>
            <p className='text-[1.2rem] mb-2'>Plate Number:</p>
            <input placeholder='plate number' value={plateNumber} onChange={(e) => {setPlateNumber(e.target.value)}} required className='border border-green-400 focus:scale-110 transition outline-none w-[100%] rounded-xl p-4'/>

            <p className='text-[1.2rem] mb-2'>Car Make:</p>
            <input placeholder='car make' value={make} onChange={(e) => {setMake(e.target.value)}} required className='border border-green-400 focus:scale-110 transition outline-none w-[100%] rounded-xl p-4'/>

            <p className='text-[1.2rem] mb-2 mt-5'>Car Model:</p>
            <input placeholder='car model' value={model} onChange={(e) => {setModel(e.target.value)}} required className='border border-green-400 focus:scale-110 transition outline-none w-[100%] rounded-xl p-4 mb-4'/>

            <button type='submit' className='block m-auto bg-green-400 p-3 rounded-[1rem] text-white w-[13rem] hover:scale-110 transition mb-4'>submit</button>
            <p className='text-center mb-3'>Already have a registered car ? <span className='hover:cursor-pointer text-green-400' onClick={() => {router.push(`/profile/${userId}`)}}>back to profile</span></p>
        </form>
        </div>

    </div>
  );
};

export default RegisterVehicle;
