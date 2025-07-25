// components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center  min-h-[80vh]">
      <div className="w-14 h-14 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
