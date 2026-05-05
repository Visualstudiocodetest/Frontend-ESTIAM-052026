import { Route, Routes } from "react-router-dom"
import Accueil from "./pages/Accueil";
import Contact from "./pages/Contact";

function App() {
  return (
    <div>
      <nav>
        <a href="/">Accueil</a>
        <a href="/contact">Contact</a>
      </nav>
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </div>
  )
}

export default App
