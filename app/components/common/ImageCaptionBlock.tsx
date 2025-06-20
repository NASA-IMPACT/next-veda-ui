import Image from 'next/image';
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
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        style={{ width: '100%', height: 'auto' }}
        unoptimized
      />
      <p className='font-body-sm line-height-body-4 margin-top-1 text-base-light'>
        {caption}
      </p>
    </>
  );
}
