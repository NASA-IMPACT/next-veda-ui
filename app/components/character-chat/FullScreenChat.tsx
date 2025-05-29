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

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
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
  environment?: string; // New environment prop
  config: {
    character: {
      name: string;
      avatar: string;
      description: string;
      colorTheme: string;
      coordinates?: [number, number];
      area?: string;
      locationDescription?: string;
      environment?: string;
    };
    contexts: Record<string, {
      timing: 'before' | 'during' | 'after';
      perspective: string;
      initialGreeting: string[];
    }>;
  };
}

export default function FullScreenChat({ isOpen, onClose, context, contextPrompt, environment, config }: FullScreenChatProps) {
  // Fixed getContextualAnimation error - 2024
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

  const getContextualBackground = (): string => {
    // Use environment prop from config first, then fallback to environment prop, then context, then default
    const environmentType = config.character.environment || environment || context || 'clear';
    
    switch (environmentType) {
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
      case 'ash':
        return [
          // Base ash background
          'radial-gradient(circle at 25% 75%, rgba(90, 85, 80, 0.7) 0%, transparent 55%)',
          'radial-gradient(circle at 75% 25%, rgba(110, 105, 100, 0.6) 0%, transparent 60%)',
          'radial-gradient(circle at 40% 40%, rgba(70, 65, 60, 0.8) 0%, transparent 45%)',
          'radial-gradient(circle at 60% 80%, rgba(130, 125, 120, 0.5) 0%, transparent 70%)',
          'linear-gradient(135deg, rgba(50, 45, 40, 0.6) 0%, rgba(90, 85, 80, 0.7) 100%)',
          // Animated ash particles
          'radial-gradient(4px 4px at 30px 50px, rgba(160, 160, 160, 0.8), transparent)',
          'radial-gradient(3px 3px at 80px 30px, rgba(140, 140, 140, 0.7), transparent)',
          'radial-gradient(5px 5px at 120px 80px, rgba(180, 180, 180, 0.6), transparent)',
          'radial-gradient(2px 2px at 160px 40px, rgba(120, 120, 120, 0.9), transparent)',
          // Swirling ash clouds
          'radial-gradient(12px 6px at 60px 60px, rgba(100, 100, 100, 0.5), transparent)',
          'radial-gradient(8px 8px at 140px 20px, rgba(90, 90, 90, 0.6), transparent)'
        ].join(', ');
      case 'wind':
        return [
          'radial-gradient(circle at 20% 60%, rgba(120, 130, 140, 0.5) 0%, transparent 65%)',
          'radial-gradient(circle at 80% 40%, rgba(100, 110, 120, 0.6) 0%, transparent 55%)',
          'radial-gradient(circle at 50% 20%, rgba(140, 150, 160, 0.4) 0%, transparent 75%)',
          'linear-gradient(45deg, rgba(90, 100, 110, 0.3) 0%, rgba(120, 130, 140, 0.5) 100%)'
        ].join(', ');
      case 'smoke':
        return [
          'radial-gradient(circle at 30% 70%, rgba(60, 55, 50, 0.8) 0%, transparent 60%)',
          'radial-gradient(circle at 70% 30%, rgba(80, 75, 70, 0.7) 0%, transparent 50%)',
          'radial-gradient(circle at 15% 15%, rgba(40, 35, 30, 0.9) 0%, transparent 40%)',
          'radial-gradient(circle at 85% 85%, rgba(100, 95, 90, 0.6) 0%, transparent 65%)',
          'linear-gradient(135deg, rgba(30, 25, 20, 0.7) 0%, rgba(70, 65, 60, 0.8) 100%)'
        ].join(', ');
      case 'clear':
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

  const getAnimatedParticles = (): string => {
    const environmentType = config.character.environment || environment || context || 'clear';
    
    switch (environmentType) {
      case 'ash':
        return [
          // Small ash particles
          'radial-gradient(2px 2px at 30px 50px, rgba(160, 160, 160, 0.6), transparent)',
          'radial-gradient(1px 1px at 80px 30px, rgba(140, 140, 140, 0.4), transparent)',
          'radial-gradient(3px 3px at 120px 80px, rgba(180, 180, 180, 0.5), transparent)',
          'radial-gradient(1px 1px at 160px 40px, rgba(120, 120, 120, 0.3), transparent)',
        ].join(', ');
      case 'smoke':
        return [
          // Wispy smoke particles
          'radial-gradient(3px 3px at 35px 45px, rgba(80, 75, 70, 0.4), transparent)',
          'radial-gradient(2px 2px at 90px 75px, rgba(60, 55, 50, 0.5), transparent)',
          'radial-gradient(4px 4px at 140px 25px, rgba(100, 95, 90, 0.3), transparent)',
        ].join(', ');
      case 'wind':
        return [
          // Wind streaks
          'radial-gradient(8px 1px at 40px 60px, rgba(150, 140, 130, 0.3), transparent)',
          'radial-gradient(6px 1px at 100px 20px, rgba(170, 160, 150, 0.2), transparent)',
          'radial-gradient(10px 1px at 160px 90px, rgba(130, 120, 110, 0.4), transparent)',
        ].join(', ');
      case 'fire':
        return [
          // Subtle embers
          'radial-gradient(1px 1px at 30px 40px, rgba(255, 150, 80, 0.5), transparent)',
          'radial-gradient(2px 2px at 70px 20px, rgba(255, 120, 60, 0.4), transparent)',
          'radial-gradient(1px 1px at 120px 80px, rgba(255, 180, 100, 0.3), transparent)',
        ].join(', ');
      default:
        return 'none';
    }
  };

  const getBackgroundSize = (): string => {
    const environmentType = config.character.environment || environment || context || 'clear';
    
    switch (environmentType) {
      case 'ash':
        return '200px 150px';
      case 'smoke':
        return '250px 180px';
      case 'wind':
        return '300px 100px';
      case 'fire':
        return '180px 120px';
      default:
        return 'auto';
    }
  };
  const getEnvironmentAnimation = (): string => {
    const environmentType = config.character.environment || environment || context || 'clear';
    
    switch (environmentType) {
      case 'ash':
        return 'gentleDrift 8s infinite linear';
      case 'smoke':
        return 'gentleFloat 10s infinite ease-in-out';
      case 'wind':
        return 'windSway 6s infinite ease-in-out';
      case 'fire':
        return 'subtleFlicker 4s infinite ease-in-out';
      default:
        return 'none';
    }
  };
  // Add CSS keyframes to document head
  useEffect(() => {
    if (isOpen) {
      const style = document.createElement('style');
      style.textContent = `
        /* Subtle realistic animations */
        @keyframes gentleDrift {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateX(-10px) translateY(-5px);
            opacity: 0.4;
          }
          100% {
            transform: translateX(-20px) translateY(-10px);
            opacity: 0.6;
          }
        }
        
        @keyframes gentleFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-8px) translateX(3px);
            opacity: 0.3;
          }
        }
        
        @keyframes windSway {
          0%, 100% {
            transform: translateX(0) scaleX(1);
            opacity: 0.4;
          }
          50% {
            transform: translateX(8px) scaleX(1.1);
            opacity: 0.6;
          }
        }
        
        @keyframes subtleFlicker {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          25% {
            opacity: 0.6;
            transform: scale(1.05);
          }
          75% {
            opacity: 0.3;
            transform: scale(0.95);
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
    const contextInfo = config.contexts[context];
    if (contextInfo && contextInfo.initialGreeting) {
      return contextInfo.initialGreeting;
    }
    
    // Fallback to default if context not found
    return [
      `I'm here with you right now.`,
      `What would you like to know about what I'm experiencing?`
    ];
  };

  const getTypingMessage = (context: string): string => {
    const messages = [
      `${config.character.name} pauses to think...`,
      `${config.character.name} takes a deep breath...`,
      `${config.character.name} is finding the words...`,
      `${config.character.name} hesitates for a moment...`
    ];
    
    // Context-specific typing messages
    switch (context) {
      case 'search':
        return Math.random() > 0.5 ? `${config.character.name} stops walking, remembering...` : `${config.character.name} looks around, then continues...`;
      case 'fire':
        return Math.random() > 0.5 ? `${config.character.name} feels the heat again...` : `${config.character.name} remembers the wind...`;
      case 'communication':
        return Math.random() > 0.5 ? `${config.character.name} checks his phone instinctively...` : `${config.character.name} thinks about that silence...`;
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
        backgroundImage: getContextualBackground(),
        border: 'none', // Removed debug border
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Static background particles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: getAnimatedParticles(),
          backgroundRepeat: 'repeat',
          backgroundSize: getBackgroundSize(),
          animation: getEnvironmentAnimation(),
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 2
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
              background: `linear-gradient(135deg, ${config.character.colorTheme}, ${adjustColorBrightness(config.character.colorTheme, -20)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}>
              {config.character.avatar}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>
                {config.character.name}
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6c757d', fontStyle: 'italic' }}>
                {config.character.description}
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
              <MiniMap 
                coordinates={config.character.coordinates}
                area={config.character.area}
                description={config.character.locationDescription}
                characterName={config.character.name}
                colorTheme={config.character.colorTheme}
              />
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
                {typingMessage || `${config.character.name} is typing...`}
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
              placeholder={`Ask ${config.character.name} about his experience...`}
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
                backgroundColor: isLoading ? '#95a5a6' : config.character.colorTheme,
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading || !inputValue.trim() ? 0.7 : 1,
                boxShadow: `0 4px 12px ${config.character.colorTheme}50`
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
