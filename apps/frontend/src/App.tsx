import "./App.css";
import { useEffect } from "react";
import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
