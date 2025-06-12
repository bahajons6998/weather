import { Select, Space } from 'antd';
import { useTheme } from '../context/ThemeContext';
import { useState, } from 'react';
import { useWeatherData } from '../hooks/useWeatherData';
import { useTranslation } from 'react-i18next';
import '../styles/CitySelector.scss'; 

export default function CitySelector(props) {
  const { state, findCities } = useWeatherData();
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const { onchange } = props;
  const { t } = useTranslation();

  const handleSearch = (value) => {
    setSearchValue(value);
    findCities(value);
  };

  const handleChange = (value, option) => {
    const selectedCityName = option && option.originalName ? option.originalName : value.split(',')[0].trim();
    onchange(selectedCityName);
    setSearchValue('');
    findCities('');
  };
  const options = [
    {
      value: 'London',
      label: 'London',
    },
    {
      value: 'New York',
      label: 'New York',
    },
    {
      value: 'Tokyo',
      label: 'Tokyo',
    },
    {
      value: 'Sydney',
      label: 'Sydney',
    },
    {
      value: 'Cairo',
      label: 'Cairo',
    },
  ];

  return (
    <div className='cityselector'>
      <div className='mx-auto'>
        <Space.Compact style={{ width: '100%' }}>
          <Select defaultValue="London" options={options} onChange={onchange} />
          <Select
            showSearch
            value={searchValue || undefined}
            placeholder={t('input')}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={state.loadingCities ? 'Loading...' : null}
            options={state.citySuggestions.map(city => ({
              value: city.value,
              label: city.label,
              originalName: city.originalName
            }))}
            className={`input-${theme}`}
          />

        </Space.Compact>
      </div>
    </div>
  );
}