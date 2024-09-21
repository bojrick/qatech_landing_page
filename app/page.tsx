import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import HowWeWork from '@/components/HowWeWork';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import QuantumIndustrySolutions from '@/components/CreativeProjectsShowcase';

// Dynamically import components for better performance
const DynamicCreativeProjectsShowcase = dynamic(() => import('@/components/CreativeProjectsShowcase'), {
  loading: () => <p>Loading projects...</p>
});

export default function Home() {
  return (
    <main>
      <Hero />
      <HowWeWork />
      <Services id="services" />
      <QuantumIndustrySolutions />
      <DynamicCreativeProjectsShowcase />
      <Contact id="contact" />
    </main>
  );
}
