import React, { createContext, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to the server
    socketRef.current = io(import.meta.env.VITE_BASE_URL || 'http://localhost:3000', {
    //   withCredentials: true
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('✅ Connected to socket server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from socket server');
    });

  }, []);

  const sendMessage = (eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    } else {
      console.warn('⚠️ Socket not connected');
    }
  };

  const onMessage = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
  };

  return (
    <SocketContext.Provider value={{ sendMessage, onMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
