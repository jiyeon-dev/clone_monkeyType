import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TypeConfig from "./components/TypeConfig";
import Timer from "./components/Timer";
import WordsWrapper from "./components/WordWrapper";
import ResetButton from "./components/ResetButton";
import { useGameContext } from "@/context/game";

function App() {
  const { config, words, handleChangeConfig, handleRestart } = useGameContext();

  return (
    <div
      id='contentWrapper'
      className='grid gap-8 h-screen max-w-6xl overflow-y-auto overflow-x-hidden p-8 mx-auto font-mono'
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className='grid gap-3'>
        <TypeConfig config={config} onChangeConfig={handleChangeConfig} />
        <Timer time={config.timer} />
        <WordsWrapper words={words} />
        <ResetButton onReset={handleRestart} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
