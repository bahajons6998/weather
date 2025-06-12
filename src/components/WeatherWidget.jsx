import { useTheme } from "../context/ThemeContext";
import { useWeatherData } from "../hooks/useWeatherData";
import CitySelector from "./CitySelector";
import DataVisualization from "./DataVisualization";
import ForecastList from "./ForecastList";
import WeatherDisplay from "./WeatherDisplay";
import '../styles/WeatherWidget.scss'

export default function WeatherWidget() {
    const { state, fetchWeather, changeCity, toggleUnit, clearError } = useWeatherData();

    const onChangeCity = (value) => {
        changeCity(value);
        // clearError();
        fetchWeather();
    }
    const changeunit = () => {
        toggleUnit();
        // clearError();
        fetchWeather();
    }
    const { theme } = useTheme();
    const { forecast, unit } = state;
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <CitySelector onchange={onChangeCity} changeunit={changeunit} />

            {state.error ? <p style={{ color: 'red' }}>Error: {state.error}</p> :
                <>
                    <WeatherDisplay theme={theme} state={state} />
                    <ForecastList theme={theme} state={state} />
                    <DataVisualization data={forecast} theme={theme} units={unit} />
                </>
            }
        </div>
    )
}