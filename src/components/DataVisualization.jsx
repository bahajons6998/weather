import React from 'react';
import '../styles/DataVisualization.scss';
import { formatDateDayMonth } from '../utils/formatdate';
import { useTranslation } from 'react-i18next';

export default function TempForecastChart(props) {
  const { theme, units, data } = props;
  const { t } = useTranslation();

  const convertedData = data.map(data => ({
    ...data,
    temp: units === 'metric' ? Math.floor(data.avgTemp) : Math.round(data.avgTemp * 9 / 5 + 32),
  }));

  
  
  const width = 350;
  const height = 200;
  const padding = 40;

  
  const maxTemp = Math.max(...convertedData.map(d => d.temp));
  const minTemp = Math.min(...convertedData.map(d => d.temp));
  const tempRange = maxTemp - minTemp || 1; // Avoid division by zero
  const xStep = (width - 2 * padding) / (convertedData.length - 1);
  const yScale = (height - 2 * padding) / tempRange;

  
  const points = convertedData
    .map((data, i) => {
      const x = padding + i * xStep;
      const y = height - padding - (data.temp - minTemp) * yScale;
      return `${x},${y}`;
    })
    .join(' ');

  
  let colors = {
    background: theme === 'light' ? '#f8f9fa' : '#212529',
    text: theme === 'dark' ? '#f8f9fa' : '#212529',
    accent: '#0d6efd',
    grid: theme === 'light' ? '#dee2e6' : '#495057',
  };

  return (
    <div className={`chart-container ${theme}`}>
      <h3 className='text-center'>{t('5daysvisual')}</h3>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      
        {Array.from({ length: 5 }).map((_, i) => {
          const y = padding + (i * (height - 2 * padding)) / 4;
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke={colors.grid}
              strokeWidth="1"
            />
          );
        })}


        <polyline
          points={points}
          fill="none"
          stroke={colors.accent}
          strokeWidth="2"
        />


        {convertedData.map((data, i) => {
          const x = padding + i * xStep;
          const y = height - padding - (data.temp - minTemp) * yScale;

          return (
            <g key={i}>
              
              <circle
                cx={x}
                cy={y}
                r="4"
                fill={colors.accent}
              />
              
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                fill={colors.text}
                fontSize="8"
              >
                {data.temp}{units === 'metric' ? '°C' : '°F'}
              </text>
              
              <text
                x={x}
                y={height - padding + 20}
                textAnchor="middle"
                fill={colors.text}
                fontSize="12"
              >
                {formatDateDayMonth(data.date)}
              </text>
            </g>
          );
        })}


        {Array.from({ length: 5 }).map((_, i) => {
          const temp = Math.round(maxTemp - (i * tempRange) / 4);
          const y = padding + (i * (height - 2 * padding)) / 4;
          return (
            <text
              key={i}
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              fill={colors.text}
              fontSize="12"
            >
              {temp}{units === 'metric' ? '°C' : '°F'}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
