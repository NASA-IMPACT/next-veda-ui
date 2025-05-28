'use client';

import React, { useState } from 'react';
import FullScreenChat from './FullScreenChat';
import { StoryConfig } from '../../story-configs/lahaina-fire-config';

interface StoryCharacterChatProps {
  config: StoryConfig;
  topic: string;
  label: string;
  context: string;
  description?: string;
}

export default function StoryCharacterChat({ config, topic, label, context, description }: StoryCharacterChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getContextPrompt = (topic: string): string => {
    const location = config.locations[topic] || {};
    const contextInfo = config.contexts[topic] || { timing: 'during', perspective: 'experiencing events' };
    
    // Create data-rich environmental context
    const environmentalData = Object.entries(location)
      .filter(([key, value]) => !['coordinates', 'area', 'conditions', 'windSpeed', 'visibility'].includes(key))
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    
    const baseContext = `You are ${config.character.name} at ${location.area} (coordinates: ${location.coordinates?.join(', ')}). 
Environmental conditions: ${location.conditions}. Current weather: ${location.windSpeed}, ${location.visibility}.
Dataset measurements: ${environmentalData}`;
    
    // Generate temporal context based on timing
    let temporalContext = '';
    switch (contextInfo.timing) {
      case 'before':
        temporalContext = `IMPORTANT: You are speaking BEFORE the major disaster has started. You may have heard about small incidents, but the devastating event hasn't happened yet. You don't know what's coming. Speak in present tense about current conditions - "I can feel", "I'm seeing", "this is happening".`;
        break;
      case 'during':
        temporalContext = `IMPORTANT: You are speaking as events are happening RIGHT NOW. You're experiencing this moment in real-time. Use present tense - "I am walking", "I can see", "this is happening now", "I'm trying to".`;
        break;
      case 'after':
        temporalContext = `IMPORTANT: You are speaking after finding your daughter and reflecting on lessons learned. Only in this context should you use past tense to describe what happened.`;
        break;
    }
    
    return `${baseContext}

${temporalContext}

${contextInfo.perspective}

The user is asking about ${topic}. Reference the specific environmental data measurements in your responses to create authentic, data-grounded conversations. Always speak from the correct temporal moment based on the timing context. Use present tense for 'before' and 'during' contexts, only use past tense for 'after' context.`;
  };

  return (
    <>
      <div
        onClick={() => setIsChatOpen(true)}
        style={{
          background: `linear-gradient(135deg, ${config.character.colorTheme}, ${adjustColorBrightness(config.character.colorTheme, -20)})`,
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          cursor: 'pointer',
          margin: '20px 0',
          boxShadow: `0 4px 12px ${config.character.colorTheme}40`,
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
          e.currentTarget.style.boxShadow = `0 6px 20px ${config.character.colorTheme}60`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 4px 12px ${config.character.colorTheme}40`;
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
          {config.character.avatar}
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
        config={config}
      />
    </>
  );
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
