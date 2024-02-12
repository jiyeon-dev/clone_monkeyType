import { useConfig } from "@/hooks/useConfig";
import { generateWords } from "@/util";
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export default function GameProvider({ children }) {
  const { config, setChangeConfig } = useConfig();
  const [onFocus, setOnFocus] = useState(false);
  const [words, setWords] = useState(generateWords(config));

  const handleCreateWords = () => {
    setWords(() => {
      return generateWords(config);
    });
  };

  const handleChangeConfig = (key, value) => {
    setChangeConfig(key, value);
    setOnFocus(false);
    handleCreateWords();
    // timer 초기화
  };

  const handleStart = () => {
    setOnFocus(true);
    // timer 시작
  };

  const handleRestart = () => {
    console.log("====handle restart");
    handleCreateWords();
    // timer 초기화
  };

  const value = {
    words,
    config,
    handleChangeConfig,
    handleRestart,
    handleStart,
    onFocus,
    setOnFocus,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("Cannot find GameContext");
  return context;
};
