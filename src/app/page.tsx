import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {
  SkillVerificationSection,
  CareerBrainSection,
  ReverseRecruitingSection,
  OpportunityEngineSection,
  TrustSecuritySection,
  Footer,
} from "@/components/LandingSections";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <SkillVerificationSection />
        <CareerBrainSection />
        <ReverseRecruitingSection />
        <OpportunityEngineSection />
        <TrustSecuritySection />
      </main>
      <Footer />
    </div>
  );
}
