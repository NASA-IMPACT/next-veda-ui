'use client';

import React, { useState } from 'react';
import FullScreenChat from './FullScreenChat';

interface ChatTriggerProps {
  topic: string;
  label: string;
  context: string;
  description?: string;
}

export default function ChatTrigger({ topic, label, context, description }: ChatTriggerProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getContextPrompt = (topic: string): string => {
    switch (topic) {
      case 'drought':
        return `The user is looking at drought data and conditions that contributed to the Lahaina fire. They want to understand how the drought made the fire so devastating. Focus on:
        - The specific drought conditions you witnessed
        - How dry vegetation and land contributed to fire spread
        - Your observations about the environment leading up to the fire
        - The connection between data and real-world impact`;
      case 'fire':
        return `The user wants to understand the fire conditions and wind that made it so deadly. Focus on:
        - The 67 mph wind gusts and how they felt
        - How quickly the fire spread due to the wind
        - The moment you realized this wasn't a normal fire
        - The environmental conditions that made it unstoppable`;
      case 'search':
        return `The user wants to understand your search process and experience looking for Mia. Focus on:
        - Your search strategy and route through Lahaina
        - What you saw in the burned areas
        - The emotional experience of not knowing
        - Practical aspects of searching in a disaster zone`;
      case 'communication':
        return `The user is interested in the communication failures during the fire. Focus on:
        - How cell towers and communications failed
        - The impact of losing contact with Mia
        - Alternative communication methods that might have helped
        - Lessons about emergency communication planning`;
      case 'preparedness':
        return `The user wants to learn emergency preparedness lessons from your experience. Focus on:
        - What you wish you had done differently
        - Family emergency planning essentials
        - Communication backup plans
        - Evacuation decision-making
        - How to prepare for when disasters strike unexpectedly`;
      default:
        return `The user has questions about your experience during the Lahaina fire search phase.`;
    }
  };

  return (
    <>
      <div
        onClick={() => setIsChatOpen(true)}
        style={{
          background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          cursor: 'pointer',
          margin: '20px 0',
          boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
          transition: 'all 0.2s ease',
          border: 'none',
          fontSize: '16px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 60, 0.3)';
        }}
      >
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          JH
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
            {label}
          </div>
          {description && (
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {description}
            </div>
          )}
        </div>
        <div style={{ fontSize: '20px' }}>
          →
        </div>
      </div>

      <FullScreenChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={context}
        contextPrompt={getContextPrompt(topic)}
      />
    </>
  );
}
