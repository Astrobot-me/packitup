import { Features } from "@/components/features";
import Hero from "@/components/Hero";
import { Newsletter } from "@/components/newsletter";
import { Testimonials } from "@/components/testimonials";


export default function Home() {
  return (
   <main>
    <Hero />
    <Features/>
    <Testimonials/>
    <Newsletter/>
   </main>
  );
}
