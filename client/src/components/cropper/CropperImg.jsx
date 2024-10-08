import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';

const CropperImg = ({ img, setCroppedImage }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Callback to handle cropping after user manually selects the area
  const onCropComplete = useCallback(async (croppedAreaPixels) => {
    const croppedImageBlob = await getCroppedImg(img, croppedAreaPixels);
    setCroppedImage(croppedImageBlob);
  }, [img, setCroppedImage]);

  return (
    <div style={{ position: 'relative', width: '50%', height: '350px' }}>
      <Cropper
        image={img}
        crop={crop}
        zoom={zoom}
        aspect={4 / 5} // Aspect ratio remains controlled
        onCropChange={setCrop} // User manually changes crop
        onCropComplete={onCropComplete} // Only triggers when crop action completes
        onZoomChange={setZoom}
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default CropperImg;

// Function to get cropped image
const getCroppedImg = (imageSrc, pixelCrop) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve) => {
    image.onload = () => {
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'cropped-image.jpg', {
            type: blob.type,
            lastModified: new Date().getTime(),
          });
          resolve(file);
        }
      }, 'image/jpeg');
    };
  });
};
