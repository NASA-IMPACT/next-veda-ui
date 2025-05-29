'use client';

import React from 'react';
import { useDataStore } from 'app/store/providers/data';
import { MapBlock, ScrollytellingBlock } from '@lib';
import { transformToVedaData } from 'app/content/utils/data';

export function DeepDebugMapBlock(props) {
  const { datasets } = useDataStore();
  
  console.log('=== DEEP DEBUG MAP BLOCK ===');
  console.log('Raw props received:', JSON.stringify(props, null, 2));
  console.log('Raw datasets from store:', datasets);
  
  // Check if we can find the specific dataset
  const targetDataset = datasets?.find(d => d.metadata?.id === props.datasetId);
  console.log('Target dataset found:', targetDataset);
  
  if (targetDataset) {
    console.log('Target dataset layers:', targetDataset.metadata?.layers);
    const targetLayer = targetDataset.metadata?.layers?.find(l => l.id === props.layerId);
    console.log('Target layer found:', targetLayer);
  }
  
  const transformed = transformToVedaData(datasets);
  console.log('Transformed data structure:', Object.keys(transformed));
  console.log('Transformed target dataset:', transformed[props.datasetId]);
  
  // Check the specific dataset in transformed data
  if (transformed[props.datasetId]) {
    console.log('Target dataset in transformed:', JSON.stringify(transformed[props.datasetId], null, 2));
  }
  
  // Let's try to create a minimal dataset structure that might work
  const safeTransformed = {};
  if (datasets && datasets.length > 0) {
    datasets.forEach(dataset => {
      if (dataset.metadata && dataset.metadata.id) {
        safeTransformed[dataset.metadata.id] = {
          data: {
            ...dataset.metadata,
            // Ensure layers have required properties
            layers: dataset.metadata.layers?.map(layer => ({
              ...layer,
              // Add any missing properties that might be required
              parentDataset: { id: dataset.metadata.id },
              // Ensure compare object exists if referenced
              compare: layer.compare || null
            })) || []
          }
        };
      }
    });
  }
  
  console.log('Safe transformed data:', safeTransformed);
  console.log('About to render MapBlock with safe data');
  
  try {
    return <MapBlock {...props} datasets={safeTransformed} />;
  } catch (error) {
    console.error('MapBlock error:', error);
    console.error('Error stack:', error.stack);
    return (
      <div style={{padding: '20px', border: '2px solid red', color: 'red', fontSize: '12px'}}>
        <h4>MapBlock Error</h4>
        <p><strong>Error:</strong> {error.message}</p>
        <p><strong>Dataset ID:</strong> {props.datasetId}</p>
        <p><strong>Layer ID:</strong> {props.layerId}</p>
        <details>
          <summary>Full Error Stack</summary>
          <pre>{error.stack}</pre>
        </details>
      </div>
    );
  }
};
