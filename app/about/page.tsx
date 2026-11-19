import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className='margin-top-5 margin-bottom-8'>
      <div className='grid-container'>
        
        {/* HERO / HEADER SECTION */}
        <div className='grid-row margin-bottom-5'>
          <div className='tablet:grid-col-12'>
            <h1 className='text-primary margin-bottom-2' style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
              About NASA Water Insight
            </h1>
            <p className='font-sans-lg text-base-dark line-height-sans-4' style={{ fontSize: '1.25rem', maxWidth: '800px' }}>
              Transforming NASA&apos;s unique Earth observations into actionable intelligence for managing our planet&apos;s most critical resource.
            </p>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className='grid-row grid-gap-lg'>
          
          {/* Left Column: Core Text & Capabilities */}
          <div className='tablet:grid-col-8 body-text text-normal font-sans-md line-height-sans-5'>
            
            <p className='margin-bottom-3'>
              NASA Water Insight combines NASA&apos;s unique and trusted satellite-based Earth observations with state-of-the-art land, weather, and water modeling capabilities to produce information for water resource managers, farmers, weather forecasters, private industry, and the public.
            </p>
            
            <p className='margin-bottom-3'>
              Working with community members, data is transformed into useful information products available via this open-access dashboard and our partner agencies. By observing Earth&apos;s water resources at all stages of the water cycle, we track changes in atmospheric and land surface properties, placing them in historical context for a dynamically changing world.
            </p>

            <h2 className='text-secondary-dark margin-top-5 margin-bottom-3' style={{ borderBottom: '2px solid #eee', paddingBottom: '0.5rem' }}>
              Core Capabilities
            </h2>
            <ul className='margin-bottom-4 margin-left-4' style={{ listStyleType: 'disc' }}>
              <li className='margin-bottom-2'>
                <strong>Monitoring & Forecasting:</strong> Tracking critical variables including precipitation, soil moisture, snow, groundwater, and streamflow.
              </li>
              <li className='margin-bottom-2'>
                <strong>Early Warning Systems:</strong> Providing data-driven insights to help communities prepare for droughts, floods, and wildfires.
              </li>
              <li className='margin-bottom-2'>
                <strong>Advanced Modeling:</strong> Developing next-generation datasets like NLDAS-3 and HydroGlobe to improve spatial resolution and reduce data latency.
              </li>
            </ul>
          </div>

          {/* Right Column: Action Cards & Links */}
          <div className='tablet:grid-col-4'>
            
            {/* Explore Data Card */}
            <div className='padding-3 radius-lg bg-base-lightest border border-base-lighter shadow-1 margin-bottom-4'>
              <h3 className='margin-bottom-2 text-primary' style={{ fontSize: '1.25rem' }}>Explore the Dashboard</h3>
              <p className='margin-bottom-3 text-sm text-base-dark'>
                Learn more about our products by exploring interactive Data Stories and the comprehensive Data Catalog.
              </p>
              
              <Link 
                href='/data-catalog' 
                className='display-block text-center text-bold margin-bottom-2' 
                style={{ backgroundColor: '#005ea2', color: '#fff', padding: '0.75rem 1rem', borderRadius: '4px', textDecoration: 'none' }}
              >
                View Data Catalog
              </Link>
              
              <Link 
                href='/stories' 
                className='display-block text-center text-bold' 
                style={{ border: '2px solid #005ea2', color: '#005ea2', padding: '0.75rem 1rem', borderRadius: '4px', textDecoration: 'none' }}
              >
                Read Data Stories
              </Link>
            </div>

            {/* NLDAS Link Card */}
            <div className='padding-3 radius-lg shadow-1' style={{ backgroundColor: '#112e51', color: '#fff' }}>
              <h3 className='margin-bottom-2' style={{ color: '#fff', fontSize: '1.25rem' }}>NLDAS v3 Project</h3>
              <p className='margin-bottom-3 text-sm' style={{ color: '#e0e0e0' }}>
                Discover detailed technical documentation, history, and model outputs for the North American Land Data Assimilation System.
              </p>
              <a 
                href='https://ldas.gsfc.nasa.gov/nldas/v3' 
                target='_blank' 
                rel='noopener noreferrer' 
                className='text-bold' 
                style={{ color: '#66b2ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                Visit NLDAS Website <span>↗</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}