'use client';

import React, { useState } from 'react';
import FullScreenChat from './FullScreenChat';

interface ChatTriggerProps {
  topic: string;
  label: string;
  context: string;
  description?: string;
}

// Geographic context data for location-aware prompting
const locationData = {
  'drought': {
    coordinates: [-156.6747, 20.8738],
    area: 'Lahaina Resort Area',
    conditions: 'Severe drought conditions, dry vegetation',
    windSpeed: 'Light winds initially',
    visibility: 'Clear, dry air'
  },
  'fire': {
    coordinates: [-156.6789, 20.8751],
    area: 'Front Street Historic District',
    conditions: 'Extreme fire danger, 67 mph winds',
    windSpeed: '67 mph sustained gusts',
    visibility: 'Thick smoke, near-zero visibility'
  },
  'search': {
    coordinates: [-156.6723, 20.8729],
    area: 'Residential neighborhoods',
    conditions: 'Post-fire devastation, ash and debris',
    windSpeed: 'Calm winds',
    visibility: 'Smoke haze, reduced visibility'
  },
  'communication': {
    coordinates: [-156.6756, 20.8745],
    area: 'Central Lahaina',
    conditions: 'Infrastructure failure, cell towers down',
    windSpeed: 'Variable winds',
    visibility: 'Smoke and chaos'
  },
  'preparedness': {
    coordinates: [-156.6734, 20.8742],
    area: 'Safe meeting point',
    conditions: 'Clear area, emergency staging',
    windSpeed: 'Light winds',
    visibility: 'Good visibility for reunion'
  }
};

export default function ChatTrigger({ topic, label, context, description }: ChatTriggerProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getContextPrompt = (topic: string): string => {
    const location = locationData[topic] || {};
    
    switch (topic) {
      case 'drought':
        return `You are Jonah at ${location.area} (coordinates: ${location.coordinates?.join(', ')}). Environmental conditions: ${location.conditions}. Current weather: ${location.windSpeed}, ${location.visibility}.
        
        The user is looking at drought data and conditions that contributed to the Lahaina fire. They want to understand how the drought made the fire so devastating. Focus on:
        - The specific drought conditions you witnessed at this exact location
        - How dry vegetation and land around the resort area contributed to fire spread
        - Your observations about the environment leading up to the fire from this vantage point
        - The connection between data and the real-world impact you experienced here`;
      case 'fire':
        return `You are Jonah at ${location.area} (coordinates: ${location.coordinates?.join(', ')}). Environmental conditions: ${location.conditions}. Current weather: ${location.windSpeed}, ${location.visibility}.
        
        The user wants to understand the fire conditions and wind that made it so deadly. Focus on:
        - The 67 mph wind gusts and how they felt at this specific location on Front Street
        - How quickly the fire spread due to the wind through this historic area
        - The moment you realized this wasn't a normal fire while standing here
        - The environmental conditions that made it unstoppable from this vantage point`;
      case 'search':
        return `You are Jonah in ${location.area} (coordinates: ${location.coordinates?.join(', ')}). Environmental conditions: ${location.conditions}. Current weather: ${location.windSpeed}, ${location.visibility}.
        
        The user wants to understand your search process and experience looking for Mia. Focus on:
        - Your search strategy and route through these specific residential neighborhoods
        - What you saw in the burned areas around this location
        - The emotional experience of not knowing while walking these exact streets
        - Practical aspects of searching in a disaster zone with these visibility conditions`;
      case 'communication':
        return `You are Jonah in ${location.area} (coordinates: ${location.coordinates?.join(', ')}). Environmental conditions: ${location.conditions}. Current weather: ${location.windSpeed}, ${location.visibility}.
        
        The user is interested in the communication failures during the fire. Focus on:
        - How cell towers and communications failed specifically in this central Lahaina area
        - The impact of losing contact with Mia while experiencing these conditions
        - Alternative communication methods that might have helped in this location
        - Lessons about emergency communication planning from this geographic perspective`;
      case 'preparedness':
        return `You are Jonah at ${location.area} (coordinates: ${location.coordinates?.join(', ')}). Environmental conditions: ${location.conditions}. Current weather: ${location.windSpeed}, ${location.visibility}.
        
        The user wants to learn emergency preparedness lessons from your experience. Focus on:
        - What you wish you had done differently from this safe vantage point
        - Family emergency planning essentials that would have helped in this specific geographic context
        - Communication backup plans suitable for this area and conditions
        - Evacuation decision-making based on your experience moving through Lahaina
        - How to prepare for when disasters strike unexpectedly in communities like this`;
      default:
        return `You are Jonah in Lahaina during the fire emergency. The user has questions about your experience during the Lahaina fire search phase. Reference your specific location and environmental conditions when responding.`;
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
