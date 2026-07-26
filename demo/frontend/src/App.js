import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ServiceDetail from "@/pages/ServiceDetail";
import ScrollToTop from "@/components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rolunk" element={<About />} />
          <Route path="/kapcsolat" element={<Contact />} />
          <Route path="/executive-coaching" element={<ServiceDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
