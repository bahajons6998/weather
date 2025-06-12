import React from 'react';
import './Home.style.scss'
import WeatherWidget from '../components/WeatherWidget';

function WeatherDisplay() {
  return (
    <div className='container-md'>
      <WeatherWidget />
    </div>
  );
}
export default WeatherDisplay;