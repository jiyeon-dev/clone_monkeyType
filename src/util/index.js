/**
 * 입력 가능한 키인지 체크
 * @param {KeyboardEvent} event
 * @returns {Boolean}
 */
export const isAllowedKeyCode = (event) => {
  const isCombinationKey =
    event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
  if (isCombinationKey) return false;

  const code = event.code;
  return code.startsWith("Key") || code === "Backspace" || code === "Space";
};
