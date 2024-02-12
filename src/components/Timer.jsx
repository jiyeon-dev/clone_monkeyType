import { useGameContext } from "@/context/game";
import { convertTime } from "@/util";

export default function Timer() {
  const { timer } = useGameContext();
  const countdown = convertTime(timer);

  return (
    <div className='flex items-center justify-center select-none'>
      <span
        style={{
          fontSize: "1.5rem",
          color: "var(--main-color)",
        }}
      >
        {countdown}
      </span>
    </div>
  );
}
