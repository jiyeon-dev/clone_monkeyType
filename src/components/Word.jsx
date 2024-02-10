export default function Word({ word, isActiveWord, userTypedWord }) {
  // 입력한 글자가 word보다 긴 경우 뒤에 추가
  let newWords = word;
  if (userTypedWord) {
    newWords = word + userTypedWord.slice(word.length, userTypedWord.length);
  }

  return (
    <div className={`word m-1 ${isActiveWord ? "active" : ""}`}>
      {newWords.split("").map((w, i) => {
        let isCorrect = "";
        if (userTypedWord && userTypedWord.length > i) {
          if (word[i] === userTypedWord[i]) {
            isCorrect = "correct";
          } else {
            isCorrect = "incorrect";
          }
        }

        return (
          <span key={`${newWords}${w}${i}`} className={isCorrect}>
            {w}
          </span>
        );
      })}
    </div>
  );
}
