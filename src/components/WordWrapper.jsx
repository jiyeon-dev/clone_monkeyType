import { FaMousePointer } from "react-icons/fa";
import Word from "./Word";
import { useKeyDown } from "@/hooks/useKeyDown";

export default function WordsWrapper({ focused = true }) {
  const { inputs, cursor } = useKeyDown(focused);

  return (
    <div className='mt-7 overflow-hidden' style={{ height: "120px" }}>
      <div
        className={`${
          focused ? "opacity-0" : "opacity-100"
        } h-0 leading-32 z-50 text-center select-none`}
        style={{ color: "var(--text-color)" }}
      >
        <FaMousePointer className='inline-flex mr-2' />
        Click here or start typing to focus
      </div>

      <div
        id='wordsWrapper'
        className={`${
          focused ? "" : "blur-sm"
        } relative focus:border-0 focus:border-none focus:outline-none`}
        style={{ color: "var(--sub-color)" }}
      >
        <div
          id='caret'
          className='animate-caret text-2xl	h-7	absolute origin-top-left'
          style={{
            width: "0.15rem",
            background: "var(--caret-color)",
          }}
        />

        <div
          id='words'
          className={`flex flex-start flex-wrap w-100 select-none text-2xl`}
        >
          {[...Array(100).keys()].map((word, index) => (
            <Word
              key={word}
              word={"ibcd"}
              userTypedWord={inputs.split(" ")[index]}
              isActiveWord={cursor.word === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
