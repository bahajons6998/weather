import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import React from 'react';
import { useTheme } from './context/ThemeContext';
import Navbar from './utils/Navbar';
import NotFound from './pages/NotFound';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18';

function App() {
  const { theme } = useTheme();
//   Light: #f8f9fa (background), #212529 (text), #0d6efd (accent)
// Dark: #212529 (background), #f8f9fa (text), #0d6efd (accent)

  const styles = {
    backgroundColor: theme === 'dark' ? '#212529' : ' #f8f9fa',
    color: theme === 'dark' ? ' #f8f9fa' : '#212529',
  }
  return (
    <div style={styles} >
      <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </I18nextProvider>
    </div >
  );
}

export default App;
