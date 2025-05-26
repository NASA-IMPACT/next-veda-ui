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

  const responses = {
    'fire': 'The fire moved so fast. One minute we were having a normal Tuesday, the next the sky was orange and roads were closing. The wind was unlike anything I had experienced - over 60 mph gusts that just would not stop.',
    'search': 'Walking through Lahaina afterwards was surreal. Everything was ash and twisted metal. I kept calling Mia\'s name, checking every shelter, every group of people. The not knowing was the hardest part.',
    'daughter': 'Mia is my everything. She is 16, smart, independent - which made it even scarier when I could not reach her. She was at her friend Leila\'s house when it all started.',
    'prepare': 'Have multiple ways to communicate - not just cell phones. Make sure your family knows meeting points. Keep emergency supplies ready. And trust me, when they say evacuate, do not wait.',
    'data': 'The satellite images show how fast it spread - you can see the thermal signatures from space. The drought data explains why it was so devastating. When the land is that dry, fire becomes unstoppable.',
    'reunion': 'Finding Mia after two days... I cannot describe that relief. She was safe with Leila\'s family, but her phone was dead and there was no way to reach me. We just held each other and cried.',
    'mia': 'Mia is my everything. She is 16, smart, independent - which made it even scarier when I could not reach her. She was at her friend Leila\'s house when it all started.',
    'wind': 'The wind was incredible - over 60 mph gusts that just would not stop. It was like nature was determined to spread that fire as far and fast as possible.',
    'evacuation': 'When they say evacuate, do not hesitate. Do not wait to grab more things. The fire moved faster than anyone expected. Lives are more important than possessions.',
    'communication': 'Cell towers went down so fast. That is why you need multiple ways to reach family - landlines, social media, even old-fashioned meeting spots. We learned that the hard way.',
    'default': 'That is a good question. The whole experience taught me that disasters do not wait for convenient times. Every family should have an emergency plan and practice it. What specific aspect would you like to know more about?'
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    return responses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(inputValue);
      const jonahMessage: Message = { text: response, isUser: false };
      setMessages(prev => [...prev, jonahMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Jonah about the search, the fire, or family emergency preparedness..."
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '24px',
              fontSize: '14px',
              outline: 'none',
              background: 'white'
            }}
          />
          <button 
            onClick={handleSend}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </div>
      </div>
      
      <div style={{ fontSize: '12px', color: '#868e96', marginTop: '12px', textAlign: 'center' }}>
        ⚡ Interactive React component with hardcoded responses
      </div>
    </div>
  );
}
