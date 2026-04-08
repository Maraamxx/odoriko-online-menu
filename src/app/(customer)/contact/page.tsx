import { ContactHero } from "@/components/contact/ContactHero";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { LocationSection } from "@/components/contact/LocationSection";
import { SocialStrip } from "@/components/contact/SocialStrip";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr]" style={{ background: "var(--surface)" }}>
        <ContactChannels />
        <ContactForm />
      </div>
      <LocationSection />
      <SocialStrip />
    </>
  );
}
