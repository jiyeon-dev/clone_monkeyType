import { useRef, useState } from "react";

export const useTimer = (initialValue) => {
  const intervalRef = useRef();
  const [timer, setTimer] = useState(initialValue);

  // 타이머 시간 변경
  const handleChangeTimer = (time) => {
    setTimer(() => time);
  };

  // 타이머 시작
  const startTimer = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(intervalRef.current);
        }
      });
    }, 1000);
  };

  // 타이머 멈추고, 시간 초기화
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    handleChangeTimer(initialValue);
  };

  return { timer, startTimer, resetTimer, handleChangeTimer };
};
