import { Link } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import SettingsPanel from "../components/SettingsPanel";
import { useState } from "react";

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
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

                <button className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-light'} text-uppercase`} type="button" onClick={()=>setIsOpen(true)}>
                    {t("settings")}
                </button>
            </div>
            <SettingsPanel setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>

    );
}