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
    label: "All Inquiries",
    description: "Complete overview of fiduciary advisory standards and acquisition protocols.",
  },
  {
    id: "acquisition",
    label: "Acquisition & Escrow",
    description: "Purchase procedures, deposit requirements, and private off-market transfers.",
  },
  {
    id: "fiduciary",
    label: "Fiduciary & NDAs",
    description: "Institutional bilateral confidentiality, foreign AML compliance, and legal clearance.",
  },
  {
    id: "valuation",
    label: "Valuation & Mandates",
    description: "Off-market pricing models, private family office mandates, and asset benchmarking.",
  },
  {
    id: "inspections",
    label: "Viewings & Blueprints",
    description: "Architectural provenance studies, physical inspection logistics, and technical vaults.",
  },
];

export const mockFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    category: "acquisition",
    question: "How does Aura Estates ensure absolute discretion during off-market acquisitions?",
    answer:
      "All off-market acquisitions are governed by institutional bilateral non-disclosure agreements executed digitally prior to releasing property identities or addresses. Our private vault transactions utilize shielded entity holding structures, discrete escrow title protocols, and restricted access marketing to protect the anonymity of both acquiring principals and selling families.",
  },
  {
    id: "faq-2",
    category: "acquisition",
    question: "What are the standard earnest money and escrow deposit parameters for trophy assets?",
    answer:
      "For acquisitions between $10M and $50M+, standard practice involves an initial 3% to 5% fiduciary deposit deposited into escrow within two business days of mutual contract execution. Our closing desk coordinates with institutional title companies specializing in complex sovereign capital, wire clearance, and multi-jurisdictional tax structuring.",
  },
  {
    id: "faq-3",
    category: "acquisition",
    question: "Can an acquisition be transacted entirely through a corporate trust or family office entity?",
    answer:
      "Yes. Over 85% of our transactions are executed via single-purpose LLCs, revocable family trusts, or foreign fiduciary entities. Our legal partners coordinate directly with your corporate counsel to streamline FinCEN beneficial ownership compliance while preserving private principal confidentiality.",
  },
  {
    id: "faq-4",
    category: "fiduciary",
    question: "What is the Bilateral NDA protocol, and when is it required?",
    answer:
      "The Bilateral Non-Disclosure Agreement (NDA) is executed before unlisted blueprints, owner financial metrics, security system schematics, or unlisted interior photo galleries are released. It legally binds both parties to absolute confidentiality and protects architectural intellectual property.",
  },
  {
    id: "faq-5",
    category: "fiduciary",
    question: "How does Aura Estates manage international capital and anti-money laundering (AML) clearance?",
    answer:
      "We operate under strict global AML protocols in partnership with top-tier escrow officers and institutional title underwriters. We verify source-of-wealth documentation and beneficial ownership structures early in the due diligence window to ensure zero transaction friction at closing.",
  },
  {
    id: "faq-6",
    category: "fiduciary",
    question: "Does Aura Estates operate under dual agency or dedicated fiduciary representation?",
    answer:
      "Our firm strictly prioritizes dedicated single-party fiduciary representation to eliminate conflicts of interest. In rare off-market transactions where both buyer and seller seek our facilitation, full dual-fiduciary disclosure and written consent from both principals' legal counsel is required prior to contract exchange.",
  },
  {
    id: "faq-7",
    category: "valuation",
    question: "How are valuations determined for rare architectural masterworks?",
    answer:
      "Trophy modernist architecture cannot be valued solely through standard price-per-square-foot metrics. Our proprietary appraisal methodology factors in architectural provenance, irreplaceable lot promontories, replacement construction costs of museum-grade materials, and current global capital flows across luxury benchmark cities.",
  },
  {
    id: "faq-8",
    category: "valuation",
    question: "Can family offices engage Aura Estates for bespoke acquisition mandates?",
    answer:
      "Yes. We frequently manage confidential buy-side search mandates for single and multi-family offices, sourcing unlisted estates that are never placed on public MLS systems. Our partners personally canvass target geographic corridors through private equity and ownership networks.",
  },
  {
    id: "faq-9",
    category: "inspections",
    question: "What technical documentation is included in an architectural listing dossier?",
    answer:
      "Each complete dossier includes stamped architectural blueprints, ALTA boundary and geological surveys, mechanical and electrical infrastructure diagrams, climate control specs, finish schedules, and indicative carrying cost spreadsheets.",
  },
  {
    id: "faq-10",
    category: "inspections",
    question: "Can a private viewing be conducted by an authorized wealth advisor or family office representative?",
    answer:
      "Yes. Principals may authorize wealth managers, architectural consultants, or legal representatives to conduct preliminary physical viewings. We require authorization on entity letterhead along with executed bilateral NDAs prior to scheduling site visits.",
  },
];

