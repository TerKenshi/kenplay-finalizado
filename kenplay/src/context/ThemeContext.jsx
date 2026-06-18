import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const FONT_SIZES = [14, 16, 18, 20, 22];
const DEFAULT_SIZE_INDEX = 1; // 16px

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [fontIndex, setFontIndex] = useState(DEFAULT_SIZE_INDEX);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SIZES[fontIndex] + 'px';
  }, [fontIndex]);

  function toggle() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  function increasFont() {
    setFontIndex(prev => Math.min(prev + 1, FONT_SIZES.length - 1));
  }

  function decreaseFont() {
    setFontIndex(prev => Math.max(prev - 1, 0));
  }

  const canIncrease = fontIndex < FONT_SIZES.length - 1;
  const canDecrease = fontIndex > 0;
  const currentFontSize = FONT_SIZES[fontIndex];

  return (
    <ThemeContext.Provider value={{ theme, toggle, increasFont, decreaseFont, canIncrease, canDecrease, currentFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
