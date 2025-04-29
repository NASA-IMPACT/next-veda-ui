import React from 'react';

type ImageCaptionBlockProps = {
  src: string;
  alt: string;
  caption: string;
};

export function ImageCaptionBlock({
  src,
  alt,
  caption,
}: ImageCaptionBlockProps) {
  return (
    <>
      <img src={src} alt={alt} className='width-full' />
      <p className='font-body-sm line-height-body-4 margin-top-1 text-base-light'>
        {caption}
      </p>
    </>
  );
}
