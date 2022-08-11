/**
  * Being able to get the screen dimensions in any component is useful for conditionally rendering
  * based on device type as well as changing class names for styling purpose. This context is used
  * to provide this dimension information as well as classify whether the width is mobile or desktop
  */
import React, { createContext, useState, useLayoutEffect } from 'react';

// Determine device type based on width
function sizeName(width) {
  if (width <= 480) return 'Mobile'
  if (width <= 770) return 'Tablet'
  return 'Desktop'
}

// Set initial window sized on creating context
export const ViewContext = createContext({width: window.innerWidth, 
  height: window.innerHeight, 
  device: sizeName(window.innerWidth)});

export const ViewProvider = (props) => {
  const [size, setSize] = useState();

  useLayoutEffect(() => {
    function updateSize() {
      setSize({ 
        width: window.innerWidth, 
        height: window.innerHeight, 
        device: sizeName(window.innerWidth)
      });
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return <ViewContext.Provider value={ size }>{props.children}</ViewContext.Provider>;
};
