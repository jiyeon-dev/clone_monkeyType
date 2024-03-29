import { FaMousePointer } from "react-icons/fa";
import Word from "./Word";
import { useGameContext } from "@/context/game";

export default function WordsWrapper() {
  const { words, inputs, cursor, onFocus, handleOnFocus } = useGameContext();

  return (
    <div
      id='wordsContainer'
      className='mt-7 overflow-hidden outline-none'
      style={{ height: "120px" }}
      tabIndex={0}
      onFocus={() => handleOnFocus(true)}
      onBlur={() => handleOnFocus(false)}
    >
      <div
        className={`${
          onFocus ? "opacity-0" : "opacity-100"
        } h-0 leading-32 z-50 text-center select-none`}
        style={{ color: "var(--text-color)" }}
      >
        <FaMousePointer className='inline-flex mr-2' />
        Click here or start typing to focus
      </div>

      <div
        id='wordsWrapper'
        className={`${onFocus ? "" : "blur-sm"} relative z-10`}
        style={{ color: "var(--sub-color)" }}
      >
        <div
          id='caret'
          className={`${
            onFocus ? "" : "hidden"
          } animate-caret text-2xl h-7 absolute origin-top-left`}
          style={{
            width: "0.15rem",
            background: "var(--caret-color)",
          }}
        />

        <div
          id='words'
          style={{ height: "120px" }}
          className={`flex flex-start flex-wrap w-100 select-none text-2xl overflow-hidden`}
        >
          {words.map((word, index) => (
            <Word
              key={`${word}-#${index}`}
              word={word}
              userTypedWord={inputs.split(" ")[index]}
              isActiveWord={cursor.word === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
