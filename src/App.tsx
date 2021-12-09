import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import axios from "axios";
import "antd/dist/antd.css";

axios.defaults.baseURL = "http://localhost:4000";

export const GENRES = [
  "All",
  "Documentary",
  "Comedy",
  "Horror",
  "Crime",
  "SciFi",
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
