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
  return code.startsWith("Key") || code === "Backspace" || code === "Space";
};

/**
 * 입력한 문자열 생성
 * @param {object} config
 * @returns
 */
export const generateWords = (config) => {
  const { puncNum, timer } = config;

  const count = { min: 0, max: 0 };
  if (timer === "30") {
    count.min = 3;
    count.max = 5;
  } else if (timer === "60") {
    count.min = 5;
    count.max = 7;
  } else if (timer === "120") {
    count.min = 7;
    count.max = 10;
  } else {
    count.min = 1;
    count.max = 3;
  }

  return faker.lorem.paragraph(count).split(" ");
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
