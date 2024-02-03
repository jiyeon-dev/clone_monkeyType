export default function Timer() {
  return (
    <div className='flex items-center justify-center select-none'>
      <span
        style={{
          fontSize: "1.5rem",
          color: "var(--main-color)",
        }}
      >
        00:24
      </span>
    </div>
  );
}
