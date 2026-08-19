import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Temporadas from "./pages/Temporadas";
import Temporada from "./pages/Temporada";
import Mundial from "./pages/Mundial";
import Titulos from "./pages/Titulos";
import Finais from "./pages/Finais";
import ScrollToTop from "./ScrollToTop";
import Treinadores from "./pages/Treinadores";
import NotFound from "./pages/NotFound";

// ...
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/temporadas" element={<Temporadas />} />
        <Route path="/temporada/:seasonCode" element={<Temporada />} />
        <Route path="/mundial/:ano" element={<Mundial />} />
        <Route path="/titulos" element={<Titulos />} />
        <Route path="/finais" element={<Finais />} />
        <Route path="/treinadores" element={<Treinadores />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
