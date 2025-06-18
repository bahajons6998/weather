import { Modal, Select, Radio, InputNumber } from "antd";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useWeatherData } from "../hooks/useWeatherData";
import { fetchWeatherData } from "../services/fetch";

export default function SettingsPanel(props) {
    const { setIsOpen, isOpen } = props;
    const { changeUnit, changeRefreshInterval,toggleUnit, state } = useWeatherData();
    const { theme, toggleTheme } = useTheme();
    const { t, i18n } = useTranslation();


    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    function changeunit(unit) {
        // changeUnit(unit);
        toggleUnit()
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
    };


    return (
        <div>
            {console.log(state)}
            <Modal
                title={t('settings')}
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <div className="mb-3">
                    <label className="form-label d-block">{t('language')}</label>
                    <Select
                        className="me-2"
                        defaultValue={i18n.language}
                        style={{ width: 120 }}
                        onChange={changeLanguage}
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'uz', label: 'Uzbek' },
                        ]}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label d-block">{t('theme')}</label>
                    <button className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'} text-uppercase`} type="button" onClick={toggleTheme}>
                        {theme === 'dark' ? t('light') : t('dark')}
                    </button>
                </div>
                {/* <div className="mb-3">
                    <label className="form-label d-block">{t('temperature_unit')}</label>
                    <Select
                        className="me-2"
                        defaultValue={state.unit}
                        style={{ width: 120 }}
                        onChange={changeunit}
                        options={[
                            { value: 'metric', label: 'Celsius' },
                            { value: 'imperial', label: 'Fahrenheit' },
                        ]}
                    />
                    'metric' = Celsius, 'imperial' = Fahrenheit
                </div>
                <div className="mb-3">
                    <label className="form-label d-block">{t('refresh_interval_sec')}</label>
                    <InputNumber min={5} defaultValue={refreshInterval} onChange={(value) => setRefreshInterval(value)} />
                </div> */}
            </Modal>
        </div>
    )
}