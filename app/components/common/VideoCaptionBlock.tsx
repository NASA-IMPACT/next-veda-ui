import React from 'react';

type VideoCaptionBlockProps = {
  src: string;
  title: string;
  captionTitle: string;
  captionText: string;
};

export function VideoEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={src}
        aria-label={title}
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
      />
    </div>
  );
}

export function VideoCaption({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h3 className='font-body-sm text-bold margin-top-2'>{title}</h3>
      <p
        className='font-body-sm line-height-body-4 text-base-light margin-0 height-card overflow-y-auto'
        tabIndex={0}
      >
        {text}
      </p>
    </>
  );
}

export function VideoCaptionBlock({
  src,
  title,
  captionTitle,
  captionText,
}: VideoCaptionBlockProps) {
  return (
    <div className='width-full'>
      <VideoEmbed src={src} title={title} />
      <VideoCaption title={captionTitle} text={captionText} />
    </div>
  );
}
