import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Programs from "@/components/Programs";
import Method from "@/components/Method";
import Schedule from "@/components/Schedule";
import Livre from "@/components/Livre";
import Results from "@/components/Results";
import News from "@/components/News";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getSiteConfig, getResultBars, getPublishedNews } from "@/db/queries";

// ISR: serve a cached static render (fast TTFB, ideal for SEO) and regenerate at most
// every 5 minutes. Admin mutations call revalidatePath("/"), so edits also refresh the
// cache immediately. DB queries fall back to seed defaults if Postgres is unreachable.
export const revalidate = 300;

export default async function Home() {
  const [config, bars, news] = await Promise.all([
    getSiteConfig(),
    getResultBars(),
    getPublishedNews(),
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero nextSession={config.next_session} />
        <Reveal>
          <Stats />
        </Reveal>
        <Reveal>
          <Programs />
        </Reveal>
        <Reveal>
          <Method />
        </Reveal>
        <Reveal>
          <Schedule schedule={config.schedule} />
        </Reveal>
        <Reveal>
          <Livre />
        </Reveal>
        <Reveal>
          <Results results={config.results} bars={bars} />
        </Reveal>
        <Reveal>
          <News items={news} />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Contact contact={config.contact} />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
