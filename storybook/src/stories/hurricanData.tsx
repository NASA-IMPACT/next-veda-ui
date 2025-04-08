export const mockData = [
  {
    metadata: {
      id: 'hls_events',
      name: 'Harmonized Landsat Sentinel-2 (Selected Events)',
      description:
        '30-meter resolution harmonized Landsat 8/9 and Sentinel-2A/B data products',
      usage: [
        {
          url: 'https://nasa-impact.github.io/veda-docs/notebooks/quickstarts/hls-visualization.html',
          label: 'View example notebook',
          title:
            'Multi-Band Visualization Preview for Harmonized Landsat Sentinel-2 (HLS)',
        },
        {
          url: 'https://nasa-veda.2i2c.cloud/hub/user-redirect/git-pull?repo=https://github.com/NASA-IMPACT/veda-docs&urlpath=lab/tree/veda-docs/notebooks/quickstarts/hls-visualization.ipynb&branch=main',
          label: 'Run example notebook',
          title:
            'Multi-Band Visualization Preview for Harmonized Landsat Sentinel-2 (HLS)',
        },
      ],
      media: {
        src: '/images/dataset/hls-events-ej--dataset-cover.png',
        alt: '2017 harmonized Landsat 8 shortwave infrared (SWIR) false color composite image that provides enhanced contrast to detect flood extent.',
        author: { name: 'NASA', url: 'https://nasa.gov/' },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'environmental_justice', name: 'Environmental Justice' },
            { id: 'disasters', name: 'Disasters' },
          ],
        },
        { name: 'Source', values: [{ id: 'hls', name: 'HLS' }] },
      ],
      infoDescription:
        '<p>Input data from Landsat 8/9 and Sentinel-2A/B is reprojected and Sentinel-2 data adjusted so that the output data products, HLSL30 (Landsat-derived) and HLSS30 (Sentinel-2-derived) can be used interchangeably. The harmonization of the Optical Land Imager (OLI) on Landsat 8/9 and Multispectral Imager (MSI) on Sentinel-2A/B increases the time series density of plot-scale observations such that data is available every 2-4 days over a given location.</p>',
      layers: [
        {
          id: 'hls-l30-002-ej',
          stacCol: 'hls-l30-002-ej-reprocessed',
          name: 'HLS Landsat SWIR',
          type: 'raster',
          description: 'Harmonized Landsat SWIR: small subset near Puerto Rico',
          zoomExtent: [4, 20],
          compare: {
            datasetId: 'hls_events',
            layerId: 'hls-l30-002-ej',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Daily',
            unit: 'N/A',
          },
        },
        {
          id: 'hls-s30-002-ej',
          stacCol: 'hls-s30-002-ej-reprocessed',
          name: 'HLS Sentinel-2 SWIR',
          type: 'raster',
          description:
            'Harmonized Sentinel-2 SWIR: small subset near Puerto Rico',
          zoomExtent: [4, 20],
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Daily',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'hls-events',
  },
  {
    metadata: {
      id: 'lahaina-fire',
      name: 'Lahaina Fire',
      description:
        'HLS (BAIS2 and SWIR FalseColor composites) and Landsat-8 thermal imagery supporting the Lahaina, HI Wildfire Story',
      media: {
        src: '/images/dataset/nighttime-lights--dataset-cover.jpg',
        alt: 'Wildfire erupting over Lahaina, HI, August 8, 2023',
        author: {
          name: 'Matthew Thayer/AP',
          url: 'https://www.sfchronicle.com/travel/article/hawaii-fire-maui-lahaina-18289213.php',
        },
      },
      taxonomy: [
        { name: 'Topics', values: [{ id: 'eis', name: 'EIS' }] },
        { name: 'Source', values: [{ id: 'uah', name: 'UAH' }] },
      ],
      infoDescription:
        '<p>On August 8th, 2023, a devastating wildfire rapidly spread through the city of Lahaina, Hawai’i, which is located on the island of Maui and home to over 13,000 residents. This destructive wildfire was initially ignited by a downed powerline on Lahainaluna Road and was later fueled by intense wind gusts that persisted throughout the day. The National Weather Service recorded wind gusts as high as 67 mph in the area, contributing to the rapid spread of the wildfire across much of Lahaina during the afternoon hours of August 8th.</p>',
      layers: [
        {
          id: 'hls-bais2-v2',
          stacCol: 'hls-bais2-v2',
          name: 'BAIS-2 Burned Area',
          type: 'raster',
          description:
            'Experimental burned-area calculation from the HLS scene taken on August 13,2023 over Lahaina, HI',
          zoomExtent: [4, 20],
          compare: {
            datasetId: 'lahaina-fire',
            layerId: 'landsat-nighttime-thermal',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'dd LLL yyyy')}`;        \n}\n",
          },
          legend: {
            type: 'gradient',
            min: 'Low Burn Confidence',
            max: 'High Burn Confidence',
            stops: [
              '#313695',
              '#74add1',
              '#e0f3f8',
              '#fee090',
              '#f46d43',
              '#a50026',
            ],
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Hawaii',
            temporalResolution: 'Annual',
            unit: 'N/A',
          },
        },
        {
          id: 'hls-swir-falsecolor-composite',
          stacCol: 'hls-swir-falsecolor-composite',
          name: 'HLS SWIR FalseColor Composite',
          type: 'raster',
          description:
            'HLS falsecolor composite imagery using S30 Bands 12, 8A, and 4, over Lahaina, HI.',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'lahaina-fire',
            layerId: 'hls-swir-falsecolor-composite',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'dd LLL yyyy')}`;        \n}\n",
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Hawaii',
            temporalResolution: 'Annual',
            unit: 'N/A',
          },
        },
        {
          id: 'landsat-nighttime-thermal',
          stacCol: 'landsat-nighttime-thermal',
          name: 'Landsat-8 Thermal Band',
          type: 'raster',
          description:
            'Nighttime Thermal band from Landsat-8 on August 8, 2023 shows the extent of the ongoing Lahaina Fire.',
          initialDatetime: 'newest',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'lahaina-fire',
            layerId: 'hls-bais2-v2',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'dd LLL yyyy')}`;        \n}\n    \n",
          },
          legend: {
            type: 'gradient',
            min: 'No Active Fire',
            max: 'Active Fire',
            stops: ['#08041d', '#1f0a46', '#52076c', '#f57c16', '#f7cf39'],
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Hawaii',
            temporalResolution: 'Annual',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'lahaina-fire',
  },
  {
    metadata: {
      id: 'nighttime-lights-ej',
      name: 'Nighttime Lights supporting Environmental Justice',
      description:
        'High definition nighttime lights can be used to identify regions impacted by natural disaster and/or power outages to better inform disaster response efforts.',
      media: {
        src: '/images/dataset/nighttime-lights-ej--dataset-cover-neworleans.jpeg',
        alt: 'Nighttime lights for New Orleans, LA on August 31, 2021.',
        author: {
          name: 'NASA Earth Observatory',
          url: 'https://appliedsciences.nasa.gov/our-impact/news/satellite-observes-power-outages-new-orleans',
        },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'environmental_justice', name: 'Environmental Justice' },
          ],
        },
        {
          name: 'Source',
          values: [{ id: 'black_marble', name: 'Black Marble' }],
        },
      ],
      infoDescription:
        '<p>Nightlights data are collected by the <a href="https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/viirs/">Visible Infrared Radiometer Suite (VIIRS) Day/Night Band (DNB)</a> on the Suomi-National Polar-Orbiting Partnership (Suomi-NPP) platform, a joint National Oceanic and Atmospheric Administration (NOAA) and NASA satellite. The images are produced by <a href="https://blackmarble.gsfc.nasa.gov/">NASA’s Black Marble</a> products suite. All data are calibrated daily, corrected, and validated with ground measurements for science-ready analysis.</p>',
      layers: [
        {
          id: 'nightlights-hd-1band',
          stacCol: 'nightlights-hd-1band',
          name: 'Nightlights EJ',
          type: 'raster',
          description:
            'High definition nighttime lights can be used to identify regions impacted by natural disaster and/or power outages to better inform disaster response efforts.',
          zoomExtent: [7, 20],
          compare: {
            datasetId: 'nighttime-lights-ej',
            layerId: 'nightlights-hd-1band',
          },
          info: {
            source: 'NOAA & NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Monthly',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'nighttime-lights-ej',
  },
  {
    metadata: {
      featured: true,
      id: 'nighttime-lights',
      name: 'Nighttime Lights',
      description:
        'During the COVID-19 pandemic, researchers are using night light observations to track variations in energy use, migration, and transportation in response to social distancing and lockdown measures.',
      media: {
        src: '/images/dataset/nighttime-lights--dataset-cover.jpg',
        alt: 'Satellite image of Earth at night.',
        author: {
          name: 'NASA Earth Observatory',
          url: 'https://earthobservatory.nasa.gov/images/90008/night-light-maps-open-up-new-applications',
        },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'covid_19', name: 'Covid 19' },
            { id: 'agriculture', name: 'Agriculture' },
          ],
        },
        {
          name: 'Sector',
          values: [{ id: 'electricity', name: 'Electricity' }],
        },
        { name: 'Producer', values: [{ id: 'nasa', name: 'NASA' }] },
        { name: 'Gas Emission', values: [{ id: 'dos', name: 'DOS' }] },
      ],
      layers: [
        {
          id: 'nightlights-hd-monthly',
          stacCol: 'nightlights-hd-monthly',
          name: 'Nightlights Monthly',
          type: 'raster',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales semper risus, suscipit varius diam facilisis non.',
          zoomExtent: [4, 16],
          legend: {
            type: 'gradient',
            min: 'Less',
            max: 'More',
            stops: ['#08041d', '#1f0a46', '#52076c', '#f57c16', '#f7cf39'],
          },
        },
      ],
    },
    slug: 'nighttime-lights',
  },
  {
    metadata: {
      id: 'no2',
      name: 'Nitrogen Dioxide',
      featured: true,
      sourceExclusive: 'Mock',
      description:
        'Since the outbreak of the novel coronavirus, atmospheric concentrations of nitrogen dioxide have changed by as much as 60% in some regions.',
      usage: [
        {
          url: 'https://nasa-impact.github.io/veda-documentation/timeseries-stac-api.html',
          label: 'Static notebook',
          title: 'Time series using STAC API statistics endpoints',
        },
        {
          url: 'https://daskhub.veda.smce.nasa.gov/hub/user-redirect/git-pull?repo=https%3A%2F%2Fgithub.com%2Fnasa-impact%2Fveda-documentation&urlpath=lab%2Ftree%2Fveda-documentation%2Ftimeseries-stac-api.ipynb&branch=main',
          label: 'SMCE DaskHub',
          title: 'Time series using STAC API statistics endpoints',
        },
        {
          url: 'https://github.com/NASA-IMPACT/veda-docs',
          label: 'All the docs for the site',
          title: 'Documentaion repo',
        },
        {
          url: 'https://d36s2ep3ahcq5b.cloudfront.net/browseui/index.html#ch4_inverse_flux',
          label: 'Data Browser',
          title: 'Download data',
        },
      ],
      media: {
        src: '/images/dataset/no2--dataset-cover.jpg',
        alt: 'Power plant shooting steam at the sky.',
        author: {
          name: 'Mick Truyts',
          url: 'https://unsplash.com/photos/x6WQeNYJC1w',
        },
      },
      taxonomy: [
        { name: 'Grade', values: [{ id: 'research', name: 'Research' }] },
        { name: 'Uncertainty', values: [{ id: 'low', name: 'Low' }] },
        {
          name: 'Topics',
          values: [
            { id: 'covid_19', name: 'Covid 19' },
            { id: 'agriculture', name: 'Agriculture' },
            { id: 'air_quality', name: 'Air Quality' },
          ],
        },
        {
          name: 'Sector',
          values: [{ id: 'electricity', name: 'Electricity' }],
        },
        { name: 'Producer', values: [{ id: 'nasa', name: 'NASA' }] },
        { name: 'Gas Emission', values: [{ id: 'dos', name: 'DOS' }] },
        { name: 'Source', values: [{ id: 'mock', name: 'Mock' }] },
      ],
      infoDescription:
        '<ul><li>Temporal Extent: January 2000 - December 2021</li><li>Temporal Resolution: Monthly</li><li>Spatial Extent: Global</li><li>Spatial Resolution: 1 km x 1 km</li><li>Data Units: Tons of carbon per 1 km x 1 km cell (monthly total)</li><li>Data Type: Research</li><li>Data Latency: Updated annually, following the release of an updated <a href="https://www.bp.com/en/global/corporate/energy-economics.html">BP Statistical Review of World Energy report</a></li></ul>',
      layers: [
        {
          id: 'no2-monthly',
          stacCol: 'no2-monthly',
          name: 'No2 PT',
          media: {
            src: '/images/dataset/no2--dataset-cover.jpg',
            alt: 'Placeholder Image',
          },
          type: 'raster',
          projection: { id: 'polarNorth' },
          bounds: [-10, 36, -5, 42],
          description:
            'Levels in 10¹⁵ molecules cm⁻². Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'nighttime-lights',
            layerId: 'nightlights-hd-monthly',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          legend: {
            unit: { label: 'Molecules cm3' },
            type: 'gradient',
            min: 'Less',
            max: 'More',
            stops: [
              '#99c5e0',
              '#f9eaa9',
              '#f7765d',
              '#c13b72',
              '#461070',
              '#050308',
            ],
          },
          analysis: { metrics: ['min', 'max', 'non-existent'] },
          info: {
            source: 'NASA',
            spatialExtent: 'Global',
            temporalResolution: 'Monthly',
            unit: '10¹⁵ molecules cm⁻²',
          },
        },
        {
          id: 'no2-monthly-2',
          stacCol: 'no2-monthly',
          name: 'No2 US',
          bounds: [-124, 29, -65, 49],
          type: 'raster',
          description:
            'Levels in 10¹⁵ molecules cm⁻². Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.',
          basemapId: 'dark',
          zoomExtent: [0, 20],
          legend: {
            unit: { label: 'Molecules cm3' },
            type: 'gradient',
            min: 'Less',
            max: 'More',
            stops: [
              '#99c5e0',
              '#f9eaa9',
              '#f7765d',
              '#c13b72',
              '#461070',
              '#050308',
            ],
          },
          analysis: { exclude: true },
        },
        {
          id: 'no2-monthly-diff',
          stacCol: 'no2-monthly-diff',
          name: "No2 (Diff) - let's make this title reaaaaaaly long",
          type: 'raster',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales semper risus, suscipit varius diam facilisis non.',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'no2',
            layerId: 'no2-monthly-diff',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          legend: {
            unit: { label: 'molecules/cm3' },
            type: 'gradient',
            min: '-3934857984753',
            max: '3348573489573',
            stops: ['#3A88BD', '#C9E0ED', '#E4EEF3', '#FDDCC9', '#DD7059'],
          },
        },
      ],
    },
    slug: 'no2',
  },
  {
    metadata: {
      id: 'ps_blue_tarp_detections',
      name: 'Blue tarp detections',
      description:
        'Machine learning generated blue tarp detections using Planetscope 3-band RGB imagery',
      media: {
        src: '/images/dataset/ps-bluetarp--dataset-cover.jpg',
        alt: 'Blue tarp detections for Jefferson Parish, LA on February 12, 2022',
        author: { name: 'NASA', url: null },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'environmental_justice', name: 'Environmental Justice' },
            { id: 'disasters', name: 'Disasters' },
          ],
        },
        { name: 'Source', values: [{ id: 'planet', name: 'Planet' }] },
      ],
      infoDescription:
        '<p>Planetscope provides 3-band RGB imagery at 3-meter ground resolution whichcan support building-scale analysis of the land surface. In the aftermath ofnatural disasters associated with high wind speeds, homes with damaged roofstypically are covered with blue tarps to protect the interior of the homefrom further damage. Using machine learning, blue tarps can be detected fromthe Planetscope imagery using pre-event cloud free images to detect bluepixels and potential impacts after a natural disaster.</p>',
      layers: [
        {
          id: 'blue-tarp-detection',
          stacCol: 'blue-tarp-detection',
          name: 'Blue tarp detections',
          type: 'raster',
          description:
            'machine learning generated blue tarp detections. Includes copyrighted material of Planet. All rights reserved.',
          zoomExtent: [14, 20],
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Sub-Annual',
            unit: 'N/A',
          },
        },
        {
          id: 'blue-tarp-planetscope',
          stacCol: 'blue-tarp-planetscope',
          name: 'Planetscope input RGB imagery used for blue tarp detection',
          type: 'raster',
          description:
            'Planetscope input RGB imagery used for blue tarp detection. Includes copyrighted material of Planet. All rights reserved.',
          zoomExtent: [14],
          compare: {
            datasetId: 'ps_blue_tarp_detections',
            layerId: 'blue-tarp-detection',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  if (dateFns && datetime && compareDatetime) return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Sub-Annual',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'ps_blue_tarp_detections',
  },
];

export const initialDataset = [
  {
    metadata: {
      id: 'hls_events',
      name: 'Harmonized Landsat Sentinel-2 (Selected Events)',
      description:
        '30-meter resolution harmonized Landsat 8/9 and Sentinel-2A/B data products',
      usage: [
        {
          url: 'https://nasa-impact.github.io/veda-docs/notebooks/quickstarts/hls-visualization.html',
          label: 'View example notebook',
          title:
            'Multi-Band Visualization Preview for Harmonized Landsat Sentinel-2 (HLS)',
        },
        {
          url: 'https://nasa-veda.2i2c.cloud/hub/user-redirect/git-pull?repo=https://github.com/NASA-IMPACT/veda-docs&urlpath=lab/tree/veda-docs/notebooks/quickstarts/hls-visualization.ipynb&branch=main',
          label: 'Run example notebook',
          title:
            'Multi-Band Visualization Preview for Harmonized Landsat Sentinel-2 (HLS)',
        },
      ],
      media: {
        src: '/images/dataset/hls-events-ej--dataset-cover.png',
        alt: '2017 harmonized Landsat 8 shortwave infrared (SWIR) false color composite image that provides enhanced contrast to detect flood extent.',
        author: { name: 'NASA', url: 'https://nasa.gov/' },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'environmental_justice', name: 'Environmental Justice' },
            { id: 'disasters', name: 'Disasters' },
          ],
        },
        { name: 'Source', values: [{ id: 'hls', name: 'HLS' }] },
      ],
      infoDescription:
        '<p>Input data from Landsat 8/9 and Sentinel-2A/B is reprojected and Sentinel-2 data adjusted so that the output data products, HLSL30 (Landsat-derived) and HLSS30 (Sentinel-2-derived) can be used interchangeably. The harmonization of the Optical Land Imager (OLI) on Landsat 8/9 and Multispectral Imager (MSI) on Sentinel-2A/B increases the time series density of plot-scale observations such that data is available every 2-4 days over a given location.</p>',
      layers: [
        {
          id: 'hls-l30-002-ej',
          stacCol: 'hls-l30-002-ej-reprocessed',
          name: 'HLS Landsat SWIR',
          type: 'raster',
          description: 'Harmonized Landsat SWIR: small subset near Puerto Rico',
          zoomExtent: [4, 20],
          compare: {
            datasetId: 'hls_events',
            layerId: 'hls-l30-002-ej',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Daily',
            unit: 'N/A',
          },
        },
        {
          id: 'hls-s30-002-ej',
          stacCol: 'hls-s30-002-ej-reprocessed',
          name: 'HLS Sentinel-2 SWIR',
          type: 'raster',
          description:
            'Harmonized Sentinel-2 SWIR: small subset near Puerto Rico',
          zoomExtent: [4, 20],
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Daily',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'hls-events',
  },
  {
    metadata: {
      id: 'lahaina-fire',
      name: 'Lahaina Fire',
      description:
        'HLS (BAIS2 and SWIR FalseColor composites) and Landsat-8 thermal imagery supporting the Lahaina, HI Wildfire Story',
      media: {
        src: '/images/dataset/nighttime-lights--dataset-cover.jpg',
        alt: 'Wildfire erupting over Lahaina, HI, August 8, 2023',
        author: {
          name: 'Matthew Thayer/AP',
          url: 'https://www.sfchronicle.com/travel/article/hawaii-fire-maui-lahaina-18289213.php',
        },
      },
      taxonomy: [
        { name: 'Topics', values: [{ id: 'eis', name: 'EIS' }] },
        { name: 'Source', values: [{ id: 'uah', name: 'UAH' }] },
      ],
      infoDescription:
        '<p>On August 8th, 2023, a devastating wildfire rapidly spread through the city of Lahaina, Hawai’i, which is located on the island of Maui and home to over 13,000 residents. This destructive wildfire was initially ignited by a downed powerline on Lahainaluna Road and was later fueled by intense wind gusts that persisted throughout the day. The National Weather Service recorded wind gusts as high as 67 mph in the area, contributing to the rapid spread of the wildfire across much of Lahaina during the afternoon hours of August 8th.</p>',
      layers: [
        {
          id: 'hls-bais2-v2',
          stacCol: 'hls-bais2-v2',
          name: 'BAIS-2 Burned Area',
          type: 'raster',
          description:
            'Experimental burned-area calculation from the HLS scene taken on August 13,2023 over Lahaina, HI',
          zoomExtent: [4, 20],
          compare: {
            datasetId: 'lahaina-fire',
            layerId: 'landsat-nighttime-thermal',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'dd LLL yyyy')}`;        \n}\n",
          },
          legend: {
            type: 'gradient',
            min: 'Low Burn Confidence',
            max: 'High Burn Confidence',
            stops: [
              '#313695',
              '#74add1',
              '#e0f3f8',
              '#fee090',
              '#f46d43',
              '#a50026',
            ],
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Hawaii',
            temporalResolution: 'Annual',
            unit: 'N/A',
          },
        },
        {
          id: 'hls-swir-falsecolor-composite',
          stacCol: 'hls-swir-falsecolor-composite',
          name: 'HLS SWIR FalseColor Composite',
          type: 'raster',
          description:
            'HLS falsecolor composite imagery using S30 Bands 12, 8A, and 4, over Lahaina, HI.',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'lahaina-fire',
            layerId: 'hls-swir-falsecolor-composite',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'dd LLL yyyy')}`;        \n}\n",
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Hawaii',
            temporalResolution: 'Annual',
            unit: 'N/A',
          },
        },
        {
          id: 'landsat-nighttime-thermal',
          stacCol: 'landsat-nighttime-thermal',
          name: 'Landsat-8 Thermal Band',
          type: 'raster',
          description:
            'Nighttime Thermal band from Landsat-8 on August 8, 2023 shows the extent of the ongoing Lahaina Fire.',
          initialDatetime: 'newest',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'lahaina-fire',
            layerId: 'hls-bais2-v2',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'dd LLL yyyy')}`;        \n}\n    \n",
          },
          legend: {
            type: 'gradient',
            min: 'No Active Fire',
            max: 'Active Fire',
            stops: ['#08041d', '#1f0a46', '#52076c', '#f57c16', '#f7cf39'],
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Hawaii',
            temporalResolution: 'Annual',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'lahaina-fire',
  },
  {
    metadata: {
      id: 'nighttime-lights-ej',
      name: 'Nighttime Lights supporting Environmental Justice',
      description:
        'High definition nighttime lights can be used to identify regions impacted by natural disaster and/or power outages to better inform disaster response efforts.',
      media: {
        src: '/images/dataset/nighttime-lights-ej--dataset-cover-neworleans.jpeg',
        alt: 'Nighttime lights for New Orleans, LA on August 31, 2021.',
        author: {
          name: 'NASA Earth Observatory',
          url: 'https://appliedsciences.nasa.gov/our-impact/news/satellite-observes-power-outages-new-orleans',
        },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'environmental_justice', name: 'Environmental Justice' },
          ],
        },
        {
          name: 'Source',
          values: [{ id: 'black_marble', name: 'Black Marble' }],
        },
      ],
      infoDescription:
        '<p>Nightlights data are collected by the <a href="https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/viirs/">Visible Infrared Radiometer Suite (VIIRS) Day/Night Band (DNB)</a> on the Suomi-National Polar-Orbiting Partnership (Suomi-NPP) platform, a joint National Oceanic and Atmospheric Administration (NOAA) and NASA satellite. The images are produced by <a href="https://blackmarble.gsfc.nasa.gov/">NASA’s Black Marble</a> products suite. All data are calibrated daily, corrected, and validated with ground measurements for science-ready analysis.</p>',
      layers: [
        {
          id: 'nightlights-hd-1band',
          stacCol: 'nightlights-hd-1band',
          name: 'Nightlights EJ',
          type: 'raster',
          description:
            'High definition nighttime lights can be used to identify regions impacted by natural disaster and/or power outages to better inform disaster response efforts.',
          zoomExtent: [7, 20],
          compare: {
            datasetId: 'nighttime-lights-ej',
            layerId: 'nightlights-hd-1band',
          },
          info: {
            source: 'NOAA & NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Monthly',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'nighttime-lights-ej',
  },
  {
    metadata: {
      featured: true,
      id: 'nighttime-lights',
      name: 'Nighttime Lights',
      description:
        'During the COVID-19 pandemic, researchers are using night light observations to track variations in energy use, migration, and transportation in response to social distancing and lockdown measures.',
      media: {
        src: '/images/dataset/nighttime-lights--dataset-cover.jpg',
        alt: 'Satellite image of Earth at night.',
        author: {
          name: 'NASA Earth Observatory',
          url: 'https://earthobservatory.nasa.gov/images/90008/night-light-maps-open-up-new-applications',
        },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'covid_19', name: 'Covid 19' },
            { id: 'agriculture', name: 'Agriculture' },
          ],
        },
        {
          name: 'Sector',
          values: [{ id: 'electricity', name: 'Electricity' }],
        },
        { name: 'Producer', values: [{ id: 'nasa', name: 'NASA' }] },
        { name: 'Gas Emission', values: [{ id: 'dos', name: 'DOS' }] },
      ],
      layers: [
        {
          id: 'nightlights-hd-monthly',
          stacCol: 'nightlights-hd-monthly',
          name: 'Nightlights Monthly',
          type: 'raster',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales semper risus, suscipit varius diam facilisis non.',
          zoomExtent: [4, 16],
          legend: {
            type: 'gradient',
            min: 'Less',
            max: 'More',
            stops: ['#08041d', '#1f0a46', '#52076c', '#f57c16', '#f7cf39'],
          },
        },
      ],
    },
    slug: 'nighttime-lights',
  },
  {
    metadata: {
      id: 'no2',
      name: 'Nitrogen Dioxide',
      featured: true,
      sourceExclusive: 'Mock',
      description:
        'Since the outbreak of the novel coronavirus, atmospheric concentrations of nitrogen dioxide have changed by as much as 60% in some regions.',
      usage: [
        {
          url: 'https://nasa-impact.github.io/veda-documentation/timeseries-stac-api.html',
          label: 'Static notebook',
          title: 'Time series using STAC API statistics endpoints',
        },
        {
          url: 'https://daskhub.veda.smce.nasa.gov/hub/user-redirect/git-pull?repo=https%3A%2F%2Fgithub.com%2Fnasa-impact%2Fveda-documentation&urlpath=lab%2Ftree%2Fveda-documentation%2Ftimeseries-stac-api.ipynb&branch=main',
          label: 'SMCE DaskHub',
          title: 'Time series using STAC API statistics endpoints',
        },
        {
          url: 'https://github.com/NASA-IMPACT/veda-docs',
          label: 'All the docs for the site',
          title: 'Documentaion repo',
        },
        {
          url: 'https://d36s2ep3ahcq5b.cloudfront.net/browseui/index.html#ch4_inverse_flux',
          label: 'Data Browser',
          title: 'Download data',
        },
      ],
      media: {
        src: '/images/dataset/no2--dataset-cover.jpg',
        alt: 'Power plant shooting steam at the sky.',
        author: {
          name: 'Mick Truyts',
          url: 'https://unsplash.com/photos/x6WQeNYJC1w',
        },
      },
      taxonomy: [
        { name: 'Grade', values: [{ id: 'research', name: 'Research' }] },
        { name: 'Uncertainty', values: [{ id: 'low', name: 'Low' }] },
        {
          name: 'Topics',
          values: [
            { id: 'covid_19', name: 'Covid 19' },
            { id: 'agriculture', name: 'Agriculture' },
            { id: 'air_quality', name: 'Air Quality' },
          ],
        },
        {
          name: 'Sector',
          values: [{ id: 'electricity', name: 'Electricity' }],
        },
        { name: 'Producer', values: [{ id: 'nasa', name: 'NASA' }] },
        { name: 'Gas Emission', values: [{ id: 'dos', name: 'DOS' }] },
        { name: 'Source', values: [{ id: 'mock', name: 'Mock' }] },
      ],
      infoDescription:
        '<ul><li>Temporal Extent: January 2000 - December 2021</li><li>Temporal Resolution: Monthly</li><li>Spatial Extent: Global</li><li>Spatial Resolution: 1 km x 1 km</li><li>Data Units: Tons of carbon per 1 km x 1 km cell (monthly total)</li><li>Data Type: Research</li><li>Data Latency: Updated annually, following the release of an updated <a href="https://www.bp.com/en/global/corporate/energy-economics.html">BP Statistical Review of World Energy report</a></li></ul>',
      layers: [
        {
          id: 'no2-monthly',
          stacCol: 'no2-monthly',
          name: 'No2 PT',
          media: {
            src: '/images/dataset/no2--dataset-cover.jpg',
            alt: 'Placeholder Image',
          },
          type: 'raster',
          projection: { id: 'polarNorth' },
          bounds: [-10, 36, -5, 42],
          description:
            'Levels in 10¹⁵ molecules cm⁻². Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'nighttime-lights',
            layerId: 'nightlights-hd-monthly',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          legend: {
            unit: { label: 'Molecules cm3' },
            type: 'gradient',
            min: 'Less',
            max: 'More',
            stops: [
              '#99c5e0',
              '#f9eaa9',
              '#f7765d',
              '#c13b72',
              '#461070',
              '#050308',
            ],
          },
          analysis: { metrics: ['min', 'max', 'non-existent'] },
          info: {
            source: 'NASA',
            spatialExtent: 'Global',
            temporalResolution: 'Monthly',
            unit: '10¹⁵ molecules cm⁻²',
          },
        },
        {
          id: 'no2-monthly-2',
          stacCol: 'no2-monthly',
          name: 'No2 US',
          bounds: [-124, 29, -65, 49],
          type: 'raster',
          description:
            'Levels in 10¹⁵ molecules cm⁻². Darker colors indicate higher nitrogen dioxide (NO₂) levels associated and more activity. Lighter colors indicate lower levels of NO₂ and less activity.',
          basemapId: 'dark',
          zoomExtent: [0, 20],
          legend: {
            unit: { label: 'Molecules cm3' },
            type: 'gradient',
            min: 'Less',
            max: 'More',
            stops: [
              '#99c5e0',
              '#f9eaa9',
              '#f7765d',
              '#c13b72',
              '#461070',
              '#050308',
            ],
          },
          analysis: { exclude: true },
        },
        {
          id: 'no2-monthly-diff',
          stacCol: 'no2-monthly-diff',
          name: "No2 (Diff) - let's make this title reaaaaaaly long",
          type: 'raster',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales semper risus, suscipit varius diam facilisis non.',
          zoomExtent: [0, 20],
          compare: {
            datasetId: 'no2',
            layerId: 'no2-monthly-diff',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          legend: {
            unit: { label: 'molecules/cm3' },
            type: 'gradient',
            min: '-3934857984753',
            max: '3348573489573',
            stops: ['#3A88BD', '#C9E0ED', '#E4EEF3', '#FDDCC9', '#DD7059'],
          },
        },
      ],
    },
    slug: 'no2',
  },
  {
    metadata: {
      id: 'ps_blue_tarp_detections',
      name: 'Blue tarp detections',
      description:
        'Machine learning generated blue tarp detections using Planetscope 3-band RGB imagery',
      media: {
        src: '/images/dataset/ps-bluetarp--dataset-cover.jpg',
        alt: 'Blue tarp detections for Jefferson Parish, LA on February 12, 2022',
        author: { name: 'NASA', url: null },
      },
      taxonomy: [
        {
          name: 'Topics',
          values: [
            { id: 'environmental_justice', name: 'Environmental Justice' },
            { id: 'disasters', name: 'Disasters' },
          ],
        },
        { name: 'Source', values: [{ id: 'planet', name: 'Planet' }] },
      ],
      infoDescription:
        '<p>Planetscope provides 3-band RGB imagery at 3-meter ground resolution whichcan support building-scale analysis of the land surface. In the aftermath ofnatural disasters associated with high wind speeds, homes with damaged roofstypically are covered with blue tarps to protect the interior of the homefrom further damage. Using machine learning, blue tarps can be detected fromthe Planetscope imagery using pre-event cloud free images to detect bluepixels and potential impacts after a natural disaster.</p>',
      layers: [
        {
          id: 'blue-tarp-detection',
          stacCol: 'blue-tarp-detection',
          name: 'Blue tarp detections',
          type: 'raster',
          description:
            'machine learning generated blue tarp detections. Includes copyrighted material of Planet. All rights reserved.',
          zoomExtent: [14, 20],
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Sub-Annual',
            unit: 'N/A',
          },
        },
        {
          id: 'blue-tarp-planetscope',
          stacCol: 'blue-tarp-planetscope',
          name: 'Planetscope input RGB imagery used for blue tarp detection',
          type: 'raster',
          description:
            'Planetscope input RGB imagery used for blue tarp detection. Includes copyrighted material of Planet. All rights reserved.',
          zoomExtent: [14],
          compare: {
            datasetId: 'ps_blue_tarp_detections',
            layerId: 'blue-tarp-detection',
            mapLabel:
              "({ dateFns, datetime, compareDatetime }) => {\n  if (dateFns && datetime && compareDatetime) return `${dateFns.format(datetime, 'LLL yyyy')} VS ${dateFns.format(compareDatetime, 'LLL yyyy')}`;\n}\n",
          },
          info: {
            source: 'NASA',
            spatialExtent: 'Puerto Rico',
            temporalResolution: 'Sub-Annual',
            unit: 'N/A',
          },
        },
      ],
    },
    slug: 'ps_blue_tarp_detections',
  },
];
