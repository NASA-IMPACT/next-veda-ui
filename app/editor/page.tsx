'use client';
import dynamic from 'next/dynamic';
import * as React from 'react';
//uncomment below to fix toolbar 
// import '@mdxeditor/editor/style.css';

const MdxEditor = dynamic(
  () => import('node_modules/mdx-editor-test'), // Adjust 'MdxEditor' if the default export is something else
  {
    ssr: false, // This is the crucial part
    loading: () => <p>Loading MDX Editor...</p>, // Optional: Add a loading state
  },
);

export default function Page() {
  return (
    <div>
      <div id='mdx-editor-wrapper'>
        <MdxEditor />
      </div>
    </div>
  );
}
