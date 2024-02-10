import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TypeConfig from "./components/TypeConfig";
import Timer from "./components/Timer";
import WordsWrapper from "./components/WordWrapper";
import ResetButton from "./components/ResetButton";
import { useState } from "react";

function App() {
  const [config, setConfig] = useState({
    puncNum: ["punctuation"],
    mode: "time",
    timer: "15",
  });

  const handleChangeConfig = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // TODO: faker
  // TODO: reset timer
  // TODO: focus event

  return (
    <div
      id='contentWrapper'
      className='grid gap-8 h-screen max-w-6xl overflow-y-auto overflow-x-hidden p-8 mx-auto font-mono'
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main className='grid gap-3'>
        <TypeConfig config={config} onChangeConfig={handleChangeConfig} />
        <Timer />
        <WordsWrapper></WordsWrapper>
        <ResetButton />
      </main>
      <Footer />
    </div>
  );
}

export default App;
