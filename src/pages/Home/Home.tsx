import { Hero } from '../../sections/Hero';
import { Services } from '../../sections/Services';
import { Intelligence } from '../../sections/Intelligence';
import { Benefits } from '../../sections/Benefits';
import { Team } from '../../sections/Team';
import { FinalCTA } from '../../sections/FinalCTA';
import { Contact } from '../../sections/Contact';

export function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Intelligence />
      <Benefits />
      <Team />
      <FinalCTA />
      <Contact />
    </main>
  );
}
