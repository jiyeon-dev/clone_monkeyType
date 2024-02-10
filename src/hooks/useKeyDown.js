import { useCallback, useEffect, useState } from "react";
import { isAllowedKeyCode } from "@/util";

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

export const useKeyDown = (focused) => {
  const [inputs, setInputs] = useState("");
  const [cursor, setCursor] = useState({
    word: 0,
    char: 0,
  });

  const handleKeyDown = useCallback(
    (event) => {
      const { code, key } = event;

      if (!focused || !isAllowedKeyCode(event)) return;

      handleMoveCharacter(code);
      setInputs((prev) => {
        if (code === "Backspace") return prev.slice(0, prev.length - 1);
        else return prev + key;
      });
    },
    [focused]
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

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    handleCaret(cursor.word);
  }, [cursor]);

  return {
    inputs,
    cursor,
  };
};
