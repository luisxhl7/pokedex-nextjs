import React, { useState } from 'react';
import Image from 'next/image';
import './image3d.scss';

export const Image3D = ({image, alt, title, width, height, className}) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
  
    const handleMove = (e) => {
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      const boundingRect = e.target.getBoundingClientRect();
      const offsetX = clientX - boundingRect.left;
      const offsetY = clientY - boundingRect.top;
  
      const centerX = boundingRect.width / 2;
      const centerY = boundingRect.height / 2;
  
      const newRotateX = (offsetY - centerY) / centerX * 30;
      const newRotateY = (offsetX - centerX) / centerY * -30;
  
      setRotateX(newRotateX);
      setRotateY(newRotateY);
    };
  
    const handleLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

  return (
    <div className="container">
      <div
        className="image-3d"
        style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleMove}
        onTouchEnd={handleLeave}
      >
        <Image
            src={image}
            alt={alt}
            title={title}
            width={width}
            height={height}
            className={className}
        />
      </div>
    </div>
  );
}

