import React from 'react';

export default function Page() {
  return (
    <div className='grid-container'>
      <h1>Information and Contact Links</h1>
      For more information on each dataset, please click the specific links to be redirected to their webpages.
      <p>
        <h2> NLDAS-3 </h2>
        <ul>
        <li><a href = "https://github.com/NASAWaterInsight/NLDAS-3"  target="_blank" rel="noopener noreferrer"> Github </a></li>
        <li><a href = "https://ldas.gsfc.nasa.gov/nldas/v3" target="_blank" rel="noopener noreferrer"> Contact Us </a></li>
        </ul>
      </p>
      <p>
        <h2> Hydroglobe </h2>
        <ul>
        <li><a href = "https://github.com/NASAWaterInsight/HydroGlobe/discussions"  target="_blank" rel="noopener noreferrer"> Github Discussions</a></li>
        <li><a href = "https://ldas.gsfc.nasa.gov/hydroglobe" target="_blank" rel="noopener noreferrer"> Contact Us </a></li>
        </ul>
      </p>
      <p>
        <h2> Land Information System (LIS) </h2>
        <ul>
        <li><a href = "https://lis.gsfc.nasa.gov/"  target="_blank" rel="noopener noreferrer"> Software Suite</a></li>
        </ul>
      </p>     
    </div>
  );
}