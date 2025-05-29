'use client';

import React from 'react';

export function MinimalMapBlock(props) {
  console.log('=== MINIMAL MAP TEST ===');
  console.log('Map props:', props);
  
  return (
    <div style={{
      width: '100%', 
      height: '400px', 
      border: '2px solid green',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: '#f0f0f0'
    }}>
      <h3>Map Component Test</h3>
      <p><strong>Dataset ID:</strong> {props.datasetId}</p>
      <p><strong>Layer ID:</strong> {props.layerId}</p>
      <p><strong>Date Time:</strong> {props.dateTime}</p>
      <p><strong>Center:</strong> {JSON.stringify(props.center)}</p>
      <p><strong>Zoom:</strong> {props.zoom}</p>
      {props.compareDateTime && <p><strong>Compare Date:</strong> {props.compareDateTime}</p>}
      <small>This bypasses VEDA-UI MapBlock to test if the issue is in the library</small>
    </div>
  );
}
