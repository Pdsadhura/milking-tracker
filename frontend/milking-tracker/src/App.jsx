import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Session from "./pages/Session";
import History from "./pages/History";
import milkBg from "./assets/milk-background.jpg";

export default function App() {
  return (
    <>
    
    <div
  className="relative flex flex-col h-screen bg-cover bg-center"
  style={{ backgroundImage: `url(${milkBg})` }}
>
  
  <div className="absolute inset-0 bg-black/40" />

  <Router>
    <div className="relative z-10 flex-1 flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  </Router>
</div>
</>
  );
}
