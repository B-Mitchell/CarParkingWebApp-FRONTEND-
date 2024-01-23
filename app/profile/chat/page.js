'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/UseContext';

const page = () => {
    const router = useRouter();
    const { userId, setReceiver, setChatName, updateChatName, updateReceiverId } = useUserContext();
    const [Users, setUsers] = useState([]);

    useEffect(() => {
        console.log('i ran first');
        const fetchUsers = async () => {
            try {
                const users = await fetch('http://localhost:3000/profile/users');
                const fetchedUsers = await users.json();
                setUsers(fetchedUsers);
            } catch(error) {
                return error;
            }
        }
    fetchUsers();
    },[]);
    // console.log(Users);
    
    const handleChats = (id) => {
        updateReceiverId(id);
        setReceiver(id)
        const userDetails = Users.filter((user) => user._id === id);
        const { username, _id } = userDetails[0];
        console.log(username);
        updateChatName(username);
        setChatName(username);
        // router.push(`/profile/chat/${username}`)
        router.push(`/profile/chat/${username}`);
    }

  return (
    <div>
        <div className='flex justify-between m-auto w-[90%]'>
        <p className='ml-[4rem] font-semibold text-[2rem] mb-2'>Chats</p>
        <button className='bg-green-400 w-[15%] text-white p-1 rounded-2xl hover:scale-110 transition' onClick={() => {router.push(`/profile/${userId}`)}}>Back</button>
      </div>
        

        {
            Users.map((users) => {
                return (
                    <div key={users._id} className='w-[90%] m-auto flex justify-between p-3 rounded-2xl border-green-400 border hover:bg-green-100 transition hover:cursor-pointer mt-3' onClick={() => { handleChats(users._id) }}>
                        <div>
                        <p className='text-[.6rem] font-bold'>ID:{users._id}{userId === users._id ? ' (yourself)' : null}</p>
                        <p className='text-[1.2rem] '>{users.username}</p>
                        </div>

                        <button className='bg-green-400 text-white px-3 rounded-2xl hover:scale-110 transition'>active</button>

                    </div>
                )
            })
        }
    </div>
  )
}

export default page