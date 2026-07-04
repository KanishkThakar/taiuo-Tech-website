import dynamic from "next/dynamic";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Testimonial from "@/components/sections/Testimonial";

/* below-the-fold client-heavy sections: SSR'd as usual, but their JS ships
   in separate chunks that load after the shell — keeps FCP/TBT in budget */
const Transformations = dynamic(() => import("@/components/sections/Transformations"));
const Stats = dynamic(() => import("@/components/sections/Stats"));
const NewWay = dynamic(() => import("@/components/sections/NewWay"));
const Faq = dynamic(() => import("@/components/sections/Faq"));
import Analysis from "@/components/sections/Analysis";
import Dermatology from "@/components/sections/Dermatology";
import Factors from "@/components/sections/Factors";
import Learn from "@/components/sections/Learn";
import CtaBand from "@/components/sections/CtaBand";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import Objection from "@/components/sections/Objection";
import Consider from "@/components/sections/Consider";
import Footer from "@/components/sections/Footer";
import { FAQ } from "@/lib/data";

/* honest structured data — no unverified endorsement/press claims */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Taiuo Tech",
      email: "hello@taiuo.tech",
      description: "AI-powered facial analysis and non-surgical transformation plans.",
    },
    {
      "@type": "WebSite",
      name: "Taiuo Tech",
      url: "https://taiuo-tech-website.vercel.app",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="top">
        <Hero />
        <TrustBar />
        <Transformations />
        <Stats />
        <NewWay />
        <Testimonial />
        <Analysis />
        <Dermatology />
        <Factors />
        <Learn />
        <CtaBand />
        <HowItWorks />
        <Pricing />
        <Faq />
        <Objection />
        <Consider />
      </main>
      <Footer />
    </>
  );
}
