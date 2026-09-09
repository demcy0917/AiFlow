import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ChatWidget } from './components/ui/ChatWidget';
import { Home } from './pages/Home';

function App() {
  return (
    <>
      <a href="#main-content" className="sr-only">
        Saltar al contenido principal
      </a>
      <Navbar />
      <Home />
      <Footer />
      {/* Asesor con IA: botón flotante disponible en toda la página. */}
      <ChatWidget />
    </>
  );
}

export default App;
