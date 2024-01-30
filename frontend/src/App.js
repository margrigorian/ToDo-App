import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from './pages/start_page/StartPage';
import ExpeditionsPage from './pages/expeditions_page/ExpeditionsPage';
import NotFoundPage from './pages/not_found_page/NotFoundPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />}></Route>
          <Route path="/expeditions" element={<ExpeditionsPage />}></Route>
          <Route path="/:id" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
