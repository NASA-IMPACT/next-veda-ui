import React from 'react';

type VideoCaptionBlockProps = {
  src: string;
  title: string;
  captionTitle: string;
  captionText: string;
};

export function VideoCaptionBlock({
  src,
  title,
  captionTitle,
  captionText,
}: VideoCaptionBlockProps) {
  return (
    <div className='width-full'>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={src}
          title={title}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        ></iframe>
      </div>
      <h3 className='font-body-sm text-bold margin-top-2'>{captionTitle}</h3>
      <p className='font-body-sm line-height-160 text-base-light letter-spacing-0 margin-0'>
        {captionText}
      </p>
    </div>
  );
}
