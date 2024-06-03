import React from 'react';

const LoadingComponent: React.FC = () => {
  const loadingPhotoStyle = {
    animation: 'loading-animation 2s infinite linear',
  };

  return (
    <div className='position-absolute top-0 start-50 translate-middle-x mt-5'>
      <img id='Loading-photo' src="images/Loading.png" alt="Loading" style={loadingPhotoStyle} /> 
    </div>
  );
};

export default LoadingComponent;
