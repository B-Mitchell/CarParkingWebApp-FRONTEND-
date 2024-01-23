'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //this userId is the loggedIn user's ID
  const [userId , setUserId] = useState('');
  const [fetchedUsername, setFetchedUsername] = useState('');
  const [modal, setModal] = useState(false);

  //receiver
  const [ receiver, setReceiver ] = useState('');
  const [chatName, setChatName] = useState('');

  // Effect to load data from local storage on component mount
  useEffect(() => {
    // Retrieve values from local storage
    const storedUserId = localStorage.getItem('userId');
    const storedFetchedUsername = localStorage.getItem('fetchedUsername');
    const storedReceiver = localStorage.getItem('receiver');
    const storedChatName = localStorage.getItem('chatName');

    // Set state variables with retrieved values or default values
    setUserId(storedUserId || '');
    setFetchedUsername(storedFetchedUsername || '');
    setReceiver(storedReceiver || '');
    setChatName(storedChatName || '');
  }, []); // Empty dependency array to run the effect only on component mount

  const updateUserDetails = (newUserId, newFetchedUsername) => {
    //update state variables
    setUserId(newUserId);
    setFetchedUsername(newFetchedUsername);

    //store in local storage
    localStorage.setItem('userId', newUserId);
    localStorage.setItem('fetchedUsername', newFetchedUsername);
  };
  const updateChatName = (newChatName) => {
    //update state variables
    setChatName(newChatName);

    //store in local storage
    localStorage.setItem('chatName', newChatName);
  }
  const updateReceiverId = (newReceiver) => {
    //update state variables
    setReceiver(newReceiver);

    //store in local storage
    localStorage.setItem('receiver', newReceiver);
  }


  const userContextData = {
    updateUserDetails,
    updateChatName,
    updateReceiverId,
    userId,
    setUserId, 
    fetchedUsername,
    setFetchedUsername,
    modal,
    setModal,
    receiver,
    setReceiver,
    chatName, 
    setChatName
  };

  return <UserContext.Provider value={userContextData}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
