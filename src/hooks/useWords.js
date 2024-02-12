import { useCallback, useEffect, useState } from "react";
import { generateWords, isAllowedKeyCode } from "@/util";

/**
 * 커서 이동 (left, top 변경)
 * @param {number} activeWordIndex 활성화된 word index
 */
const handleCaret = (activeWordIndex) => {
  const caretElement = document.getElementById("caret");
  const wordDiv = document.getElementById("words");
  if (!wordDiv) return;
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
    // 새 단어 시작인 경우
    // 두번째 줄부터 스크롤 이동
    const scrollTop =
      currentWord.offsetTop > 4
        ? currentWord.offsetTop - 40
        : currentWord.offsetTop;
    wordDiv.scrollTo({ top: scrollTop });

    const rect = currentWord.getBoundingClientRect();
    caretElement.style.left = `${rect.left - wordsRect.left}px`;
    caretElement.style.top = `${rect.top - wordsRect.top}px`;
  }
};

/**
 * 입력받은 wordIndex 위치에 있는 단어에서 가장 마지막 입력된 글자의 index 반환
 * @param {Number} wordIndex
 * @returns
 */
const getLastCharacterIndex = (wordIndex) => {
  const wordDiv = document.getElementById("words");
  const currentWord = wordDiv.children[wordIndex];
  if (!currentWord) return 0;
  const charIndex = Array.from(currentWord.children).findLastIndex(
    (child) =>
      child.classList.contains("correct") ||
      child.classList.contains("incorrect")
  );
  return charIndex + 1;
};

/**
 * 현재 글자가 줄의 끝인지 caret 위치 확인
 * @returns {Boolean}
 */
const isEndOfLine = () => {
  const caretElement = document.getElementById("caret");
  if (!caretElement) return;
  const caretRect = caretElement.getBoundingClientRect();
  const wordsWrapper = document.getElementById("wordsWrapper");
  const wordsWrapperRect = wordsWrapper.getBoundingClientRect();

  if (caretRect.right + 15 > wordsWrapperRect.right) {
    return true;
  }
  return false;
};

export const useWords = (config, startTimer) => {
  const [words, setWords] = useState(generateWords(config));
  const [inputs, setInputs] = useState("");
  const [cursor, setCursor] = useState({
    word: 0,
    char: 0,
  });
  const [onFocus, setOnFocus] = useState(false);

  const isLastWord = words.length - 1 === cursor.word;
  const isLastCharacter = words[words.length - 1].length === cursor.char;

  const handleOnFocus = useCallback((focused) => {
    const container = document.getElementById("wordsContainer");
    if (container)
      if (focused) container.focus();
      else container.blur();

    setOnFocus(focused);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      const { code, key } = event;
      if (!isAllowedKeyCode(event)) return;
      if (!onFocus) {
        handleOnFocus(true);
        return;
      }

      if (isLastWord && isLastCharacter) return; // 이미 다 입력한 경우
      if (code === "Space" && isLastWord) return; // 마지막 단어에서 space 입력한 경우
      if (code !== "Space" && code !== "Backspace" && isEndOfLine()) return; // 줄의 마지막 단어인 경우 더이상 입력 못하도록 막음.

      // 최대 15자만 입력 가능
      if (code !== "Space" && code !== "Backspace" && cursor.char >= 15) {
        return;
      }

      startTimer();
      handleMoveCharacter(code);
      setInputs((prev) => {
        if (code === "Backspace") return prev.slice(0, prev.length - 1);
        else return prev + key;
      });
    },
    [
      onFocus,
      isLastWord,
      isLastCharacter,
      cursor.char,
      startTimer,
      handleOnFocus,
    ]
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
          if (prev.char === 0) {
            word = prev.word - 1;
            char = getLastCharacterIndex(word);
          } else {
            word = prev.word;
            char = prev.char - 1;
          }
          break;
        default:
          word = prev.word;
          char = prev.char + 1;
      }

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
    onFocus,
    handleOnFocus,
    clearInputs,
  };
};
