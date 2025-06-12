import { Link } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    const { theme, toggleTheme } = useTheme()
    return (
        <div className="container-md">
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <Link to='/'>
                        <img src="./logo.png" alt="logo" width={80} />
                    </Link>
                </div>
                <form className="d-flex align-items-center" role="search">
                    <Select
                        className="me-2"
                        defaultValue="English"
                        style={{ width: 120 }}
                        onChange={changeLanguage}
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'uz', label: 'Uzbek' },
                        ]}
                    />
                    <button className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'} text-uppercase`} type="button" onClick={toggleTheme}>
                        {theme === 'dark' ? t('light') : t('dark')}
                    </button>
                </form>
            </div>
        </div>

    );
}