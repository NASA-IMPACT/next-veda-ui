'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationContext {
  coords: [number, number];
  label: string;
  description?: string;
}

interface MiniMapProps {
  context: string;
  className?: string;
}

// Location contexts for Jonah's story
const locationContexts: Record<string, LocationContext> = {
  'drought': { 
    coords: [-156.6747, 20.8738], 
    label: 'Lahaina Resort Area',
    description: 'Where Jonah worked when drought conditions were building'
  },
  'fire': { 
    coords: [-156.6789, 20.8751], 
    label: 'Front Street',
    description: 'Historic downtown where the fire spread rapidly'
  },
  'search': { 
    coords: [-156.6723, 20.8729], 
    label: 'Residential Area',
    description: 'Neighborhoods where Jonah searched for Mia'
  },
  'communication': { 
    coords: [-156.6756, 20.8745], 
    label: 'Central Lahaina',
    description: 'Where cell towers failed during the emergency'
  },
  'preparedness': { 
    coords: [-156.6734, 20.8742], 
    label: 'Safe Meeting Point',
    description: 'Where Jonah and Mia eventually reunited'
  }
};

export default function MiniMap({ context, className }: MiniMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  const locationContext = locationContexts[context] || locationContexts['search'];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize the map - only if token is available
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      console.error('NEXT_PUBLIC_MAPBOX_TOKEN not found in environment variables');
      return;
    }
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: locationContext.coords,
      zoom: 13,
      interactive: false, // Make it static since it's just for context
      attributionControl: false
    });

    // Add a marker for Jonah's location
    marker.current = new mapboxgl.Marker({
      color: '#e74c3c',
      scale: 0.8
    })
      .setLngLat(locationContext.coords)
      .addTo(map.current);

    // Clean up on unmount
    return () => {
      if (marker.current) {
        marker.current.remove();
      }
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  // Update marker position when context changes
  useEffect(() => {
    if (map.current && marker.current) {
      marker.current.setLngLat(locationContext.coords);
      map.current.setCenter(locationContext.coords);
    }
  }, [context, locationContext.coords]);

  return (
    <div className={className}>
      <div 
        ref={mapContainer} 
        style={{ 
          width: '100%', 
          height: '200px',
          borderRadius: '8px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }} 
      />
      <div style={{
        marginTop: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center'
      }}>
        📍 {locationContext.label}
      </div>
      {locationContext.description && (
        <div style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          marginTop: '4px',
          fontStyle: 'italic'
        }}>
          {locationContext.description}
        </div>
      )}
    </div>
  );
}
