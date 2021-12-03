import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Page from "./components/page/page";
import axios from "axios";
import { useState } from "react";

axios.defaults.baseURL = "http://localhost:4000";

//const [genres, setGenres] = useState<string[]>([])
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
    <>
      <BrowserRouter>
        <Page>
          <Routes>
            <Route index element={<Home />} />
          </Routes>
        </Page>
      </BrowserRouter>
    </>
  );
}

export default App;
