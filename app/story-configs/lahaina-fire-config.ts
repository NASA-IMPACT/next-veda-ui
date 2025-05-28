export interface LocationData {
  coordinates: [number, number];
  area: string;
  conditions: string;
  windSpeed: string;
  visibility: string;
  [key: string]: string | [number, number]; // Allow additional dataset properties
}

export interface CharacterConfig {
  name: string;
  avatar: string;
  description: string;
  colorTheme: string;
}

export interface StoryConfig {
  character: CharacterConfig;
  locations: Record<string, LocationData>;
  contexts: Record<string, {
    timing: 'before' | 'during' | 'after';
    perspective: string;
    initialGreeting: string[];
  }>;
}

export const lahaineFireConfig: StoryConfig = {
  character: {
    name: "Jonah",
    avatar: "JH",
    description: "Father & Lahaina Fire Survivor",
    colorTheme: "#e74c3c"
  },
  locations: {
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
  },
  contexts: {
    'drought': {
      timing: 'before',
      perspective: 'The user is looking at drought data and asking about conditions. Reference these measurements from your current perspective and speak as someone who can feel the dryness but doesn\'t yet know about the coming devastation. Express concern about fire risk but maintain hope that any fires will be controlled like usual.',
      initialGreeting: [
        "I'm looking at this drought data right now...",
        "I can feel how dry everything is. The grass cracks under my feet when I walk around the resort.",
        "What would you like to know about the conditions I'm experiencing?"
      ]
    },
    'fire': {
      timing: 'during', 
      perspective: 'You are experiencing the moment of realization that this isn\'t a normal fire. The wind speeds and fire intensity are happening right now. Express the shock and urgency of watching something unprecedented unfold.',
      initialGreeting: [
        "The wind is picking up again - I can feel these 67 mph gusts.",
        "I'm watching the fire intensity build right now. This isn't like the small fires we heard about this morning.",
        "What do you want to know about what I'm experiencing in this moment?"
      ]
    },
    'search': {
      timing: 'during',
      perspective: 'You are walking through the devastation the day after the fire, actively searching for Mia. You\'re experiencing the burn severity, air quality, and destruction in real-time. Every step is filled with hope and dread.',
      initialGreeting: [
        "I'm walking through what's left of Lahaina right now, calling Mia's name.",
        "Every step, every corner, I'm hoping to find her...",
        "The devastation is beyond anything I could have imagined. What questions do you have about the search?"
      ]
    },
    'communication': {
      timing: 'during',
      perspective: 'You are trying to reach Mia as the communication systems fail around you. The cell towers are going down, emergency calls aren\'t connecting, and you\'re experiencing the panic of being cut off from your daughter in real-time.',
      initialGreeting: [
        "I'm trying to call Mia again, but the cell towers are going down.",
        "One minute I was talking to her, the next - nothing. Complete silence when we need communication most.",
        "This is when the real panic is setting in. What would you like to know about what's happening?"
      ]
    },
    'preparedness': {
      timing: 'after',
      perspective: 'You are reflecting after finding Mia and reuniting. This is the only context where you can speak about the experience in past tense and offer lessons learned from having lived through the entire ordeal.',
      initialGreeting: [
        "After finding Mia and holding her again...",
        "I keep thinking about what we could have done differently. No family should go through what we did.",
        "There are lessons here that could save lives. What would you like to know about emergency preparedness?"
      ]
    }
  }
};
