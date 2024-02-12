import { faker } from "@faker-js/faker";

/**
 * 입력 가능한 키인지 체크
 * @param {KeyboardEvent} event
 * @returns {Boolean}
 */
export const isAllowedKeyCode = (event) => {
  const isCombinationKey = event.altKey || event.ctrlKey || event.metaKey;
  if (isCombinationKey) return false;

  const code = event.code;
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space" ||
    code === "Period" ||
    code === "Comma" ||
    code === "Minus"
  );
};

/**
 * 입력한 문자열 생성
 * @param {object} config
 * @returns
 */
export const generateWords = (config) => {
  const { puncNum } = config;
  if (puncNum === "punctuation") {
    return faker.lorem.paragraph({ min: 10, max: 15 }).split(" ");
  } else {
    return faker.word.words(30).split(" ");
  }
};

// /**
//  * 특정 element 밖 선택시 callback 함수 실행
//  * @param {HTMLElement} element
//  * @param {function} callback
//  */
// export const onClickOutside = (element, callback) => {
//   document.addEventListener("click", (e) => {
//     e.stopPropagation();
//     const el =
//       typeof element === "object" ? element : document.querySelector(element);
//     if (!el.contains(e.target)) callback();
//   });
// };

/**
 * mm:ss 형식으로 변경
 * @param {string|Number} time
 * @returns {string} mm:ss
 */
export const convertTime = (time) => {
  if (!time) return "00:00";
  else {
    const minute = String(Number.parseInt(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minute}:${seconds}`;
  }
};

export const calculateMetrics = (expectWords, inputWords, time) => {
  // 정확성, 틀린 문자수 초기화
  let correctWords = 0;
  let totalCharsTyped = 0;
  let incorrectChars = 0;

  // 정확성 및 틀린 문자수 계산
  for (let i = 0; i < expectWords.length; i++) {
    const expectedWord = expectWords[i];
    const inputWord = inputWords[i] || ""; // Handling undefined input

    for (let j = 0; j < expectedWord.length; j++) {
      totalCharsTyped++;

      if (inputWord[j] === expectedWord[j]) {
        correctWords++;
      } else {
        incorrectChars++;
      }
    }
  }

  // 정확성 계산
  const accuracy = (correctWords / totalCharsTyped) * 100;

  // WPM 및 CPM 계산
  const wpm = (correctWords / 5 / (time / 60)).toFixed(2); // Assuming average word length is 5 characters
  const cpm = (correctWords / (time / 60)).toFixed(2);

  return {
    accuracy: accuracy.toFixed(2),
    wpm,
    cpm,
    correctWords,
    incorrectChars,
  };
};

let themesList;
export const getThemeList = async () => {
  if (!themesList || themesList.length === 0) {
    const response = await fetch("../../static/themes/_list.json");
    themesList = await response.json();
    console.log("---update");
    // setThemeList(themesList);
  }
  return themesList;
};
