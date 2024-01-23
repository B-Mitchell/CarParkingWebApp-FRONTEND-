import React, { useState } from 'react'
import { useUserContext } from '../../context/UseContext';

const UserFeedback = () => {
    const { modal, setModal, userId } = useUserContext();
    const [description, setDescription] = useState('');
    const data = {
        description: description,
    }
    const handleSubmit = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch(`http://localhost:3000/profile/${userId}/user-feedback`, options)
            if (!response.ok) {
                alert('submission failed')
            } else {
                console.log(response.json());
                alert('submission successful');
                setModal(!modal);
            }
        } catch(error) {
            console.log('error:' + error)
        }
    }
  return (
    <div className='bg-green-100 fixed inset-0 items-center z-50 bg-opacity-70'>
        <div className='border border-green-400 bg-white rounded-[2rem] md:w-[50%] w-[80%] m-auto md:mt-[15%] mt-[24%] p-4'>
            <button className='bg-green-400 p-3 rounded-[1rem] text-white block text-right hover:scale-110 transition ml-auto' onClick={() => {setModal(!modal)}}>Close</button>
        <form onSubmit={handleSubmit} className='w-[100%] m-auto p-5'>
            <p className='text-center font-bold text-[1.2rem] mb-4'>User Feedback</p>
            <p className='text-[1.1rem] mb-2 mt-2'>Tell us what you think:</p>
            <input placeholder='description: eg I love this web app.' type='string' required value={description} onChange={(e) => {setDescription(e.target.value)}} className='border border-green-400 focus:scale-110 transition outline-none w-[100%] rounded-xl p-4'/>

            <button type='submit' className='block m-auto bg-green-400 p-3 rounded-[1rem] text-white w-[13rem] hover:scale-110 transition mt-7'>submit</button>
        </form>
        </div>
       
    </div>
  )
}

export default UserFeedback