'use client';

import React, { useState } from 'react';
import FullScreenChat from './FullScreenChat';

interface ChatTriggerProps {
  topic: string;
  label: string;
  context: string;
  description?: string;
}

// Geographic context data for location-aware prompting with dataset integration
const locationData = {
  'drought': {
    coordinates: [-156.6747, 20.8738],
    area: 'Lahaina Resort Area',
    conditions: 'Severe drought conditions, dry vegetation',
    windSpeed: 'Light winds initially',
    visibility: 'Clear, dry air',
    // Dataset values for smart prompting
    droughtIndex: 'D3 (Extreme Drought)',
    soilMoisture: '15% below normal',
    precipitationDeficit: '8 inches below average',
    vegetationDryness: '87% critically dry'
  },
  'fire': {
    coordinates: [-156.6789, 20.8751],
    area: 'Front Street Historic District',
    conditions: 'Extreme fire danger, 67 mph winds',
    windSpeed: '67 mph sustained gusts',
    visibility: 'Thick smoke, near-zero visibility',
    // Dataset values for smart prompting
    windSpeed_actual: '67 mph sustained, gusts to 85 mph',
    fireIntensity: '8,500 kW/m (extreme)',
    spreadRate: '1.2 miles in 15 minutes',
    temperatureAnomaly: '+12°F above normal'
  },
  'search': {
    coordinates: [-156.6723, 20.8729],
    area: 'Residential neighborhoods',
    conditions: 'Post-fire devastation, ash and debris',
    windSpeed: 'Calm winds',
    visibility: 'Smoke haze, reduced visibility',
    // Dataset values for smart prompting
    burnSeverity: 'Class 4 (Complete destruction)',
    structureLoss: '89% of buildings destroyed',
    debrisDepth: '2-4 inches ash coverage',
    airQuality: 'AQI 312 (Hazardous)'
  },
  'communication': {
    coordinates: [-156.6756, 20.8745],
    area: 'Central Lahaina',
    conditions: 'Infrastructure failure, cell towers down',
    windSpeed: 'Variable winds',
    visibility: 'Smoke and chaos',
    // Dataset values for smart prompting
    cellTowerStatus: '3 of 4 towers offline',
    powerOutage: '95% of grid down',
    emergencyFreq: '82% call failure rate',
    smokeOpticalDepth: '4.2 (extremely dense)'
  },
  'preparedness': {
    coordinates: [-156.6734, 20.8742],
    area: 'Safe meeting point',
    conditions: 'Clear area, emergency staging',
    windSpeed: 'Light winds',
    visibility: 'Good visibility for reunion',
    // Dataset values for smart prompting
    evacuationRadius: '2.1 miles from fire perimeter',
    airQuality: 'AQI 89 (Moderate)',
    refugeeCount: '847 people at this staging area',
    windDirection: 'Southwest, away from fire'
  }
};

export default function ChatTrigger({ topic, label, context, description }: ChatTriggerProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getContextPrompt = (topic: string): string => {
    const location = locationData[topic] || {};
    
    // Create data-rich environmental context
    const environmentalData = Object.entries(location)
      .filter(([key, value]) => !['coordinates', 'area', 'conditions', 'windSpeed', 'visibility'].includes(key))
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    
    const baseContext = `You are Jonah at ${location.area} (coordinates: ${location.coordinates?.join(', ')}). 
Environmental conditions: ${location.conditions}. Current weather: ${location.windSpeed}, ${location.visibility}.
Dataset measurements: ${environmentalData}`;
    
    switch (topic) {
      case 'drought':
        return `${baseContext}
        
IMPORTANT: You are speaking BEFORE the major fire has started. You've heard about small brush fires, but the devastating fire hasn't happened yet. You don't know what's coming.
        
The user is looking at drought data and asking about conditions. Reference these measurements from your current perspective:
        - Drought severity index shows ${location.droughtIndex} at this exact location
        - Soil moisture is critically low at ${location.soilMoisture} 
        - We've had a precipitation deficit of ${location.precipitationDeficit} this season
        - Vegetation dryness has reached ${location.vegetationDryness} - everything's like tinder
        
Speak from this moment: "Looking at this drought data showing ${location.droughtIndex}, I can feel how dry everything is. The grass cracks under my feet when I walk around the resort. I keep hearing about small fires, but they always get them out, right?"`;
        
      case 'fire':
        return `${baseContext}
        
IMPORTANT: You are speaking as the fire is starting to spread rapidly - this is happening RIGHT NOW. You're experiencing the moment of realization that this isn't a normal fire.
        
Reference these measurements as they're happening:
        - Wind speeds are hitting ${location.windSpeed_actual} - you can feel every gust
        - Fire intensity is reaching ${location.fireIntensity} in this area
        - The fire is moving ${location.spreadRate} - faster than anyone expected
        - Temperature is ${location.temperatureAnomaly}, making everything worse
        
Speak from this moment: "The wind just picked up again - ${location.windSpeed_actual}. I can see the fire intensity building to ${location.fireIntensity}. This isn't like the small fires we heard about this morning. This is moving ${location.spreadRate} - I've never seen anything like this."`;
        
      case 'search':
        return `${baseContext}
        
IMPORTANT: You are speaking while actively searching for Mia the day after the fire. You're walking through the devastation RIGHT NOW, not reflecting on it later.
        
Reference these measurements as you experience them:
        - Burn severity classification here is ${location.burnSeverity}
        - ${location.structureLoss} in this neighborhood - almost nothing left standing
        - Air quality is ${location.airQuality} - you're struggling to breathe even with a mask
        - Ash and debris are ${location.debrisDepth} deep under your feet
        
Speak from this moment: "I'm walking through what the data will later classify as ${location.burnSeverity}. Right now, seeing ${location.structureLoss}, every step through this ${location.debrisDepth} of ash... I'm just hoping Mia made it out. The air quality is ${location.airQuality} - I can barely breathe."`;
        
      case 'communication':
        return `${baseContext}
        
IMPORTANT: You are speaking during the communication breakdown - this is happening RIGHT NOW. You're trying to reach Mia and failing.
        
Reference these measurements as they're happening:
        - ${location.cellTowerStatus} during the emergency - right now
        - ${location.powerOutage} - infrastructure is failing as we speak
        - Emergency calls are experiencing ${location.emergencyFreq} - you can't get through
        - Smoke optical depth is ${location.smokeOpticalDepth} - you can barely see
        
Speak from this moment: "I'm trying to call Mia again, but ${location.cellTowerStatus} are down. The data will show ${location.emergencyFreq}, but right now it just means I can't reach my daughter. The smoke is so thick - optical depth of ${location.smokeOpticalDepth} - I can't even see the cell towers burning."`;
        
      case 'preparedness':
        return `${baseContext}
        
IMPORTANT: You are speaking after finding Mia and reflecting on lessons learned. This is the only context where you can speak about the experience in past tense.
        
Reference these measurements from your reflection:
        - We ended up ${location.evacuationRadius} - relatively safe but terrifying at the time
        - Air quality improved to ${location.airQuality} at the staging area
        - ${location.refugeeCount} gathered there - all of us looking for family
        - Wind direction was ${location.windDirection}, which kept smoke away from us
        
Speak from reflection: "Now that I have Mia back and we're safe, I keep thinking about the data. ${location.refugeeCount} people at that staging area, all of us with no communication plan when ${location.emergencyFreq} of calls fail. We were lucky the evacuation point was ${location.evacuationRadius} and wind direction was ${location.windDirection}."`;
        
      default:
        return `${baseContext}
        
The user has questions about your experience. Always stay in the correct temporal moment - speak as if you're experiencing events in real-time unless this is the preparedness context where you can reflect.`;
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
