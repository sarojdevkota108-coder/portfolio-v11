import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { WebDev } from '@/components/sections/WebDev'
import { InteriorDesign } from '@/components/sections/InteriorDesign'
import { Networking } from '@/components/sections/Networking'
import { Achievements } from '@/components/sections/Achievements'
import { Skills } from '@/components/sections/Skills'
import { Certifications } from '@/components/sections/Certifications'
import { Volunteer } from '@/components/sections/Volunteer'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <InteriorDesign />
      <WebDev />
      <Networking />
      <Achievements />
      <Certifications />
      <Volunteer />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
