'use client'
import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/UseContext';

const MapPage = () => {
  const mapContainer = useRef(null);
  const { userId  } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    // Initialize MapLibre GL map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [9.0820, 8.6753], // Initial center
      zoom: 5, // Initial zoom level
      pitch: 50, // Initial pitch
    });

    // Add map controls
    map.addControl(new maplibregl.ScaleControl(), 'bottom-right');
    map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');
    map.addControl(new maplibregl.GeolocateControl(), 'bottom-right');

    // Cleanup function
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  return (
    <>
    <div className='md:flex justify-between block w-[100%]'>

    <div className='rounded-3xl border border-green-400'
        ref={mapContainer}
        style={{
          width: '100%',
          height: '25rem', // Set your desired height
          margin: 'auto', // Add margin if needed
        }}
      ></div>

      <div className='md:w-[50%] w-[100%] rounded-3xl border border-green-400'>
        <p className='font-bold text-center text-[1.5rem] mt-5'>Avaialable Parking spaces</p>
        <p className='mt-5 text-center text-red-500'>No available car parks today!</p>
      </div>

    </div>
    <button className='bg-green-400 text-white p-3 rounded-2xl hover:scale-110 transition mt-4 m-auto block' onClick={() => {router.push(`/profile/${userId}`)}}>Back to profile</button>
      
    </>
  );
};

export default MapPage;

