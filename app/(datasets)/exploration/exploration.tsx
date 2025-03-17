'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExplorationAndAnalysis,
  DatasetSelectorModal,
  useTimelineDatasetAtom,
  externalDatasetsAtom,
} from 'app/lib';
import { useSetAtom } from 'jotai';
import useElementHeight from '@utils/hooks/use-element-height';
import Providers from '../providers';

export default function ExplorationAnalysis({ datasets }: { datasets: any }) {
  const setExternalDatasets = useSetAtom(externalDatasetsAtom);

  setExternalDatasets(datasets);

  const [timelineDatasets, setTimelineDatasets] = useTimelineDatasetAtom();
  const [datasetModalRevealed, setDatasetModalRevealed] = useState(
    !timelineDatasets.length,
  );

  const openModal = () => {
    setDatasetModalRevealed(true);
  };
  const closeModal = () => {
    setDatasetModalRevealed(false);
  };
  // On landing, measure the height of Header and fill up the rest of the space with E&A
  const offsetHeight = useElementHeight({ queryToSelect: 'header' });

  return (
    <Providers datasets={datasets}>
      <div
        id='ea-wrapper'
        // The below styles adjust the E&A page to match what we have on earthdata.nasa.gov
        // E&A is supposed to fill up whichever space given
        // Adjusting the container's height so the page with E&A doesn't overflow.
        style={{
          width: '100%',
          height: `calc(100vh - ${offsetHeight}px)`,
        }}
      >
        <DatasetSelectorModal
          revealed={datasetModalRevealed}
          close={closeModal}
          timelineDatasets={timelineDatasets}
          setTimelineDatasets={setTimelineDatasets}
          datasets={datasets}
        />
        <ExplorationAndAnalysis
          datasets={timelineDatasets}
          setDatasets={setTimelineDatasets}
          openDatasetsSelectionModal={openModal}
        />
      </div>
    </Providers>
  );
}
