'use client';

import React, { useState, useEffect, useRef } from 'react';
import MiniMap from './MiniMap';

// Hook to detect screen size
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  return isDesktop;
}

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
  const [typingMessage, setTypingMessage] = useState('');
  const [isTypingPaused, setIsTypingPaused] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading, typingMessage]);

  // Initialize with contextual greeting when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingMessages = getContextualGreeting(context);
      // Show initial messages immediately without typing animation
      setMessages(greetingMessages.map(text => ({ text, isUser: false })));
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

  const getContextualBackground = (context: string): string => {
    switch (context) {
      case 'search':
        return [
          'radial-gradient(circle at 30% 70%, rgba(80, 80, 80, 0.8) 0%, transparent 50%)',
          'radial-gradient(circle at 70% 30%, rgba(60, 60, 60, 0.9) 0%, transparent 60%)',
          'radial-gradient(circle at 20% 20%, rgba(100, 100, 100, 0.7) 0%, transparent 40%)',
          'radial-gradient(circle at 80% 80%, rgba(70, 70, 70, 0.8) 0%, transparent 50%)',
          'radial-gradient(circle at 50% 50%, rgba(50, 50, 50, 0.6) 0%, transparent 70%)',
          'radial-gradient(circle at 15% 85%, rgba(90, 90, 90, 0.7) 0%, transparent 45%)',
          'radial-gradient(circle at 85% 15%, rgba(65, 65, 65, 0.8) 0%, transparent 55%)',
          'linear-gradient(135deg, rgba(40, 40, 40, 0.6) 0%, rgba(20, 20, 20, 0.8) 100%)'
        ].join(', ');
      case 'fire':
        return [
          'radial-gradient(circle at 40% 80%, rgba(120, 60, 30, 0.7) 0%, transparent 50%)',
          'radial-gradient(circle at 60% 20%, rgba(150, 80, 40, 0.8) 0%, transparent 60%)',
          'radial-gradient(circle at 20% 40%, rgba(180, 100, 50, 0.6) 0%, transparent 45%)',
          'radial-gradient(circle at 80% 60%, rgba(100, 50, 20, 0.9) 0%, transparent 55%)',
          'radial-gradient(circle at 50% 30%, rgba(200, 120, 60, 0.5) 0%, transparent 70%)',
          'linear-gradient(135deg, rgba(80, 40, 20, 0.6) 0%, rgba(120, 60, 30, 0.8) 100%)'
        ].join(', ');
      case 'drought':
        return [
          'radial-gradient(circle at 30% 70%, rgba(140, 120, 80, 0.6) 0%, transparent 60%)',
          'radial-gradient(circle at 70% 30%, rgba(160, 140, 100, 0.7) 0%, transparent 50%)',
          'radial-gradient(circle at 20% 20%, rgba(120, 100, 70, 0.5) 0%, transparent 65%)',
          'radial-gradient(circle at 80% 80%, rgba(180, 160, 120, 0.4) 0%, transparent 70%)',
          'linear-gradient(135deg, rgba(100, 80, 50, 0.5) 0%, rgba(140, 120, 80, 0.6) 100%)'
        ].join(', ');
      case 'communication':
        return [
          'radial-gradient(circle at 30% 70%, rgba(60, 70, 90, 0.6) 0%, transparent 55%)',
          'radial-gradient(circle at 70% 30%, rgba(40, 50, 80, 0.7) 0%, transparent 60%)',
          'radial-gradient(circle at 20% 20%, rgba(80, 90, 120, 0.5) 0%, transparent 50%)',
          'radial-gradient(circle at 80% 80%, rgba(50, 60, 100, 0.8) 0%, transparent 45%)',
          'linear-gradient(135deg, rgba(30, 40, 70, 0.6) 0%, rgba(60, 70, 90, 0.7) 100%)'
        ].join(', ');
      case 'preparedness':
        return [
          'radial-gradient(circle at 30% 70%, rgba(100, 120, 100, 0.4) 0%, transparent 70%)',
          'radial-gradient(circle at 70% 30%, rgba(80, 100, 80, 0.5) 0%, transparent 65%)',
          'radial-gradient(circle at 50% 50%, rgba(120, 140, 120, 0.3) 0%, transparent 75%)',
          'linear-gradient(135deg, rgba(60, 80, 60, 0.3) 0%, rgba(100, 120, 100, 0.4) 100%)'
        ].join(', ');
      default:
        return [
          'radial-gradient(circle at 20% 80%, rgba(100, 100, 100, 0.4) 0%, transparent 60%)',
          'radial-gradient(circle at 80% 20%, rgba(80, 80, 80, 0.5) 0%, transparent 60%)',
          'radial-gradient(circle at 40% 40%, rgba(60, 60, 60, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 70% 70%, rgba(90, 90, 90, 0.3) 0%, transparent 50%)',
          'linear-gradient(135deg, rgba(40, 40, 40, 0.2) 0%, rgba(20, 20, 20, 0.3) 100%)'
        ].join(', ');
    }
  };

  const getContextualAnimation = (context: string): React.CSSProperties => {
    switch (context) {
      case 'search':
        return {
          background: [
            // Ash particles - realistic sizes and movement
            'radial-gradient(3px 3px at 25px 35px, rgba(200, 200, 200, 0.7), transparent)',
            'radial-gradient(2px 2px at 45px 75px, rgba(180, 180, 180, 0.6), transparent)',
            'radial-gradient(4px 4px at 95px 45px, rgba(220, 220, 220, 0.8), transparent)',
            'radial-gradient(2px 2px at 135px 85px, rgba(160, 160, 160, 0.5), transparent)',
            'radial-gradient(3px 3px at 165px 35px, rgba(190, 190, 190, 0.6), transparent)',
            // Floating smoke wisps - horizontal drifting
            'radial-gradient(6px 3px at 60px 20px, rgba(120, 120, 120, 0.4), transparent)',
            'radial-gradient(8px 2px at 120px 60px, rgba(100, 100, 100, 0.5), transparent)',
            'radial-gradient(5px 4px at 180px 90px, rgba(140, 140, 140, 0.3), transparent)',
            // Small embers - very subtle
            'radial-gradient(1px 1px at 80px 50px, rgba(255, 120, 80, 0.6), transparent)',
            'radial-gradient(1px 1px at 140px 30px, rgba(255, 100, 60, 0.5), transparent)'
          ].join(', '),
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 120px',
          animation: 'searchSmokeDrift 10s infinite linear, searchAshFall 8s infinite ease-in-out'
        };
      case 'fire':
        return {
          background: [
            // Flickering embers
            'radial-gradient(2px 2px at 30px 40px, rgba(255, 150, 80, 0.8), transparent)',
            'radial-gradient(3px 3px at 70px 20px, rgba(255, 120, 60, 0.9), transparent)',
            'radial-gradient(1px 1px at 120px 80px, rgba(255, 180, 100, 0.7), transparent)',
            'radial-gradient(2px 2px at 160px 50px, rgba(255, 140, 70, 0.8), transparent)',
            // Heat shimmer effect
            'radial-gradient(8px 1px at 50px 30px, rgba(255, 200, 150, 0.3), transparent)',
            'radial-gradient(6px 2px at 100px 70px, rgba(255, 180, 120, 0.4), transparent)',
            'radial-gradient(10px 1px at 150px 40px, rgba(255, 160, 100, 0.2), transparent)'
          ].join(', '),
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 100px',
          animation: 'fireFlicker 2s infinite ease-in-out, fireGlow 4s infinite alternate'
        };
      case 'drought':
        return {
          background: [
            // Dust particles
            'radial-gradient(2px 2px at 40px 60px, rgba(200, 180, 140, 0.6), transparent)',
            'radial-gradient(1px 1px at 80px 30px, rgba(220, 200, 160, 0.5), transparent)',
            'radial-gradient(3px 3px at 130px 90px, rgba(180, 160, 120, 0.7), transparent)',
            'radial-gradient(2px 2px at 170px 40px, rgba(240, 220, 180, 0.4), transparent)',
            // Heat haze
            'radial-gradient(12px 2px at 60px 50px, rgba(250, 230, 190, 0.2), transparent)',
            'radial-gradient(8px 3px at 140px 20px, rgba(230, 210, 170, 0.3), transparent)'
          ].join(', '),
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 110px',
          animation: 'droughtShimmer 12s infinite linear, dustFloat 8s infinite ease-in-out'
        };
      case 'communication':
        return {
          background: [
            // Static interference particles
            'radial-gradient(1px 1px at 25px 35px, rgba(180, 190, 220, 0.7), transparent)',
            'radial-gradient(1px 1px at 60px 70px, rgba(160, 170, 200, 0.6), transparent)',
            'radial-gradient(1px 1px at 100px 25px, rgba(200, 210, 240, 0.8), transparent)',
            'radial-gradient(1px 1px at 140px 85px, rgba(140, 150, 180, 0.5), transparent)',
            // Signal fade lines
            'radial-gradient(15px 1px at 80px 40px, rgba(120, 140, 180, 0.3), transparent)',
            'radial-gradient(10px 2px at 150px 60px, rgba(100, 120, 160, 0.4), transparent)'
          ].join(', '),
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 110px',
          animation: 'signalStatic 3s infinite linear, signalFade 6s infinite ease-in-out'
        };
      case 'preparedness':
        return {
          background: [
            // Light clearing particles
            'radial-gradient(2px 2px at 50px 30px, rgba(200, 220, 200, 0.5), transparent)',
            'radial-gradient(1px 1px at 90px 70px, rgba(180, 200, 180, 0.4), transparent)',
            'radial-gradient(3px 3px at 130px 45px, rgba(220, 240, 220, 0.3), transparent)',
            // Gentle light rays
            'radial-gradient(8px 3px at 70px 20px, rgba(240, 250, 240, 0.2), transparent)',
            'radial-gradient(6px 4px at 120px 80px, rgba(220, 230, 220, 0.3), transparent)'
          ].join(', '),
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'smokeClearing 15s infinite ease-out, gentleFloat 10s infinite ease-in-out'
        };
      default:
        return {};
    }
  };

  // Add CSS keyframes to document head
  useEffect(() => {
    if (isOpen) {
      const style = document.createElement('style');
      style.textContent = `
        /* Search Context Animations */
        @keyframes searchSmokeDrift {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateX(-40px) translateY(-20px);
            opacity: 0.4;
          }
          100% {
            transform: translateX(-80px) translateY(-40px);
            opacity: 0.6;
          }
        }
        
        @keyframes searchAshFall {
          0% {
            transform: translateY(-30px) translateX(0);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-15px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(0) translateX(-5px);
            opacity: 0.5;
          }
          75% {
            transform: translateY(15px) translateX(15px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(30px) translateX(-10px);
            opacity: 0.3;
          }
        }
        
        /* Fire Context Animations */
        @keyframes fireFlicker {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          25% {
            opacity: 0.9;
            transform: scale(1.1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.9);
          }
          75% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes fireGlow {
          0% {
            filter: brightness(1) contrast(1);
          }
          100% {
            filter: brightness(1.2) contrast(1.1);
          }
        }
        
        /* Drought Context Animations */
        @keyframes droughtShimmer {
          0% {
            transform: translateX(0) translateY(0) scaleY(1);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-20px) translateY(-5px) scaleY(1.2);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-40px) translateY(-10px) scaleY(0.8);
            opacity: 0.3;
          }
        }
        
        @keyframes dustFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) translateX(15px);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.2;
          }
        }
        
        /* Communication Context Animations */
        @keyframes signalStatic {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(0);
          }
          25% {
            opacity: 0.7;
            transform: translateX(2px);
          }
          50% {
            opacity: 0.1;
            transform: translateX(-1px);
          }
          75% {
            opacity: 0.5;
            transform: translateX(1px);
          }
        }
        
        @keyframes signalFade {
          0% {
            opacity: 0.6;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.2;
            transform: scaleX(0.8);
          }
          100% {
            opacity: 0.6;
            transform: scaleX(1);
          }
        }
        
        /* Preparedness Context Animations */
        @keyframes smokeClearing {
          0% {
            opacity: 0.5;
            transform: translateY(0);
          }
          100% {
            opacity: 0.1;
            transform: translateY(-60px);
          }
        }
        
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.2;
          }
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isOpen]);

  const getContextualGreeting = (context: string): string[] => {
    switch (context) {
      case 'drought':
        return [
          "I'm looking at this drought data right now...",
          "You can see how dry everything was - that's exactly what made the fire spread so fast.",
          "What would you like to know about the conditions that day?"
        ];
      case 'fire':
        return [
          "Those wind gusts... 67 miles per hour.",
          "I'd never felt anything like it. The fire just exploded across the landscape.",
          "One minute we thought it was under control, the next it was everywhere. What do you want to know about that moment?"
        ];
      case 'search':
        return [
          "I'm walking through what's left of Lahaina right now, calling Mia's name.",
          "Every step, every corner, hoping to find her...",
          "The devastation is beyond anything I could have imagined. What questions do you have about the search?"
        ];
      case 'communication':
        return [
          "The cell towers went down so fast.",
          "One minute I was trying to call Mia, the next - nothing. Complete silence when we needed communication most.",
          "That's when the real panic set in. What would you like to know about that?"
        ];
      case 'preparedness':
        return [
          "After finding Mia and holding her again...",
          "I keep thinking about what we could have done differently. No family should go through what we did.",
          "There are lessons here that could save lives. What would you like to know about emergency preparedness?"
        ];
      default:
        return [
          "I'm in the middle of searching for Mia right now.",
          "The uncertainty is overwhelming, but I have to keep going.",
          "What would you like to know about what I'm experiencing?"
        ];
    }
  };

  const getTypingMessage = (context: string): string => {
    const messages = [
      "Jonah pauses to think...",
      "Jonah takes a deep breath...",
      "Jonah is finding the words...",
      "Jonah hesitates for a moment..."
    ];
    
    // Context-specific typing messages
    switch (context) {
      case 'search':
        return Math.random() > 0.5 ? "Jonah stops walking, remembering..." : "Jonah looks around, then continues...";
      case 'fire':
        return Math.random() > 0.5 ? "Jonah feels the heat again..." : "Jonah remembers the wind...";
      case 'communication':
        return Math.random() > 0.5 ? "Jonah checks his phone instinctively..." : "Jonah thinks about that silence...";
      default:
        return messages[Math.floor(Math.random() * messages.length)];
    }
  };

  const getImmediateReaction = (userMessage: string, context: string): string | null => {
    // Simple questions get instant acknowledgment
    if (/(yes|no|right|okay|sure|thanks)/i.test(userMessage) && userMessage.length < 30) {
      const simpleResponses = ["Yeah.", "Right.", "Mm-hmm.", "Exactly."];
      return simpleResponses[Math.floor(Math.random() * simpleResponses.length)];
    }
    
    // Complex questions get thinking acknowledgment
    const needsThinking = userMessage.length > 50 || /(why|how|explain|what happened|tell me about|can you describe)/i.test(userMessage);
    if (needsThinking && Math.random() > 0.5) {
      const thinkingResponses = [
        "Oh, let me think about that.",
        "Hmm, that's a good question.",
        "Right, so...",
        "Well...",
        "Let me explain that."
      ];
      return thinkingResponses[Math.floor(Math.random() * thinkingResponses.length)];
    }
    
    // Emotional/difficult questions might get immediate reaction
    if (/(worst|scared|afraid|terrible|devastating)/i.test(userMessage) && Math.random() > 0.6) {
      const emotionalResponses = ["*takes a breath*", "Oh...", "Yeah, that was...", "*nods*"];
      return emotionalResponses[Math.floor(Math.random() * emotionalResponses.length)];
    }
    
    // Context-specific instant reactions
    switch (context) {
      case 'search':
        if (/(find|looking|where)/i.test(userMessage)) {
          return Math.random() > 0.5 ? "*stops walking*" : "Let me tell you...";
        }
        break;
      case 'fire':
        if (/(wind|fast|spread)/i.test(userMessage)) {
          return Math.random() > 0.5 ? "Oh, the wind..." : "*remembers*";
        }
        break;
      case 'communication':
        if (/(phone|call|contact)/i.test(userMessage)) {
          return Math.random() > 0.5 ? "*checks phone instinctively*" : "The phones...";
        }
        break;
    }
    
    // Sometimes no immediate reaction - let the main response handle it
    return null;
  };

  const addMessagesInSequence = async (messageTexts: string[], userMessage?: string) => {
    for (let i = 0; i < messageTexts.length; i++) {
      const text = messageTexts[i];
      
      // Show all messages immediately
      setMessages(prev => [...prev, { text, isUser: false }]);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    
    // Show immediate reaction based on the question type
    const immediateReaction = getImmediateReaction(currentInput, context);
    if (immediateReaction) {
      // Show instant reaction
      setMessages(prev => [...prev, { text: immediateReaction, isUser: false }]);
    }
    
    // Now show contextual typing while OpenAI processes
    setTypingMessage(getTypingMessage(context));
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
      
      // Clear typing indicator
      setIsLoading(false);
      setTypingMessage('');
      
      // Determine if response should have emotional hesitation (only for very difficult topics)
      const hasVeryDifficultContent = /(worst|most difficult|hardest|devastating|lost her|couldn't find|thought she was dead)/i.test(data.response);
      const shouldHesitate = hasVeryDifficultContent && Math.random() > 0.7; // Only 30% chance
      
      let responseMessages: string[] = [];
      
      if (shouldHesitate) {
        const hesitations = [
          "That's... that's really hard to talk about.",
          "*takes a deep breath* This part is difficult...",
          "*stops for a moment* I need to...",
          "*looks away* This brings it all back..."
        ];
        responseMessages.push(hesitations[Math.floor(Math.random() * hesitations.length)]);
      }
      
      // Split long responses into natural conversation chunks
      const sentences = data.response.split(/(?<=[.!?])\s+/);
      if (sentences.length > 3) {
        const firstChunk = sentences.slice(0, 2).join(' ');
        const secondChunk = sentences.slice(2).join(' ');
        responseMessages.push(firstChunk);
        responseMessages.push(secondChunk);
      } else {
        responseMessages.push(data.response);
      }
      
      // Show the main response messages with realistic timing
      await addMessagesInSequence(responseMessages, currentInput);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsLoading(false);
      setTypingMessage('');
      
      const fallbackMessages = [
        "*looks down at phone* I'm sorry, I'm having trouble connecting right now.",
        "The experience taught me that communication can fail when we need it most."
      ];
      await addMessagesInSequence(fallbackMessages, currentInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1a1a1a',
        backgroundImage: getContextualBackground(context),
        border: 'none', // Removed debug border
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Animated particles overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          ...getContextualAnimation(context)
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px',
          background: 'rgba(248, 249, 250, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(222, 226, 230, 0.5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          position: 'relative'
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
          
          {/* Mini Map - Hidden on mobile */}
          {isDesktop && (
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '80px',
              width: '300px'
            }}>
              <MiniMap context={context} />
            </div>
          )}
          
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
              justifyContent: 'center',
              zIndex: 10
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
          flexDirection: 'column',
          background: 'transparent',
          minHeight: 0 // Allow flexbox to shrink
        }}>
          <div 
            ref={chatAreaRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              marginBottom: '20px',
              padding: '16px',
              background: 'transparent',
              minHeight: 0 // Allow flexbox to shrink
            }}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  background: message.isUser 
                    ? 'rgba(227, 242, 253, 0.9)' 
                    : 'rgba(255, 235, 238, 0.9)',
                  backdropFilter: 'blur(10px)',
                  padding: '12px 16px',
                  borderRadius: message.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  marginBottom: '12px',
                  maxWidth: '80%',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: message.isUser ? '#1565c0' : '#c62828',
                  marginLeft: message.isUser ? 'auto' : '0',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              >
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div style={{
                background: 'rgba(255, 235, 238, 0.9)',
                backdropFilter: 'blur(10px)',
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                marginBottom: '12px',
                maxWidth: '80%',
                fontSize: '16px',
                lineHeight: '1.5',
                color: isTypingPaused ? '#8e8e8e' : '#c62828',
                fontStyle: 'italic',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                opacity: isTypingPaused ? 0.6 : 1
              }}>
                {typingMessage || 'Jonah is typing...'}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            flexShrink: 0 // Prevent input area from shrinking
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Jonah about his experience..."
              disabled={isLoading || typingMessage !== ''}
              style={{
                flex: 1,
                padding: '14px 18px',
                border: '2px solid rgba(233, 236, 239, 0.5)',
                borderRadius: '24px',
                fontSize: '16px',
                outline: 'none',
                background: isLoading ? 'rgba(248, 249, 250, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
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
                opacity: isLoading || !inputValue.trim() ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)'
              }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(248, 249, 250, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(222, 226, 230, 0.5)',
          textAlign: 'center',
          fontSize: '12px',
          color: '#868e96',
          flexShrink: 0 // Prevent footer from shrinking
        }}>
          ⚡ Powered by OpenAI | Press ESC or click outside to return to story
        </div>
      </div>
      </div>
      </>
  );
}
