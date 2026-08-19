import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Esse componente não desenha nada na tela — ele só "escuta" quando o
// endereço muda, e quando isso acontece, rola a página pro topo.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}