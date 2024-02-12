export default function Timer({ time }) {
  const minute = String(Number.parseInt(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className='flex items-center justify-center select-none'>
      <span
        style={{
          fontSize: "1.5rem",
          color: "var(--main-color)",
        }}
      >
        {minute}:{seconds}
      </span>
    </div>
  );
}
