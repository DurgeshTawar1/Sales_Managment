import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:400');  // Replace with your backend URL

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
