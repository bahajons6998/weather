import { useTheme } from "./utils/ThemeContext";
// const { theme } = useTheme()


const styles = {
    app: {
        backgroundColor: useTheme.theme === 'dark' ? 'black' : 'white',
        color: useTheme.theme === 'dark' ? 'white' : 'black',
    },
};
export default styles;