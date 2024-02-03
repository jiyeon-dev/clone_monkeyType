import { FaMousePointer } from "react-icons/fa";
import Word from "./Word";

export default function WordsWrapper({ children, focused = false }) {
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
        className={`${
          focused ? "" : "blur-sm"
        } relative focus:border-0 focus:border-none focus:outline-none`}
        style={{ color: "var(--sub-color)" }}
      >
        <div
          id='words'
          className={`flex flex-start flex-wrap w-100 select-none text-2xl`}
        >
          {children}
          {[...Array(100).keys()].map((word) => (
            <Word key={word} word={word} />
          ))}
        </div>
      </div>
    </div>
  );
}
