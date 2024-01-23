'use client'
import React, { useState, useEffect } from 'react'
import VehicleComp from '@/app/components/VehicleComp';
import { useRouter } from 'next/navigation'
import { useUserContext } from '../../../context/UseContext';
import UserFeedback from '@/app/components/UserFeedback';

const UserProfile = ({ params }) => {
  let route = params.username;
  const router = useRouter();
  const { fetchedUsername, modal, setModal } = useUserContext();
  // State to hold the fetched data
  const [externalData, setExternalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profile/${route}/vehicles`);
        const newData = await response.json();
        setExternalData(newData.vehicles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-[95%] m-auto'>
      <div className='flex w-[90%] m-auto justify-between'>

        <div >
          <p className='text-[2rem]'>Hello, </p>
          <p className='ml-[2rem]'>{fetchedUsername}</p>
        </div>

        <button className='bg-green-400 text-white p-3 rounded-2xl hover:scale-110 transition' onClick={() => {router.push(`/profile/chat`)}}>Chat</button>

      </div>
        
      <br />

      <div className='w-[90%] m-auto md:flex block justify-between p-2 mb-3'>
        <p className='p-3 font-bold text-[1.4rem] md:text-left text-center'>Registered Vehicles</p>
        <div className='md:text-right text-center'>
          <button className='bg-green-400 text-white p-3 rounded-2xl hover:scale-110 transition' onClick={() => {router.push(`/registerVehicle/${route}`)}}>Register Vehicle</button>
          <button className='ml-5 bg-green-400 text-white p-3 rounded-2xl hover:scale-110 transition' onClick={() => {router.push(`/map`)}}>Find Car Park</button>
        </div>
        
      </div>

      <div>
        {!externalData.length ? (
        <div className='text-center mt-7'>No vehicles yet, register a new vehicle</div>
      ) : (
        externalData.map(data => (
          <VehicleComp data={data} key={data._id} />
        ))
      )}
      </div>
      <button className='bg-green-400 text-white p-3 rounded-2xl hover:scale-110 transition fixed bottom-3 right-3' onClick={() => {setModal(!modal)}}>user feedback</button>
      {
        modal ? 
        <UserFeedback /> :
        null
      }
      
    </div>
  );
};

export default UserProfile;
