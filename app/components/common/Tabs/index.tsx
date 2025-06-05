'use client';
import React, { useState, useRef, useEffect } from 'react';

import './tabs.scss';

export interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTabIndex?: number;
  className?: string;
}

/**
 * Accessible, SSR-compatible Tabs component using USWDS utility classes.
 */
const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabIndex = 0,
  className = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultTabIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    tabRefs.current[selectedIndex]?.focus();
  }, [selectedIndex]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;
    let newIndex = selectedIndex;

    if (key === 'ArrowRight') {
      newIndex = (selectedIndex + 1) % tabs.length;
      e.preventDefault();
      setSelectedIndex(newIndex);
    } else if (key === 'ArrowLeft') {
      newIndex = (selectedIndex - 1 + tabs.length) % tabs.length;
      e.preventDefault();
      setSelectedIndex(newIndex);
    } else if (key === 'Home') {
      newIndex = 0;
      e.preventDefault();
      setSelectedIndex(newIndex);
    } else if (key === 'End') {
      newIndex = tabs.length - 1;
      e.preventDefault();
      setSelectedIndex(newIndex);
    }
  };

  const handleTabClick = (idx: number) => {
    setSelectedIndex(idx);
  };

  return (
    <div className={`display-flex flex-column ${className}`.trim()}>
      <div
        role='tablist'
        aria-orientation='horizontal'
        className={'tabs display-flex flex-row'}
        onKeyDown={onKeyDown}
      >
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            id={`tab-${tab.id}`}
            role='tab'
            aria-selected={selectedIndex === idx}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={selectedIndex === idx ? 0 : -1} // only the selected (active) tab is in the page Tab sequence!
            className={[
              'usa-button',
              'usa-button--unstyled',
              'padding-x-205',
              'padding-y-105',
              selectedIndex === idx ? 'text-white' : 'text-base-light',
              'font-ui-2xs',
              'text-no-underline',
              'border-1px',
              'border-black',
              'radius-top-md',
              'display-flex',
              'flex-align-center',
              selectedIndex === idx ? 'bg-primary-vivid' : 'bg-ink',
            ].join(' ')}
            onClick={() => handleTabClick(idx)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {tabs.map((tab, idx) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role='tabpanel'
          aria-labelledby={`tab-${tab.id}`}
          hidden={selectedIndex !== idx}
          tabIndex={0}
          className='bg-ink padding-4'
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
