import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyles } from "@mui/material";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
