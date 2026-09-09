import { Hero } from '../../sections/Hero';
import { Ecosystem } from '../../sections/Ecosystem';
import { Services } from '../../sections/Services';
import { Process } from '../../sections/Process';
import { Intelligence } from '../../sections/Intelligence';
import { Integrations } from '../../sections/Integrations';
import { About } from '../../sections/About';
import { Team } from '../../sections/Team';
import { Contact } from '../../sections/Contact';

/**
 * Orden de la página.
 *
 * Los fondos ALTERNAN a propósito para dar ritmo vertical: las
 * secciones "claras" quedan sobre el lienzo base (#05070f) y las
 * "oscuras" llevan la banda #070a14 con una línea superior.
 *
 *   Hero ............ base      Integraciones ... banda
 *   Ecosistema ...... base      Nosotros ........ base
 *   Servicios ....... banda     Equipo .......... banda
 *   Proceso ......... base      Contacto ........ base
 *   Inteligencia .... banda
 *
 * Si insertás una sección nueva, respetá la alternancia con su vecina.
 */
export function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Ecosystem />
      <Services />
      <Process />
      <Intelligence />
      <Integrations />
      <About />
      <Team />
      <Contact />
    </main>
  );
}
