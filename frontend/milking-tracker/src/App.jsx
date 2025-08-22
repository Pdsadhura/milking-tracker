import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Session from "./pages/Session";
import History from "./pages/History";
import milkBg from "./assets/milk-background.png";

export default function App() {
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${milkBg})` }}
    >
      <Router>
        <div className="flex-1 flex items-center justify-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/session" element={<Session />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
