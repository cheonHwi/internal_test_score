import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Index } from "./Index";
import { Login } from "./Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newPage" element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
}
