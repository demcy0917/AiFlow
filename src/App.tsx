import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
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
    </>
  );
}

export default App;
