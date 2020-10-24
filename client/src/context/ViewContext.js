import React, { createContext, useState, useLayoutEffect } from 'react';

export const ViewContext = createContext({
  width: window.innerWidth,
  height: window.innerHeight,
  device: window.innerWidth <= 480 ? 'Mobile' : 'Desktop'
});

export const ViewProvider = (props) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    device: window.innerWidth <= 480 ? 'Mobile' : 'Desktop'
  });

  useLayoutEffect(() => {
    function updateSize() {
      setSize({ 
        width: window.innerWidth, 
        height: window.innerHeight, 
        device: window.innerWidth <= 480 ? 'Mobile' : 'Desktop' 
      });
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return <ViewContext.Provider value={ size }>{props.children}</ViewContext.Provider>;
};
