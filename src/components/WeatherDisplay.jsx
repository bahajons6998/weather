import { useTranslation } from 'react-i18next';
import '../styles/WeatherDisplay.scss'
export default function WeatherDisplay(props) {
    const { t } = useTranslation();
    const { theme, state } = props;
    const { currentWeather } = state;
    return (
        <div>
            <h1>{t('currentweather')}</h1>
            <div className={`card-${theme} align-items-center my-2 mx-0 p-3 row`}>
                <div className="col-6">
                    <h3 className='mb-0' >{state?.city}</h3>
                    <p className='temperature'>{parseInt(currentWeather?.temp)}C&#176;</p>
                    <div className="accent-line"></div>
                    <p className='footer'>RealFeel® 30C&#176;</p>
                </div>
                <div className="col-6">
                    <img src={`https://openweathermap.org/img/wn/${currentWeather?.icon}@2x.png`} alt="" />
                    <p className="description text-uppercase">{currentWeather?.description}</p>
                </div>
            </div>
        </div>
    )
}