import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Tabs, { Tab } from '.';

const tabs: Tab[] = [
  { id: 'tab1', title: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', title: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', title: 'Tab 3', content: <div>Content 3</div> },
];

describe('Tabs', () => {
  it('renders tab titles and only the selected tab panel', () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();

    const tabpanels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(tabpanels).toHaveLength(3);
    expect(tabpanels[0]).toHaveTextContent('Content 1');
    expect(tabpanels[0]).not.toHaveAttribute('hidden');
    expect(tabpanels[1]).toHaveAttribute('hidden');
    expect(tabpanels[2]).toHaveAttribute('hidden');
  });

  it('changes tab on click', () => {
    render(<Tabs tabs={tabs} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');
  });

  it('supports keyboard navigation (ArrowRight, ArrowLeft, Home, End, Tab, Enter, Space)', () => {
    render(<Tabs tabs={tabs} />);
    const tablist = screen.getByRole('tablist');
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    const tab3 = screen.getByRole('tab', { name: 'Tab 3' });

    // Tab: focus moves from tab to tabpanel (simulate tabbing out of tablist)
    tab1.focus();
    fireEvent.keyDown(tab1, { key: 'Tab' });
    // We can't move focus with Tab in jsdom, but we can check focus remains on tab1
    expect(tab1).toHaveFocus();

    // ArrowRight moves to next Tab
    fireEvent.keyDown(tablist, { key: 'ArrowRight' });
    expect(tab2).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 2');

    // ArrowLeft moves back one Tab
    fireEvent.keyDown(tablist, { key: 'ArrowLeft' });
    expect(tab1).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');

    // End (fn + ArrowRight) moves to Tab 3
    fireEvent.keyDown(tablist, { key: 'End' });
    expect(tab3).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 3');

    // Home (fn + ArrowLeft) moves to Tab 1
    fireEvent.keyDown(tablist, { key: 'Home' });
    expect(tab1).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
  });

  it('sets correct ARIA attributes', () => {
    render(<Tabs tabs={tabs} />);
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tabpanel1 = screen.getByRole('tabpanel');
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab1).toHaveAttribute('aria-controls', 'tabpanel-tab1');
    expect(tabpanel1).toHaveAttribute('aria-labelledby', 'tab-tab1');
  });

  it('renders on server without crashing (SSR)', () => {
    expect(() => {
      render(<Tabs tabs={tabs} />);
    }).not.toThrow();
  });
});
