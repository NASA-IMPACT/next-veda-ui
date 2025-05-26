'use client';

import React, { useState, useEffect } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

interface FullScreenChatProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
  contextPrompt: string;
}

export default function FullScreenChat({ isOpen, onClose, context, contextPrompt }: FullScreenChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with contextual greeting when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: getContextualGreeting(context),
        isUser: false
      }]);
    }
  }, [isOpen, context]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const getContextualGreeting = (context: string): string => {
    switch (context) {
      case 'drought':
        return "I'm looking at this drought data right now. You can see how dry everything was - that's exactly what made the fire spread so fast. What would you like to know about the conditions that day?";
      case 'fire':
        return "Those wind gusts... 67 miles per hour. I'd never felt anything like it. The fire just exploded across the landscape. One minute we thought it was under control, the next it was everywhere. What do you want to know about that moment?";
      case 'search':
        return "I'm walking through what's left of Lahaina right now, calling Mia's name. Every step, every corner, hoping to find her. The devastation is beyond anything I could have imagined. What questions do you have about the search?";
      case 'communication':
        return "The cell towers went down so fast. One minute I was trying to call Mia, the next - nothing. Complete silence when we needed communication most. That's when the real panic set in. What would you like to know about that?";
      case 'preparedness':
        return "After finding Mia and holding her again, I keep thinking about what we could have done differently. No family should go through what we did. There are lessons here that could save lives. What would you like to know about emergency preparedness?";
      default:
        return "I'm in the middle of searching for Mia right now. The uncertainty is overwhelming, but I have to keep going. What would you like to know about what I'm experiencing?";
    }
  };

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
        body: JSON.stringify({ 
          message: currentInput,
          context: context,
          contextPrompt: contextPrompt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const jonahMessage: Message = { text: data.response, isUser: false };
      setMessages(prev => [...prev, jonahMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
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

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '80vh',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #dee2e6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginRight: '16px',
              background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              JH
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>
                Jonah
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6c757d', fontStyle: 'italic' }}>
                Father & Lahaina Fire Survivor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6c757d',
              padding: '8px',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Chat Area */}
        <div style={{
          flex: 1,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: '20px',
            padding: '16px',
            background: 'white',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
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
                  fontSize: '16px',
                  lineHeight: '1.5',
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
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#c62828',
                fontStyle: 'italic'
              }}>
                Jonah is typing...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Jonah about his experience..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '14px 18px',
                border: '2px solid #e9ecef',
                borderRadius: '24px',
                fontSize: '16px',
                outline: 'none',
                background: isLoading ? '#f8f9fa' : 'white',
                opacity: isLoading ? 0.7 : 1
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              style={{
                padding: '14px 28px',
                backgroundColor: isLoading ? '#95a5a6' : '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading || !inputValue.trim() ? 0.7 : 1
              }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #dee2e6',
          textAlign: 'center',
          fontSize: '12px',
          color: '#868e96'
        }}>
          ⚡ Powered by OpenAI | Press ESC or click outside to return to story
        </div>
      </div>
    </div>
  );
}
