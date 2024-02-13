import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const THEME_PATH = import.meta.env.BASE_URL + "static/themes";

/**
 * 테마 리스트 조회
 * @returns
 */
import themesList from "@/data/theme_list.json";
const getThemeList = async () => {
  return themesList;
  // try {
  //   const response = await fetch(THEME_PATH + "/_list.json");
  //   const themesList = await response.json();
  //   return themesList;
  // } catch (error) {
  //   console.error("Failed to fetch themes list:", error);
  //   return [];
  // }
};

/**
 * 테마 설정
 */
const setTheme = async (themeName) => {
  fetch(`${THEME_PATH}/${themeName}.css`)
    .then((response) => response.text())
    .then((cssText) => {
      const style = document.createElement("style");
      style.innerHTML = cssText;
      document.head.appendChild(style);
    })
    .catch((error) => console.error("Failed to load CSS file:", error));
};

export default function ThemeProvider({ children }) {
  const [openThemeModal, setOpenThemeModal] = useState(false);
  const [themeList, setThemeList] = useState([]);
  const [currentThemeName, setCurrentThemeName] = useState("bouquet");

  useEffect(() => {
    const fetchThemesList = async () => {
      const themesList = await getThemeList();
      setThemeList(themesList);
    };

    if (themeList.length === 0) {
      fetchThemesList();
    }
  }, []);

  const handleChangeTheme = async (themeName) => {
    await setTheme(themeName);
    setCurrentThemeName(themeName);
  };

  const value = {
    themeList,
    currentThemeName,
    handleChangeTheme,
    openThemeModal,
    setOpenThemeModal,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Cannot find ThemeContext");
  return context;
};
