import React from 'react';

interface Iprops {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const Image: React.FC<Iprops> = ({
  src,
  alt,
  width,
  height,
  fill,
  objectFit,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${fill ? 'absolute inset-0' : ''} w-full h-full`}
      style={Object.assign(
        {},
        objectFit ? { objectFit: objectFit } : {},
        width ? { width: `${width}px` } : {},
        height ? { height: `${height}px` } : {},
      )}
    />
  );
};

export default Image;
