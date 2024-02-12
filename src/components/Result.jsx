import { useGameContext } from "@/context/game";

export default function Result() {
  const { result, config } = useGameContext();

  return (
    <div className='grid gap-x-2 gap-y-3 grid-cols-2 text-center h-fit sm:grid-cols-3'>
      <Card title='WPM'>{result.wpm}</Card>
      <Card title='CPM'>{result.cpm}</Card>
      <Card title='time'>{config.timer}</Card>
      <Card title='Accuracy'>{result.accuracy}</Card>
      <Card title='Character'>
        {result.correctWords}/{result.incorrectChars}
      </Card>
    </div>
  );
}

const Card = ({ children, title }) => {
  return (
    <div
      className='max-w-xs rounded-lg overflow-hidden shadow-lg p-8 select-none'
      style={{ backgroundColor: "var(--sub-alt-color)" }}
    >
      <p className={"text-2xl"} style={{ color: "var(--sub-color)" }}>
        {title}
      </p>
      <p
        className={"text-4xl	font-medium"}
        style={{ color: "var(--text-color)" }}
      >
        {children}
      </p>
    </div>
  );
};
