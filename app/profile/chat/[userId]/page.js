'use client'
import React, { useRef, useEffect, useState } from 'react'
import { useUserContext } from '@/context/UseContext';
import { useRouter } from 'next/navigation';

const page = ({params}) => {
  const router = useRouter();

    const {fetchedUsername, receiver, chatName, userId, updateReceiverId } = useUserContext();
    const [messages, setFetchedMessages] = useState([]);
    //receiver is the user to receive the chats

    // fetch all chats
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profile/chat/${receiver}/${userId}`);
        const fetchedChats = await response.json();
        setFetchedMessages(fetchedChats);

      } catch (error) {
        console.log('Error: ' + error)
      }
    }
    fetchChats();
    useEffect(() => {
      fetchChats();
    },[]);
    //for re-run after the sendChats function is called

    console.log(messages);
    //send chats
    // create state for the chat to be sent
    const [ chat, setChat ] = useState('');
    const data = {
      sender: userId,
      receiver: receiver,
      message: chat,
    }

    const sendChats = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch( `http://localhost:3000/profile/chat/${receiver}` , {
          method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if(!response.ok) {
          alert('message not sent, check your network connection')
        } else {
          fetchChats();
          setChat('');
        }
      } catch(error) {
        console.error('Error :' + error);
      }
    }
    const containerRef = useRef();

  useEffect(() => {
    // Scroll to the bottom on initial load
    scrollToBottom();
  }, []);
  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
    
  };
  return (
    <div>
      <div className='flex justify-between w-[90%] m-auto mt-3 mb-3'>
      <p className='font-semibold text-[2rem]'><span className='font-light text-[1rem]'>you are chatting with</span> {chatName} </p>
      <button className='bg-green-400 w-[15%] text-white p-1 rounded-2xl hover:scale-110 transition' onClick={() => {router.push('/profile/chat')}}>Back</button>
      </div>

      <div className='w-[90%] m-auto h-[20rem] overflow-y-scroll overflow-x-hidden scrollbar-hide bg-green-100 rounded-2xl p-3 flex-col-reverse' ref={containerRef} >
        {/* // chat messages */}
        {
          messages.length === 0 ? <p className='text-center mt-14'>start a chat with {chatName}</p> :
          messages.map((data) => {
            return (
              <div key={data._id} className={`${userId !== data.sender ? 'mr-auto': 'ml-auto'} rounded-2xl mb-1 w-1/2 p-2 bg-black`}>
                <p className={`text-[1rem] text-white text-wrap`}>{data.message}</p>
                <p className={`text-[.7rem] text-right text-white text-wrap`}>{data.timestamp}</p>
              </div>
            )
          })
        }

      </div>


      <form onSubmit={sendChats} className='w-[80%] m-auto p-3 flex justify-between rounded-2xl fixed bottom-0 ml-11'>
        <input placeholder={`send text to ${chatName}`} required className='w-[70%] border border-green-400 p-2 outline-none rounded-2xl focus:scale-105 transition' value={chat} onChange={(e) => {setChat(e.target.value)}}/>
        <button className='bg-green-400 w-[20%] text-white p-3 rounded-2xl hover:scale-110 transition'>send</button>
      </form>
    </div>
  )
}

export default page