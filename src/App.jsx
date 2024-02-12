import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TypeConfig from "./components/TypeConfig";
import Timer from "./components/Timer";
import WordsWrapper from "./components/WordWrapper";
import ResetButton from "./components/ResetButton";
import Result from "./components/Result";
import { useGameContext } from "./context/game";
import About from "./components/About";

function App() {
  const { isGameOver, isAbout } = useGameContext();

  let content = "";
  if (isGameOver) content = <Result />;
  else if (isAbout) content = <About />;
  else
    content = (
      <>
        <TypeConfig />
        <Timer />
        <WordsWrapper />
        <ResetButton />
      </>
    );

  return (
    <div
      id='contentWrapper'
      className='grid gap-8 h-screen max-w-6xl overflow-y-auto overflow-x-hidden p-8 mx-auto font-mono'
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className='grid gap-3'>{content}</main>
      <Footer />
    </div>
  );
}

export default App;
