export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "acquisition" | "fiduciary" | "valuation" | "inspections";
}

export interface FaqCategory {
  id: "all" | "acquisition" | "fiduciary" | "valuation" | "inspections";
  label: string;
  description: string;
}

export const faqCategories: FaqCategory[] = [
  {
    id: "all",
    label: "All Questions",
    description: "General overview of buying, selling, and working with Aura Estates.",
  },
  {
    id: "acquisition",
    label: "Buying & Selling",
    description: "Purchase procedures, deposit expectations, and closing processes.",
  },
  {
    id: "fiduciary",
    label: "Privacy & Representation",
    description: "Client confidentiality, representation standards, and advisory practices.",
  },
  {
    id: "valuation",
    label: "Valuation & Advisory",
    description: "Market pricing analysis, comparative assessments, and property evaluation.",
  },
  {
    id: "inspections",
    label: "Viewings & Documentation",
    description: "Private showings, floor plans, inspections, and property documentation.",
  },
];

export const mockFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    category: "acquisition",
    question: "How does Aura Estates handle private property transactions?",
    answer:
      "We prioritize our clients' privacy throughout every transaction. For properties requiring confidentiality, we coordinate private showings, ensure all inquiries are pre-qualified, and protect sensitive personal and financial details throughout negotiations and escrow.",
  },
  {
    id: "faq-2",
    category: "acquisition",
    question: "What is the typical deposit and escrow timeline for luxury homes?",
    answer:
      "Standard practice generally involves an initial earnest money deposit of 3% to 5% placed into an independent escrow account upon mutual contract acceptance. Closing timelines typically range between 30 and 45 days, depending on financing and inspection contingencies.",
  },
  {
    id: "faq-3",
    category: "acquisition",
    question: "Can an acquisition be completed through an LLC, trust, or entity?",
    answer:
      "Yes. Many clients choose to acquire residential properties through LLCs, family trusts, or other legal entities. Our advisors work closely with your legal and financial representatives to ensure a smooth, compliant closing.",
  },
  {
    id: "faq-4",
    category: "fiduciary",
    question: "Do you offer confidential agreements before sharing detailed plans?",
    answer:
      "Yes. Upon request by the homeowner or prospective buyer, we can execute a mutual confidentiality agreement before sharing detailed architectural blueprints, interior photo galleries, or proprietary property records.",
  },
  {
    id: "faq-5",
    category: "fiduciary",
    question: "How does Aura Estates represent buyers and sellers?",
    answer:
      "We believe in clear, dedicated representation. Our advisors are committed to acting in your best interest, providing transparent guidance, strong negotiation support, and continuous communication throughout the transaction.",
  },
  {
    id: "faq-6",
    category: "valuation",
    question: "How do you evaluate and price unique architectural properties?",
    answer:
      "Unique homes require careful analysis beyond standard square-foot averages. We assess architectural design, construction quality, irreplaceable lot location and views, recent sales of comparable properties, and current market demand in each neighborhood.",
  },
  {
    id: "faq-7",
    category: "valuation",
    question: "Can buyers engage Aura Estates for a tailored property search?",
    answer:
      "Yes. If you have specific architectural or neighborhood criteria, our advisors can initiate a dedicated search, leveraging our direct relationships and local knowledge to uncover opportunities matching your preferences.",
  },
  {
    id: "faq-8",
    category: "inspections",
    question: "How do I schedule a private viewing?",
    answer:
      "You can request a private viewing directly through any property listing page or by contacting our team by phone or email. We will coordinate a convenient appointment time with the listing agent.",
  },
  {
    id: "faq-9",
    category: "inspections",
    question: "Can my representative or architect conduct the viewing on my behalf?",
    answer:
      "Yes. Authorized representatives, architects, or advisors may attend viewings on your behalf. Simply notify our advisor in advance when scheduling the appointment.",
  },
];
