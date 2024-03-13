import React, { useRef, 
  // useEffect 
} from 'react';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();
  // const { center, zoom } = props;

  // useEffect(() => {
  //   const map = new window.google.maps.Map(mapRef.current, {
  //     center: center,
  //     zoom: zoom,
  //   });

  //   new window.google.maps.Marker({ position: center, map: map });
  // }, [center, zoom]);

  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}>
      <strong style={{'fontSize': '1.5rem'}}>Google Maps Embed</strong>
      <p>(excluded to conceal API key in front-end)</p>
    </div>
  );
};

export default Map;
