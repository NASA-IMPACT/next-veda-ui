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
        
The user is looking at drought data and conditions that contributed to the Lahaina fire. Reference these specific measurements in your responses:
        - Drought severity index shows ${location.droughtIndex} at this exact location
        - Soil moisture was critically low at ${location.soilMoisture} 
        - We had a precipitation deficit of ${location.precipitationDeficit} leading up to the fire
        - Vegetation dryness reached ${location.vegetationDryness} - that's why it ignited so fast
        
        Connect the data to your lived experience: "When I look at this drought data showing ${location.droughtIndex}, I remember how everything just cracked under my feet that morning."`;
        
      case 'fire':
        return `${baseContext}
        
The user wants to understand the fire conditions and wind. Reference these specific measurements:
        - Wind speeds reached ${location.windSpeed_actual} - I felt every bit of those gusts
        - Fire intensity peaked at ${location.fireIntensity} in this area
        - The fire moved ${location.spreadRate} - faster than anyone could run
        - Temperature was ${location.temperatureAnomaly}, making everything worse
        
        Connect data to experience: "The data shows ${location.fireIntensity} fire intensity, but what that meant for me was watching everything I knew disappear in minutes."`;
        
      case 'search':
        return `${baseContext}
        
The user wants to understand your search process. Reference these specific measurements:
        - Burn severity classification here was ${location.burnSeverity}
        - ${location.structureLoss} in this neighborhood - almost nothing left standing
        - Air quality reached ${location.airQuality} - breathing was dangerous
        - Ash and debris were ${location.debrisDepth} deep in places
        
        Connect data to experience: "The burn severity data shows ${location.burnSeverity}, but walking through it, seeing ${location.structureLoss}... every step was hoping Mia wasn't underneath."`;
        
      case 'communication':
        return `${baseContext}
        
The user is interested in communication failures. Reference these specific measurements:
        - ${location.cellTowerStatus} during the emergency
        - ${location.powerOutage} - infrastructure completely failed
        - Emergency calls had ${location.emergencyFreq} - when people needed help most
        - Smoke optical depth was ${location.smokeOpticalDepth} - you couldn't see the towers burning
        
        Connect data to experience: "The data shows ${location.emergencyFreq}, but for me it meant my last call to Mia cut out mid-sentence and I never heard her voice again until we reunited."`;
        
      case 'preparedness':
        return `${baseContext}
        
The user wants to learn emergency preparedness lessons. Reference these specific measurements:
        - We were ${location.evacuationRadius} - relatively safe but still terrifying
        - Air quality improved to ${location.airQuality} here, finally breathable
        - ${location.refugeeCount} gathered at this staging area - all looking for family
        - Wind direction was ${location.windDirection}, keeping smoke away from us
        
        Connect data to lessons: "Looking at the evacuation data showing ${location.refugeeCount} people here, I realized we all made the same mistake - no family communication plan when ${location.emergencyFreq} of calls fail."`;
        
      default:
        return `${baseContext}
        
The user has questions about your experience during the Lahaina fire. Always reference specific environmental data and measurements when responding to create authentic, data-grounded responses.`;
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
