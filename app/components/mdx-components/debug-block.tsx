'use client';

import React from 'react';
import { useDataStore } from 'app/store/providers/data';
import { MapBlock, ScrollytellingBlock } from '@lib';
import { transformToVedaData } from 'app/content/utils/data';

export function DebugMapBlock(props) {
  const { datasets } = useDataStore();
  
  console.log('=== DEBUG MAP BLOCK ===');
  console.log('Props:', props);
  console.log('Raw datasets from store:', datasets);
  console.log('Datasets length:', datasets?.length);
  console.log('Datasets type:', typeof datasets);
  
  if (!datasets) {
    console.log('❌ No datasets found in store');
    return <div style={{padding: '20px', border: '2px solid red', color: 'red'}}>
      ERROR: No datasets found in data store. Check console for details.
    </div>;
  }
  
  try {
    const transformed = transformToVedaData(datasets);
    console.log('Transformed datasets:', transformed);
    console.log('Transformed keys:', Object.keys(transformed));
    
    if (Object.keys(transformed).length === 0) {
      console.log('❌ No datasets after transformation');
      return <div style={{padding: '20px', border: '2px solid orange', color: 'orange'}}>
        ERROR: No datasets after transformation. Raw datasets exist but transformation failed.
      </div>;
    }
    
    console.log('✅ About to render MapBlock with datasets');
    return <MapBlock {...props} datasets={transformed} />;
    
  } catch (error) {
    console.error('❌ Error in DebugMapBlock:', error);
    return <div style={{padding: '20px', border: '2px solid red', color: 'red'}}>
      ERROR: {error.message}
    </div>;
  }
};

export function DebugScrollyTellingBlock(props) {
  const { datasets } = useDataStore();
  console.log('=== DEBUG SCROLLY BLOCK ===');
  console.log('Raw datasets:', datasets);
  
  if (!datasets) {
    return <div>ERROR: No datasets for ScrollyTelling</div>;
  }
  
  const transformed = transformToVedaData(datasets);
  return <ScrollytellingBlock {...props} datasets={transformed} />;
}
