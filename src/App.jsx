import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
  return (
    <div
      id='contentWrapper'
      className='grid gap-8 h-screen max-w-6xl overflow-y-auto overflow-x-hidden p-8 mx-auto font-mono'
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      <Header />
      <main>main</main>
      <Footer />
    </div>
  );
}

export default App;
