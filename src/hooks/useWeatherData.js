import { useReducer, useEffect, useCallback } from 'react'; 
import { throttle } from '../utils/throttle';
import { fetchWeatherData, searchCities } from '../services/fetch'; 

const initialState = {
  city: 'London',
  unit: 'metric', // 'metric' = Celsius, 'imperial' = Fahrenheit
  currentWeather: null,
  forecast: [],
  citySuggestions: [], 
  loadingCities: false, 
  error: null,
};

const actions = {
  FETCH_WEATHER: 'FETCH_WEATHER',
  CHANGE_CITY: 'CHANGE_CITY',
  TOGGLE_UNIT: 'TOGGLE_UNIT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  FETCH_CITY_SUGGESTIONS_START: 'FETCH_CITY_SUGGESTIONS_START',
  FETCH_CITY_SUGGESTIONS_SUCCESS: 'FETCH_CITY_SUGGESTIONS_SUCCESS',
  FETCH_CITY_SUGGESTIONS_FAILURE: 'FETCH_CITY_SUGGESTIONS_FAILURE',
};

function weatherReducer(state, action) {
  switch (action.type) {
    case actions.FETCH_WEATHER:
      return {
        ...state,
        currentWeather: action.payload.currentWeather,
        forecast: action.payload.forecast,
        error: null,
      };
    case actions.CHANGE_CITY:
      return { ...state, city: action.payload };
    case actions.TOGGLE_UNIT:
      return { ...state, unit: state.unit === 'metric' ? 'imperial' : 'metric' };
    case actions.SET_ERROR:
      return { ...state, error: action.payload };
    case actions.CLEAR_ERROR:
      return { ...state, error: null };
    case actions.FETCH_CITY_SUGGESTIONS_START:
      return { ...state, loadingCities: true, citySuggestions: [] };
    case actions.FETCH_CITY_SUGGESTIONS_SUCCESS:
      return { ...state, loadingCities: false, citySuggestions: action.payload };
    case actions.FETCH_CITY_SUGGESTIONS_FAILURE:
      return { ...state, loadingCities: false, error: action.payload };
    default:
      return state;
  }
}

// function convertTemp(value, unit) {
//   if (unit === 'imperial') {
//     return value * 9 / 5 + 32;
//   } else {
//     return (value - 32) * 5 / 9;
//   }
// }

function calculateDailyAverages(list) {
  const grouped = {};

  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item.main.temp);
  });

  return Object.entries(grouped).map(([date, temps]) => {
    const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    return { date, avgTemp: avg, min, max, };
  });
}

export function useWeatherData() {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const fetchWeather = async (city = state.city, unit = state.unit) => {
    try {
      const data = await fetchWeatherData(city, unit);

      if (data.cod !== '200') {
        throw new Error(data.message || 'API Error');
      }

      const currentWeather = {
        temp: data.list[0].main.temp,
        description: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon,
        time: data.list[0].dt_txt,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
      };

      const forecast = calculateDailyAverages(data.list);

      dispatch({ type: actions.FETCH_WEATHER, payload: { currentWeather, forecast } });
    } catch (err) {
      dispatch({ type: actions.SET_ERROR, payload: err.message });
    }
  };

  const throttledFetch = throttle(fetchWeather, 1000);

  useEffect(() => {
    throttledFetch(state.city, state.unit);
  }, [state.city, state.unit]);

  const changeCity = (newCity) => {
    dispatch({ type: actions.CHANGE_CITY, payload: newCity });
  };

  const toggleUnit = () => {
    dispatch({ type: actions.TOGGLE_UNIT });
  };

  const clearError = () => {
    dispatch({ type: actions.CLEAR_ERROR });
  };

  const findCities = async (query) => {
    if (!query || query.length < 2) { // Optional: minimum query length
      dispatch({ type: actions.FETCH_CITY_SUGGESTIONS_SUCCESS, payload: [] });
      return;
    }
    dispatch({ type: actions.FETCH_CITY_SUGGESTIONS_START });
    try {
      const cities = await searchCities(query);
      dispatch({ type: actions.FETCH_CITY_SUGGESTIONS_SUCCESS, payload: cities });
    } catch (err) {
      dispatch({ type: actions.FETCH_CITY_SUGGESTIONS_FAILURE, payload: err.message });
    }
  };

  const debouncedFindCities = useCallback(throttle(findCities, 500), []);

  return {
    state,
    fetchWeather: throttledFetch,
    changeCity,
    toggleUnit,
    clearError,
    findCities: debouncedFindCities,
  };
}
