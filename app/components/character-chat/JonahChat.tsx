'use client';

import React, { useState } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function JonahChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Those two days searching for Mia were the longest of my life. The smoke, the uncertainty, not knowing if she was safe. I understand what families go through during disasters like this. What would you like to know?",
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const jonahMessage: Message = { text: data.response, isUser: false };
      setMessages(prev => [...prev, jonahMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to a default response if API fails
      const fallbackMessage: Message = {
        text: "I'm sorry, I'm having trouble connecting right now. The experience of searching for Mia during the fire taught me that communication can fail when we need it most. That's why it's so important to have backup plans.",
        isUser: false
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      border: '2px solid #6c757d',
      borderRadius: '16px',
      padding: '24px',
      margin: '32px 0',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid #dee2e6'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          marginRight: '16px',
          background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          JH
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#2c3e50' }}>
            Jonah
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6c757d', fontStyle: 'italic' }}>
            Father & Lahaina Fire Survivor
          </p>
        </div>
      </div>
      
      <div style={{ 
        fontSize: '13px',
        color: '#6c757d',
        fontStyle: 'italic',
        marginBottom: '16px',
        padding: '8px 12px',
        background: '#f8f9fa',
        borderRadius: '8px',
        borderLeft: '3px solid #e74c3c'
      }}>
        💭 "I'm Jonah. I lived through the search for my daughter during the Lahaina fire. Ask me about what it was like, the data we're seeing, or how families can prepare for wildfires."
      </div>

      <div style={{
        minHeight: '200px',
        background: 'white',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{
          marginBottom: '16px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                background: message.isUser ? '#e3f2fd' : '#ffebee',
                padding: '12px 16px',
                borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                marginBottom: '12px',
                maxWidth: '80%',
                fontSize: '15px',
                lineHeight: '1.4',
                color: message.isUser ? '#1565c0' : '#c62828',
                marginLeft: message.isUser ? 'auto' : '0'
              }}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div style={{
              background: '#ffebee',
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              marginBottom: '12px',
              maxWidth: '80%',
              fontSize: '15px',
              lineHeight: '1.4',
              color: '#c62828',
              fontStyle: 'italic'
            }}>
              Jonah is typing...
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Jonah about the search, the fire, or family emergency preparedness..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              background: isLoading ? '#f8f9fa' : 'white',
              opacity: isLoading ? 0.7 : 1
            }}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            style={{
              padding: '12px 24px',
              backgroundColor: isLoading ? '#95a5a6' : '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading || !inputValue.trim() ? 0.7 : 1
            }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
      
      <div style={{ fontSize: '12px', color: '#868e96', marginTop: '12px', textAlign: 'center' }}>
        ⚡ Powered by OpenAI - Real AI responses as Jonah
      </div>
    </div>
  );
}
