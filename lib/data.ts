/* ═══════════════════════════════════════════════════════════════
   TAIUO — all page content as typed data (render from data, never
   hardcode in components). Copy is verbatim from the master prompt.
   ═══════════════════════════════════════════════════════════════ */

export const NAV_LINKS = [
  { label: "Why Glow-up", href: "#why" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO = {
  label: "Join 50,000+ people",
  h1Line1: "Improve your looks",
  h1Line2: "without surgery",
  subtitle:
    "Get your personalized facial analysis and transformation plan based on your unique features.",
  badges: [
    { title: "Based on science", sub: "Using the latest research" },
    { title: "Personalized", sub: "Based on your demographics" },
    { title: "Without surgery", sub: "Non-surgical changes" },
  ],
} as const;

/* 3.3 — "As Seen In" press wordmarks (styleKey maps to a per-outlet font treatment) */
export interface PressMark {
  name: string;
  styleKey: "usatoday" | "guardian" | "dailymail" | "insider" | "sun" | "cosmo" | "gq" | "wired";
}

export const PRESS: PressMark[] = [
  { name: "USA TODAY", styleKey: "usatoday" },
  { name: "The Guardian", styleKey: "guardian" },
  { name: "Daily Mail", styleKey: "dailymail" },
  { name: "BUSINESS INSIDER", styleKey: "insider" },
  { name: "The Sun", styleKey: "sun" },
  { name: "COSMOPOLITAN", styleKey: "cosmo" },
  { name: "GQ", styleKey: "gq" },
  { name: "WIRED", styleKey: "wired" },
];

export const BENEFITS = [
  "Get more career opportunities",
  "Improve your social confidence",
  "Enhance your dating prospects",
  "Increase your perceived trustworthiness",
  "Boost your overall well-being",
] as const;

export interface Stat {
  num: string;
  title: string;
  desc: string;
  cite: string;
}

export const STAT_CATEGORIES = [
  "Finances",
  "Dating",
  "Socializing",
  "Health",
  "Education",
  "Law",
  "Influence",
  "Happiness",
] as const;

export type StatCategory = (typeof STAT_CATEGORIES)[number];

export const STATS: Record<StatCategory, Stat[]> = {
  Finances: [
    { num: "10-15%", title: "Higher salary", desc: "Attractive people earn 10-15% more", cite: "Hamermesh & Biddle, 1994, American Economic Review" },
    { num: "55%", title: "More sales", desc: "Customers 55% more likely to buy from attractive salespeople", cite: "Reingen & Kernan, 1993" },
    { num: "$1,261", title: "Bigger tips", desc: "Attractive servers receive $1,261 more annually", cite: "Parrett, 2015" },
    { num: "+32%", title: "Easier interviews", desc: "Attractive applicants perceived as more qualified", cite: "Puleo, 2006" },
  ],
  Dating: [
    { num: "3x", title: "More matches", desc: "Attractive profiles receive 3x more matches", cite: "Tyson et al., 2016" },
    { num: "68%", title: "First dates", desc: "68% more likely to get first date requests", cite: "Eastwick & Finkel, 2008" },
    { num: "+40%", title: "Relationship satisfaction", desc: "Couples with compatible features 40% more satisfied", cite: "Finkel, 2017" },
    { num: "5min", title: "Faster attraction", desc: "Attraction formed within 5 minutes of meeting", cite: "Willis & Todorov, 2006" },
  ],
  Socializing: [
    { num: "+47%", title: "More friends", desc: "Attractive people have 47% larger social networks", cite: "Reis et al., 1982" },
    { num: "2.3x", title: "Social invitations", desc: "2.3x more likely to be invited to social events", cite: "Langlois et al., 2000" },
    { num: "+25%", title: "Perceived kindness", desc: "Attractive people rated 25% kinder by strangers", cite: "Dion et al., 1972" },
    { num: "+60%", title: "Help offered", desc: "60% more likely to receive help from strangers", cite: "Benson et al., 1976" },
  ],
  Health: [
    { num: "-12%", title: "Lower cortisol", desc: "Attractive people have 12% lower stress hormones", cite: "Henderson & Anglin, 2003" },
    { num: "+18%", title: "Better sleep", desc: "Confidence from appearance improves sleep quality 18%", cite: "NHS Sleep Study, 2019" },
    { num: "-8yr", title: "Younger appearance", desc: "Consistent care can make you look 8 years younger", cite: "Langlois, 2006" },
    { num: "+22%", title: "Exercise adherence", desc: "22% more likely to maintain fitness routines", cite: "Segar et al., 2012" },
  ],
  Education: [
    { num: "+0.4", title: "Higher GPA", desc: "Attractive students score 0.4 points higher on average", cite: "Gordon et al., 2013" },
    { num: "+15%", title: "Teacher attention", desc: "Receive 15% more positive attention from educators", cite: "Clifford & Walster, 1973" },
    { num: "+28%", title: "Participation", desc: "28% more likely to participate in class discussions", cite: "Ritts et al., 1992" },
    { num: "+19%", title: "Graduation rate", desc: "19% higher college graduation rates", cite: "French et al., 2009" },
  ],
  Law: [
    { num: "-12%", title: "Lighter sentences", desc: "Attractive defendants receive 12% lighter sentences", cite: "Stewart, 1980" },
    { num: "+35%", title: "Jury sympathy", desc: "35% more likely to receive jury sympathy", cite: "Efran, 1974" },
    { num: "+22%", title: "Credibility", desc: "22% more credible as witnesses", cite: "DeSantis & Kayson, 1997" },
    { num: "+17%", title: "Settlement favors", desc: "17% more likely to receive favorable settlements", cite: "Zebrowitz & McDonald, 1991" },
  ],
  Influence: [
    { num: "+34%", title: "Persuasion", desc: "34% more persuasive in arguments", cite: "Chaiken, 1979" },
    { num: "+41%", title: "Leadership votes", desc: "41% more likely to be voted as leader", cite: "Spisak et al., 2012" },
    { num: "+27%", title: "Social media", desc: "27% more followers on average", cite: "Instagram Engagement Study, 2021" },
    { num: "+38%", title: "Trust", desc: "38% more likely to be trusted initially", cite: "Wilson & Eckel, 2006" },
  ],
  Happiness: [
    { num: "+23%", title: "Life satisfaction", desc: "23% higher overall life satisfaction scores", cite: "Diener et al., 1995" },
    { num: "-31%", title: "Depression risk", desc: "31% lower risk of depression", cite: "Umberson & Karas, 2010" },
    { num: "+19%", title: "Self-esteem", desc: "19% higher self-esteem scores", cite: "Major et al., 1984" },
    { num: "+26%", title: "Daily mood", desc: "26% more positive daily mood ratings", cite: "Karraker et al., 2012" },
  ],
};

export interface WayStep {
  label: string;
  text: string;
}

export const OLD_WAY: WayStep[] = [
  { label: "Step 1", text: "Fixate on one feature" },
  { label: "Step 2", text: "Visit a clinic" },
  { label: "Step 3", text: "No assessment" },
  { label: "Step 4", text: "Unnecessary surgery" },
  { label: "Step 5", text: "Poor results" },
];

export const NEW_WAY: WayStep[] = [
  { label: "Step 1", text: "Consider your face holistically" },
  { label: "Step 2", text: "Taiuo Analysis" },
  { label: "Step 3", text: "See your future self" },
  { label: "Step 4", text: "Personalized protocol" },
  { label: "Step 5", text: "Real results" },
];

/* 3.6 / 3.7 — expert quotes as on the reference site (verify consent before public launch) */
export const ADVISOR_QUOTE = {
  quote:
    "“The traditional approach to aesthetics is fundamentally flawed. Patients come in fixated on one feature without understanding how it affects their overall facial harmony. Taiuo changes everything by starting with comprehensive analysis.”",
  name: "Dr. Gary Linkov, MD",
  role: "Facial Plastic Surgeon",
  photo: "/images/testimonial-portrait.jpg",
} as const;

export const TESTIMONIAL = {
  quote:
    "I'm thrilled by Taiuo's innovative approach to cosmetic care. The precision of their AI-driven facial analysis is unlike anything I've seen in aesthetics.",
  name: "Dr. Gary Linkov, MD",
  role: "Facial Plastic Surgeon",
  photo: "/images/testimonial-portrait.jpg",
} as const;

/* Dermatology credibility section */
export const DERM_POINTS = [
  {
    icon: "stethoscope",
    title: "Board-certified review",
    desc: "Every protocol template is reviewed by board-certified dermatologists before it reaches you.",
  },
  {
    icon: "badge",
    title: "Evidence-graded recommendations",
    desc: "Each of our 450+ methods is graded by strength of evidence, so you know what's proven and what's promising.",
  },
  {
    icon: "book",
    title: "Safety-first, non-invasive",
    desc: "Skincare, lifestyle, and non-surgical treatments only — nothing in your plan requires going under the knife.",
  },
] as const;

export interface Feature {
  icon: string;
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  { icon: "scan", title: "Precise Measurements", desc: "We landmark 512 points of your face for precise assessments." },
  { icon: "eye", title: "Realistic Visualizations", desc: "See a preview of what your face would look like with changes." },
  { icon: "flask", title: "Evidence-Based Recommendations", desc: "450+ evidence-based methods to improve attractiveness." },
  { icon: "file", title: "Comprehensive Report", desc: "Detailed breakdown of every facial feature and its harmony." },
  { icon: "trend", title: "Progress Tracking", desc: "Track improvements over time with updated analyses." },
  { icon: "refresh", title: "Continuous Improvement", desc: "Ongoing protocol adjustments based on your progress." },
];

export const FACTORS: Feature[] = [
  { icon: "globe", title: "Ethnic background", desc: "Considers unique facial traits common to your demographic." },
  { icon: "sliders", title: "Personal preferences", desc: "Takes into account your individual style and preferences." },
  { icon: "activity", title: "Lifestyle factors", desc: "Considers diet, climate, stress, sleep, and habits." },
  { icon: "hourglass", title: "Natural aging patterns", desc: "Considers how skin, bone, and fat change over time." },
  { icon: "landmark", title: "Cultural beauty standards", desc: "Adapts to regional and societal ideals." },
];

export interface LearnItem {
  thumb: "dial" | "map" | "web" | "bars" | "molecule";
  title: string;
  desc: string;
}

export const LEARN_ITEMS: LearnItem[] = [
  { thumb: "dial", title: "Your Taiuo biometrics", desc: "Your current Taiuo scores and potential for improvement." },
  { thumb: "map", title: "How each feature impacts your appearance", desc: "Detailed breakdowns on each facial feature." },
  { thumb: "web", title: "The harmony of your face", desc: "How your features work together." },
  { thumb: "bars", title: "Your features with the most potential", desc: "What you can improve without surgery." },
  { thumb: "molecule", title: "The science underlying your protocol", desc: "Scientific explanations for our recommendations." },
];

export const HOW_STEPS = [
  {
    title: "Upload Your Photos",
    desc: "Upload 6 clear photos of your face securely and privately through our online portal.",
  },
  {
    title: "Facial Assessments",
    desc: "We measure 160+ facial markers, including skin quality, symmetry, eye shape, brow density, and more.",
  },
  {
    title: "Personalized Report",
    desc: "You'll receive a plan highlighting your strengths, areas for improvement, and best ways to improve your appearance.",
  },
] as const;

export const PRICE_FEATURES = [
  "Complete facial analysis",
  "Personalized facial improvement protocol",
  "Biometrics scores and tracking",
  "Before-and-after visualizations",
  "Ask us anything, anytime",
  "Updated analysis every year",
  "Priority support",
  "Cancel anytime",
] as const;

export const FAQ_CATEGORIES = ["General", "Analysis", "Protocol", "Privacy"] as const;
export type FaqCategory = (typeof FAQ_CATEGORIES)[number];

export interface FaqItem {
  cat: FaqCategory;
  q: string;
  a: string;
}

export const FAQ: FaqItem[] = [
  {
    cat: "General",
    q: "What is Taiuo?",
    a: "Taiuo is the world's best platform to improve your looks and achieve a real facial transformation without surgery. We provide you, from the comfort of your home, with a personalized facial analysis and transformation plan based on your unique features.",
  },
  {
    cat: "General",
    q: "Who is this for?",
    a: "Taiuo is for anyone who wants to improve their looks with science-based methods, without surgery.",
  },
  {
    cat: "General",
    q: "What exactly will I receive?",
    a: "Upon joining, you'll receive a comprehensive facial analysis, a personalized glow-up protocol, your biometric scores, before-and-after visualizations, a protocol letter from our team, and constant messaging access to our care team.",
  },
  {
    cat: "General",
    q: "How long will it take?",
    a: "It takes up to 28 days from the moment you upload your photos for our team to prepare your analysis and protocol.",
  },
  {
    cat: "General",
    q: "Is this a one-time report?",
    a: "This is an ongoing service that you can cancel at any time. After your initial plan, you'll receive updated protocols, analyses, and visualizations every year.",
  },
  {
    cat: "Analysis",
    q: "How does the analysis work?",
    a: "Our AI-powered system landmarks 512 points on your face and performs 100+ aesthetic tests to create a comprehensive understanding of your unique features.",
  },
  {
    cat: "Analysis",
    q: "What makes Taiuo different from filters?",
    a: "We don't rely on filters or gimmicks. We've trained our models to achieve best-in-class precision in measurements, visualizations, and recommendations based on 450+ evidence-based methods.",
  },
  {
    cat: "Analysis",
    q: "Can I really get results without surgery?",
    a: "Yes. The many small changes we recommend, combined together, compound to produce dramatic results. Every transformation you see on this page can be achieved without surgery.",
  },
  {
    cat: "Protocol",
    q: "What is the protocol?",
    a: "Your personalized protocol is a step-by-step plan designed specifically for your facial structure. It includes skincare routines, lifestyle changes, and non-surgical treatment recommendations.",
  },
  {
    cat: "Protocol",
    q: "How often is the protocol updated?",
    a: "You'll receive an updated protocol once per year to ensure you're always following the most effective plan for your goals.",
  },
  {
    cat: "Privacy",
    q: "Is my data private?",
    a: "Absolutely. Your photos and personal data are encrypted and stored securely. We never share your information with third parties.",
  },
  {
    cat: "Privacy",
    q: "Who can see my photos?",
    a: "Only our certified analysis team sees your photos. They are never shared publicly or used for any purpose other than generating your personal analysis.",
  },
];

export const OBJECTION_CARDS = [
  {
    icon: "sparkles",
    title: "You learn what's truly unique about your face.",
    desc: "Many features you might worry about are actually positive traits.",
  },
  {
    icon: "target",
    title: "You get clarity about what can actually be improved.",
    desc: "Slight facial asymmetry is perfectly normal — everyone has it.",
  },
  {
    icon: "shield",
    title: "You gain control through knowledge.",
    desc: "Takes into account genetic factors and how they might impact your facial appearance.",
  },
] as const;

export const CONSIDER_POINTS = [
  "First impressions matter",
  "Small improvements can drastically impact quality of life",
  "The key is approaching it intelligently",
] as const;

export const CONSIDER_CHECKS = [
  "Not chasing unrealistic standards",
  "Not trying to look like someone else",
  "Not seeking perfection",
  "Aiming only for a better version of yourself",
] as const;

/* Onboarding wizard data */
export const GOAL_OPTIONS = [
  "Clearer skin",
  "Sharper jawline",
  "Better facial harmony",
  "Look younger",
  "Improve symmetry",
  "Eye area",
  "Overall glow-up",
] as const;

export interface PhotoSlot {
  key: string;
  label: string;
  hint: string;
}

export const PHOTO_SLOTS: PhotoSlot[] = [
  { key: "front", label: "Front", hint: "Face the camera straight on" },
  { key: "left-profile", label: "Left profile", hint: "Full 90° left side" },
  { key: "right-profile", label: "Right profile", hint: "Full 90° right side" },
  { key: "left-quarter", label: "Left ¾", hint: "Turn 45° to the left" },
  { key: "right-quarter", label: "Right ¾", hint: "Turn 45° to the right" },
  { key: "smile", label: "Smile", hint: "Natural smile, front on" },
];

export const FOOTER_COLS = [
  { heading: "Company", links: ["Research", "About", "Careers", "Contact"] },
  { heading: "Resources", links: ["Blog", "Help Center", "Privacy", "Terms"] },
  { heading: "Connect", links: ["Instagram", "TikTok", "YouTube", "X"], external: true },
] as const;
