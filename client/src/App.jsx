import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Space from "./pages/Space";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/space/:roomId" element={<Space />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;