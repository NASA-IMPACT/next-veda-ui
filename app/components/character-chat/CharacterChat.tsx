'use client';

import React, { useState } from 'react';
import FullScreenChat from './FullScreenChat';

interface CharacterChatProps {
  // Character details
  name: string;
  avatar: string;
  description: string;
  colorTheme: string;
  
  // Interaction details
  label: string;
  context: string;
  description?: string;
  
  // Story timing context
  timing?: 'before' | 'during' | 'after';
  
  // Environmental effects
  environment?: 'drought' | 'fire' | 'search' | 'communication' | 'preparedness' | 'smoke' | 'ash' | 'wind' | 'clear';
  
  // Location details (optional)
  coordinates?: [number, number];
  area?: string;
  conditions?: string;
  windSpeed?: string;
  visibility?: string;
  
  // Dataset details (optional - for AI context)
  [key: string]: any; // Allow any additional dataset properties
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

export default function CharacterChat(props: CharacterChatProps) {
  const {
    name,
    avatar,
    description,
    colorTheme,
    label,
    context,
    timing = 'during', // Default to 'during' if not specified
    environment = 'clear', // Default to clear/no effects
    coordinates,
    area,
    conditions,
    windSpeed,
    visibility,
    ...additionalProps
  } = props;

  const [isChatOpen, setIsChatOpen] = useState(false);

  const getContextPrompt = (): string => {
    // Build location context if provided
    let locationContext = '';
    if (coordinates && area) {
      locationContext = `You are ${name} at ${area} (coordinates: ${coordinates.join(', ')}).`;
      
      if (conditions || windSpeed || visibility) {
        locationContext += `\nEnvironmental conditions: ${conditions || 'normal conditions'}. Weather: ${windSpeed || 'moderate winds'}, ${visibility || 'clear visibility'}.`;
      }
      
      // Add any additional dataset properties
      const datasetProps = Object.entries(additionalProps)
        .filter(([key, value]) => key !== 'description' && typeof value === 'string')
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      
      if (datasetProps) {
        locationContext += `\nDataset measurements: ${datasetProps}`;
      }
    }

    // Generate temporal context based on timing
    let temporalContext = '';
    switch (timing) {
      case 'before':
        temporalContext = `IMPORTANT: You are speaking BEFORE the major disaster has started. You may have heard about small incidents, but the devastating event hasn't happened yet. You don't know what's coming. Speak in present tense about current conditions - "I can feel", "I'm seeing", "this is happening".`;
        break;
      case 'during':
        temporalContext = `IMPORTANT: You are speaking as events are happening RIGHT NOW. You're experiencing this moment in real-time. Use present tense - "I am walking", "I can see", "this is happening now", "I'm trying to".`;
        break;
      case 'after':
        temporalContext = `IMPORTANT: You are speaking after the events have concluded and you can reflect on what happened. You can use past tense to describe what occurred and share lessons learned from the experience.`;
        break;
    }

    // Build the complete context prompt
    const fullContext = `${locationContext ? locationContext + '\n\n' : ''}${temporalContext ? temporalContext + '\n\n' : ''}${context}

You are ${name}. ${description}. 

Respond naturally as this character would, using first person ("I", "me", "my"). Reference specific details from your experience and knowledge as ${name}. Keep responses conversational and authentic to your character's voice and perspective. Always speak from the correct temporal moment based on the timing context.`;

    return fullContext;
  };

  // Create a simplified config object for FullScreenChat
  const chatConfig = {
    character: {
      name,
      avatar,
      description,
      colorTheme,
      coordinates,
      area,
      locationDescription: description,
      environment // Pass environment to config
    },
    contexts: {
      default: {
        timing: 'during' as const,
        perspective: context,
        initialGreeting: [
          `Hi, I'm ${name}.`,
          `${context.split('.')[0]}.`, // First sentence of context
          'What would you like to know?'
        ]
      }
    }
  };

  return (
    <>
      <div
        onClick={() => setIsChatOpen(true)}
        style={{
          background: `linear-gradient(135deg, ${colorTheme}, ${adjustColorBrightness(colorTheme, -20)})`,
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          cursor: 'pointer',
          margin: '20px 0',
          boxShadow: `0 4px 12px ${colorTheme}40`,
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
          e.currentTarget.style.boxShadow = `0 6px 20px ${colorTheme}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 4px 12px ${colorTheme}40`;
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
          {avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
            {label}
          </div>
          {props.description && (
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {props.description}
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
        context="default"
        contextPrompt={getContextPrompt()}
        environment={environment}
        config={chatConfig}
      />
    </>
  );
}
