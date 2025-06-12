import React from 'react';
import '../styles/ForecastList.scss';
import { formatDateDayMonth } from '../utils/formatdate'
import { WiThermometer, WiThermometerExterior } from 'weather-icons-react';
import { useTranslation } from 'react-i18next';

export default function ForecastList(props) {
    const { theme, state } = props;
    const { forecast } = state;
    const { t } = useTranslation();

    return (
        <div>
            <h2 className='text-center my-5'>{t('5forecast')}</h2>
            <div className="my-4 row justify-content-around ">
                {forecast?.map((item, i) => {
                    return (
                        <div className={`py-3 my-2 forecast-card-${theme}`} key={i} >
                            <div className="mb-3 text-center">
                                <h4 className="temperature mb-0">{parseInt(item?.avgTemp)}°C</h4>
                            </div>
                            <div className='d-flex'>
                                <p className="footer mb-3"><WiThermometerExterior size={20} /> {parseInt(item?.min)}°C</p>
                                <p className="footer mb-3"><WiThermometer size={20} /> {parseInt(item?.max)}°C</p>
                            </div>
                            <div className="accent-line"></div>
                            <p className='text-center'>{formatDateDayMonth(item?.date)}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
