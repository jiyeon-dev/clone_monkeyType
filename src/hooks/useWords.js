import { useCallback, useEffect, useState } from "react";
import { generateWords, isAllowedKeyCode } from "@/util";

/**
 * 커서 이동 (left, top 변경)
 * @param {number} activeWordIndex 활성화된 word index
 */
const handleCaret = (activeWordIndex) => {
  const caretElement = document.getElementById("caret");
  const wordDiv = document.getElementById("words");
  const currentWord = wordDiv.children[activeWordIndex];
  const currentChar = Array.from(currentWord.children)
    .reverse()
    .find(
      (child) =>
        child.classList.contains("correct") ||
        child.classList.contains("incorrect")
    );
  const wordsRect = wordDiv.getBoundingClientRect();

  if (currentChar) {
    const rect = currentChar.getBoundingClientRect();
    caretElement.style.left = `${rect.right - wordsRect.left}px`;
    caretElement.style.top = `${rect.top - wordsRect.top}px`;
  } else {
    const rect = currentWord.getBoundingClientRect();
    caretElement.style.left = `${rect.left - wordsRect.left}px`;
    caretElement.style.top = `${rect.top - wordsRect.top}px`;
  }
};

export const useWords = (config, onFocus, startTimer) => {
  const [words, setWords] = useState(generateWords(config));
  const [inputs, setInputs] = useState("");
  const [cursor, setCursor] = useState({
    word: 0,
    char: 0,
  });

  const isLastWord = words.length - 1 === cursor.word;
  const isLastCharacter = words[words.length - 1].length === cursor.char;

  const handleKeyDown = useCallback(
    (event) => {
      const { code, key } = event;
      if (!onFocus || !isAllowedKeyCode(event)) return;

      if (isLastWord && isLastCharacter) return; // 이미 다 입력한 경우
      if (code === "Space" && isLastWord) return; // 마지막 단어에서 space 입력한 경우

      startTimer();
      handleMoveCharacter(code);
      setInputs((prev) => {
        if (code === "Backspace") return prev.slice(0, prev.length - 1);
        else return prev + key;
      });
    },
    [onFocus, isLastWord, isLastCharacter, startTimer]
  );

  const handleMoveCharacter = (keyCode) => {
    setCursor((prev) => {
      let word, char;

      switch (keyCode) {
        case "Space":
          word = prev.word + 1;
          char = 0;
          break;
        case "Backspace":
          word = prev.word;
          char = prev.char - 1;
          break;
        default:
          word = prev.word;
          char = prev.char + 1;
      }

      if (char < 0) word = word - 1;
      if (word < 0) word = 0;

      return { ...prev, word, char };
    });
  };

  const handleCreateWords = useCallback(() => {
    setWords(() => {
      return generateWords(config);
    });
  }, [config]);

  // 입력 값 초기화
  const clearInputs = () => {
    handleCreateWords();
    setCursor((prev) => ({
      ...prev,
      word: 0,
      char: 0,
    }));
    setInputs(() => "");
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    handleCaret(cursor.word);
  }, [cursor]);

  return {
    words,
    inputs,
    cursor,
    clearInputs,
  };
};
