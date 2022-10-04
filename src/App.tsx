import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import axios from "axios";
import "antd/dist/antd.css";
import Store, { StoreProvider } from "./store/store";

axios.defaults.baseURL = "http://localhost:4000";

const store = new Store();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <StoreProvider store={store}>
              <Home />
            </StoreProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
