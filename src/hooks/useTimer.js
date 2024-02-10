import { useRef, useState } from "react";

export const useTimer = (initialValue) => {
  const intervalRef = useRef();
  const [timer, setTimer] = useState(initialValue);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1000;
        } else {
          clearInterval(intervalRef.current);
        }
      });
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
  };

  return { timer, startTimer, resetTimer };
};
