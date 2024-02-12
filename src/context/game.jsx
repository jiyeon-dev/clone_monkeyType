import { useConfig } from "@/hooks/useConfig";
import { useTimer } from "@/hooks/useTimer";
import { useWords } from "@/hooks/useWords";
import { calculateMetrics } from "@/util";
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export default function GameProvider({ children }) {
  const { config, setChangeConfig } = useConfig();
  const { timer, startTimer, resetTimer, handleChangeTimer } = useTimer(
    config.timer
  );
  const [onFocus, setOnFocus] = useState(false);
  const { words, inputs, cursor, clearInputs } = useWords(
    config,
    onFocus,
    startTimer
  );
  //
  const [isGameOver, setIsGameOver] = useState(false);
  const [result, setResult] = useState({
    accuracy: 0,
    wpm: 0,
    cpm: 0,
    correctWords: 0,
    incorrectChars: 0,
  });

  const handleChangeConfig = (key, value) => {
    if (!value) return;
    setChangeConfig(key, value);
    setOnFocus(false);
    clearInputs();
    if (key === "timer") handleChangeTimer(value);
  };

  const handleRestart = () => {
    clearInputs();
    resetTimer();
    setIsGameOver(false);
  };

  // 게임 종료
  if (timer === 0) {
    setOnFocus(false);
    setResult(calculateMetrics(words, inputs.split(" "), config.timer));
    setIsGameOver(true);
    clearInputs();
    resetTimer();
  }

  const value = {
    words,
    config,
    handleChangeConfig,
    handleRestart,
    startTimer,
    onFocus,
    setOnFocus,
    timer,
    inputs,
    cursor,
    isGameOver,
    result,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("Cannot find GameContext");
  return context;
};
