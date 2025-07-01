import Hero from "./_components/Hero";
import BestSellers from "./_components/BestSellers";
import About from "@/components/about";
import ContactPage from "./contact/page";



export default async function Home() {

  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <ContactPage />
    </main>
  );
}
