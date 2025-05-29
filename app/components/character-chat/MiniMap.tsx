'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MiniMapProps {
  coordinates?: [number, number];
  area?: string;
  description?: string;
  characterName?: string;
  colorTheme?: string;
  className?: string;
}

export default function MiniMap({ 
  coordinates = [-118.1041, 34.1966], // Default to LA fires location
  area = "Story Location", 
  description,
  characterName = "Character",
  colorTheme = "#e74c3c",
  className 
}: MiniMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const fullscreenMapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const fullscreenMap = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const fullscreenMarker = useRef<mapboxgl.Marker | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize the map - only if token is available
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!mapboxToken) {
      console.error('NEXT_PUBLIC_MAPBOX_TOKEN not found in environment variables');
      return;
    }
    
    mapboxgl.accessToken = mapboxToken;
    
    // Initialize mini map with full interactivity
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: coordinates,
      zoom: 13,
      interactive: true,
      attributionControl: false
    });

    // Add a marker for the character's location
    marker.current = new mapboxgl.Marker({
      color: colorTheme,
      scale: 0.8
    })
      .setLngLat(coordinates)
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

  // Update marker position when coordinates change
  useEffect(() => {
    if (map.current && marker.current) {
      marker.current.setLngLat(coordinates);
      map.current.setCenter(coordinates);
    }
    if (fullscreenMap.current && fullscreenMarker.current) {
      fullscreenMarker.current.setLngLat(coordinates);
      fullscreenMap.current.setCenter(coordinates);
    }
  }, [coordinates]);

  // Initialize fullscreen map when entering fullscreen mode
  useEffect(() => {
    if (isFullscreen && fullscreenMapContainer.current && !fullscreenMap.current) {
      // Small delay to ensure container is rendered
      setTimeout(() => {
        const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!mapboxToken || !fullscreenMapContainer.current) return;
        
        mapboxgl.accessToken = mapboxToken;
        
        // Get current state from mini map if available
        const currentCenter = map.current ? map.current.getCenter() : coordinates;
        const currentZoom = map.current ? map.current.getZoom() : 13;
        
        fullscreenMap.current = new mapboxgl.Map({
          container: fullscreenMapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-v9',
          center: [currentCenter.lng, currentCenter.lat],
          zoom: currentZoom,
          interactive: true,
          attributionControl: true // Show attribution in fullscreen
        });

        // Add navigation controls (zoom in/out buttons) to fullscreen map
        const nav = new mapboxgl.NavigationControl({
          showCompass: false, // Hide compass, keep only zoom buttons
          showZoom: true
        });
        fullscreenMap.current.addControl(nav, 'top-right');

        // Add marker to fullscreen map
        fullscreenMarker.current = new mapboxgl.Marker({
          color: colorTheme,
          scale: 1.2 // Slightly larger in fullscreen
        })
          .setLngLat(coordinates)
          .addTo(fullscreenMap.current);
      }, 100);
    }

    // Clean up fullscreen map when exiting fullscreen
    if (!isFullscreen && fullscreenMap.current) {
      if (fullscreenMarker.current) {
        fullscreenMarker.current.remove();
        fullscreenMarker.current = null;
      }
      fullscreenMap.current.remove();
      fullscreenMap.current = null;
    }
  }, [isFullscreen, coordinates, colorTheme]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    if (isFullscreen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isFullscreen]);

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenClose = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className={className}>
        <div style={{ position: 'relative' }}>
          <div 
            ref={mapContainer} 
            style={{ 
              width: '100%', 
              height: '200px',
              borderRadius: '8px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer'
            }} 
          />
          
          {/* Fullscreen button overlay */}
          <button
            onClick={handleFullscreenToggle}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 8px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              zIndex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
            }}
            title="Expand map to fullscreen"
          >
            ⛶ Expand
          </button>
        </div>
        
        <div style={{
          marginTop: '8px',
          fontSize: '14px',
          fontWeight: '600',
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center'
        }}>
          📍 {area}
        </div>
        {description && (
          <div style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            marginTop: '4px',
            fontStyle: 'italic'
          }}>
            {description}
          </div>
        )}
      </div>

      {/* Fullscreen Map Modal - Use portal to render at document root */}
      {isFullscreen && typeof window !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => {
            // Close if clicking on the backdrop
            if (e.target === e.currentTarget) {
              handleFullscreenClose();
            }
          }}
        >
          {/* Fullscreen Map Header */}
          <div style={{
            padding: '16px 24px',
            background: 'rgba(248, 249, 250, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(222, 226, 230, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#2c3e50' }}>
                📍 {area}
              </h3>
              {description && (
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6c757d', fontStyle: 'italic' }}>
                  {description}
                </p>
              )}
            </div>
            
            <button
              onClick={handleFullscreenClose}
              style={{
                background: 'rgba(108, 117, 125, 0.1)',
                border: '1px solid rgba(108, 117, 125, 0.3)',
                fontSize: '16px',
                cursor: 'pointer',
                color: '#6c757d',
                padding: '8px 12px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(108, 117, 125, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(108, 117, 125, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(108, 117, 125, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(108, 117, 125, 0.3)';
              }}
              title="Minimize map (ESC)"
            >
              ⇱ Minimize
            </button>
          </div>

          {/* Fullscreen Map Container */}
          <div style={{ flex: 1, position: 'relative', minHeight: '400px' }}>
            <div 
              ref={fullscreenMapContainer} 
              style={{ 
                width: '100%', 
                height: '100%',
                minHeight: '400px'
              }} 
            />
          </div>

          {/* Instructions Footer */}
          <div style={{
            padding: '12px 24px',
            background: 'rgba(248, 249, 250, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(222, 226, 230, 0.5)',
            textAlign: 'center',
            fontSize: '12px',
            color: '#868e96'
          }}>
            🗺️ Interactive map - Zoom, pan, and explore {characterName}'s location | Press ESC or click X to close
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
