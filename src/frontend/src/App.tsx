import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowRight,
  Banknote,
  Building2,
  Calculator,
  Candy,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Coffee,
  CreditCard,
  ExternalLink,
  FileText,
  Globe,
  HandCoins,
  IdCard,
  Lightbulb,
  MapPin,
  Menu,
  Receipt,
  Scale,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Star,
  TrendingUp,
  Users,
  Utensils,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Language = "en" | "hi" | "mr";

interface Translations {
  title: string;
  intro: string;
  apply: string;
  docs: string;
  benefits: string;
  examples: string;
}

// ── Translation Data ──────────────────────────────────────────────────────────

const translations: Record<Language, Translations> = {
  en: {
    title: "MSME Government Schemes Portal",
    intro: "Helping street vendors and small businesses grow.",
    apply: "How to Apply",
    docs: "Documents Required",
    benefits: "Benefits of MSME",
    examples: "Vendor Examples",
  },
  hi: {
    title: "एमएसएमई योजनाएं",
    intro: "छोटे व्यापार और स्ट्रीट वेंडर्स के लिए सहायता",
    apply: "आवेदन प्रक्रिया",
    docs: "दस्तावेज़",
    benefits: "एमएसएमई लाभ",
    examples: "उदाहरण",
  },
  mr: {
    title: "एमएसएमई योजना पोर्टल",
    intro: "लहान व्यवसायांसाठी मदत",
    apply: "अर्ज प्रक्रिया",
    docs: "कागदपत्रे",
    benefits: "फायदे",
    examples: "उदाहरणे",
  },
};

// ── Scheme Data ───────────────────────────────────────────────────────────────

interface Scheme {
  name: string;
  tagline: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
  badge: string;
}

const schemes: Scheme[] = [
  {
    name: "PM SVANidhi",
    tagline: "Loan up to ₹50,000 for street vendors",
    detail:
      "PM Street Vendor's AtmaNirbhar Nidhi provides affordable working capital loans up to ₹50,000 to help street vendors resume their livelihoods affected by the COVID-19 lockdown. Vendors who repay on time get enhanced credit limits.",
    icon: <HandCoins className="w-6 h-6" />,
    color: "scheme-icon-blue",
    badge: "Street Vendors",
  },
  {
    name: "Mudra Loan",
    tagline: "Loans up to ₹10 lakh for small businesses",
    detail:
      "MUDRA (Micro Units Development & Refinance Agency) provides loans under three categories — Shishu (up to ₹50K), Kishore (₹50K–₹5L), and Tarun (₹5L–₹10L). No collateral required for most cases.",
    icon: <Banknote className="w-6 h-6" />,
    color: "scheme-icon-green",
    badge: "Small Business",
  },
  {
    name: "CGTMSE",
    tagline: "Collateral-free loans up to ₹2 Crore",
    detail:
      "Credit Guarantee Fund Trust for Micro and Small Enterprises enables collateral-free credit up to ₹2 crore to micro and small enterprises. The trust provides credit guarantees to member lending institutions.",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "scheme-icon-purple",
    badge: "Growing Business",
  },
  {
    name: "PMFME",
    tagline: "35% subsidy for food processing businesses",
    detail:
      "PM Formalisation of Micro Food Processing Enterprises scheme provides 35% credit-linked subsidy for food processing units. Covers branding, packaging, and marketing support to help food businesses scale.",
    icon: <Utensils className="w-6 h-6" />,
    color: "scheme-icon-orange",
    badge: "Food Business",
  },
  {
    name: "PMEGP",
    tagline: "Subsidy to start new businesses",
    detail:
      "PM Employment Generation Programme provides subsidy of 15-35% of project cost for setting up new micro enterprises. Available for manufacturing, service, and agro-based industries across urban and rural areas.",
    icon: <Sprout className="w-6 h-6" />,
    color: "scheme-icon-lime",
    badge: "New Business",
  },
  {
    name: "ASPIRE",
    tagline: "Support for rural entrepreneurship",
    detail:
      "A Scheme for Promotion of Innovation, Rural Industry and Entrepreneurship focuses on setting up technology centres and incubation centres to promote startups in agro-rural industry.",
    icon: <Users className="w-6 h-6" />,
    color: "scheme-icon-teal",
    badge: "Rural",
  },
  {
    name: "MSME Samadhan",
    tagline: "Helps recover delayed payments",
    detail:
      "MSME Samadhaan is a delayed payment monitoring system that empowers micro and small enterprises to file online applications against buyers defaulting on payment. Cases are monitored by dedicated MSME Facilitation Councils.",
    icon: <Scale className="w-6 h-6" />,
    color: "scheme-icon-red",
    badge: "Payment Recovery",
  },
];

// ── Apply Steps ───────────────────────────────────────────────────────────────

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const applySteps: Step[] = [
  {
    title: "Register on Udyam Portal",
    description:
      "Visit udyamregistration.gov.in and register your business with your Aadhaar number. You'll receive a Udyam Registration Certificate that's essential for all MSME schemes.",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    title: "Select Suitable Scheme",
    description:
      "Use our Eligibility Checker below to find the best scheme for your business type and investment level. Consider your loan amount needs, collateral availability, and business category.",
    icon: <Search className="w-5 h-5" />,
  },
  {
    title: "Apply Through Bank or Portal",
    description:
      "Visit your nearest bank branch or apply online through the scheme's official portal. For PM SVANidhi, use the dedicated app. For Mudra Loan, approach any scheduled commercial bank.",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    title: "Submit Documents",
    description:
      "Prepare all required documents including Aadhaar, PAN, bank statements, and business proof. Submit them to the bank officer or upload on the portal for verification.",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Loan Approval",
    description:
      "After document verification, the bank processes your application. Approval typically takes 7-30 days. Funds are disbursed directly to your bank account upon approval.",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

// ── Documents ─────────────────────────────────────────────────────────────────

const documents = [
  {
    label: "Aadhaar Card",
    icon: <IdCard className="w-5 h-5" />,
    note: "Mandatory",
  },
  {
    label: "PAN Card",
    icon: <CreditCard className="w-5 h-5" />,
    note: "Required for loans > ₹50K",
  },
  {
    label: "Bank Account",
    icon: <Banknote className="w-5 h-5" />,
    note: "Active savings/current account",
  },
  {
    label: "Business Address Proof",
    icon: <MapPin className="w-5 h-5" />,
    note: "Utility bill / rent agreement",
  },
  {
    label: "Business Plan",
    icon: <Lightbulb className="w-5 h-5" />,
    note: "Sometimes required",
  },
];

// ── Benefits ──────────────────────────────────────────────────────────────────

const benefits = [
  {
    title: "Easy Loans",
    desc: "Access collateral-free credit with simplified documentation",
    icon: <HandCoins className="w-6 h-6" />,
    iconClass: "benefit-icon-blue",
  },
  {
    title: "Government Subsidy",
    desc: "Direct subsidies of 15–35% on project costs for eligible businesses",
    icon: <TrendingUp className="w-6 h-6" />,
    iconClass: "benefit-icon-green",
  },
  {
    title: "Tax Benefits",
    desc: "Registered MSMEs enjoy concessions on direct taxes and exemptions",
    icon: <Receipt className="w-6 h-6" />,
    iconClass: "benefit-icon-purple",
  },
  {
    title: "Payment Protection",
    desc: "Legal protection against delayed payments through MSME Samadhaan",
    icon: <ShieldCheck className="w-6 h-6" />,
    iconClass: "benefit-icon-orange",
  },
];

// ── Vendor Examples ───────────────────────────────────────────────────────────

const vendorExamples = [
  {
    name: "Raju's Tea Stall",
    story:
      "Raju, a 45-year-old tea vendor from Pune, used a Mudra Loan (Shishu) of ₹45,000 to buy a new tea cart and an electric boiler. His daily revenue doubled from ₹800 to ₹1,600 within 3 months.",
    scheme: "Mudra Loan",
    schemeColor: "scheme-icon-green",
    icon: <Coffee className="w-7 h-7" />,
    bgClass: "vendor-card-amber",
    star: "Revenue doubled in 3 months",
  },
  {
    name: "Fatima's Samosa Corner",
    story:
      "Fatima, a widowed street vendor in Nagpur, received ₹10,000 through PM SVANidhi for working capital. After repaying on time, she got an enhanced limit of ₹20,000 to hire an assistant and expand.",
    scheme: "PM SVANidhi",
    schemeColor: "scheme-icon-blue",
    icon: <ShoppingBag className="w-7 h-7" />,
    bgClass: "vendor-card-blue",
    star: "Hired first assistant",
  },
  {
    name: "Meena's Sweet Shop",
    story:
      "Meena's traditional mithai shop in Kolhapur got a 35% subsidy under PMFME for branded packaging and food safety certification. Her products are now stocked in 3 supermarkets.",
    scheme: "PMFME",
    schemeColor: "scheme-icon-orange",
    icon: <Candy className="w-7 h-7" />,
    bgClass: "vendor-card-rose",
    star: "In 3 supermarkets now",
  },
];

// ── FAQ Data ──────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What is MSME?",
    a: "MSME stands for Micro, Small and Medium Enterprises. These are businesses with investment below ₹50 crore and turnover below ₹250 crore. MSMEs are the backbone of India's economy, contributing nearly 30% to GDP and employing over 110 million people.",
  },
  {
    q: "Who can apply for MSME schemes?",
    a: "Any Indian citizen running a micro, small, or medium enterprise can apply. This includes street vendors, shopkeepers, artisans, manufacturers, service providers, and agro-based businesses. You must have a valid Aadhaar card and a bank account.",
  },
  {
    q: "Is collateral required for MSME loans?",
    a: "Not always. PM SVANidhi and Mudra Loans (Shishu & Kishore) require no collateral. CGTMSE specifically provides a credit guarantee for collateral-free loans up to ₹2 crore. For larger amounts, some collateral may be required.",
  },
  {
    q: "How long does loan approval take?",
    a: "Timelines vary by scheme. PM SVANidhi approvals typically take 30 days. Mudra Loans are usually processed within 7-14 working days. PMEGP applications are processed in 30-60 days. Ensure all documents are complete for faster approval.",
  },
  {
    q: "Can I apply for multiple schemes simultaneously?",
    a: "You can benefit from multiple non-overlapping schemes. For example, you can get a Mudra Loan while also registering under MSME Samadhan for payment protection. However, you cannot take two working capital loans for the same purpose from different schemes.",
  },
];

// ── Intersection Observer Hook ────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Counter Hook ──────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration, inView]);
  return count;
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanResult, setLoanResult] = useState<{
    total: number;
    emi: number;
  } | null>(null);
  const [businessType, setBusinessType] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [eligibilityResult, setEligibilityResult] = useState<{
    scheme: string;
    desc: string;
    color: string;
  } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const t = translations[lang];

  // Scroll spy
  useEffect(() => {
    const sections = ["hero", "schemes", "compare", "apply", "tools"];
    const handlers = sections.map((id) => ({
      id,
      el: document.getElementById(id),
    }));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { el } of handlers) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const handleCalculateLoan = () => {
    const principal = Number.parseFloat(loanAmount);
    if (!principal || principal <= 0) return;
    const total = principal + principal * 0.1 * 3;
    const emi = total / 36;
    setLoanResult({ total, emi });
  };

  const handleCheckEligibility = () => {
    const investment = Number.parseFloat(investmentAmount);
    if (!investmentAmount || Number.isNaN(investment)) return;
    if (investment < 50000) {
      setEligibilityResult({
        scheme: "PM SVANidhi",
        desc: "Perfect for street vendors needing working capital up to ₹50,000. No collateral required. Quick approval within 30 days.",
        color: "border-blue-300 bg-blue-50",
      });
    } else if (investment < 500000) {
      setEligibilityResult({
        scheme: "Mudra Loan",
        desc: "Ideal for small businesses needing ₹50,000 to ₹10 lakh. Available through all major banks and NBFCs with minimal documentation.",
        color: "border-emerald-300 bg-emerald-50",
      });
    } else {
      setEligibilityResult({
        scheme: "CGTMSE / PMEGP",
        desc: "Best for growing businesses needing larger capital. CGTMSE provides collateral-free loans up to ₹2 crore, while PMEGP offers 15–35% subsidy on project cost.",
        color: "border-purple-300 bg-purple-50",
      });
    }
  };

  // Stats section observer
  const { ref: statsRef, inView: statsInView } = useInView(0.3);
  const schemesCount = useCountUp(7, 1200, statsInView);
  const vendorsCount = useCountUp(48, 1400, statsInView);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* ── Sticky Nav ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-portal-deep/95 backdrop-blur-sm shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-display font-bold text-white text-sm sm:text-base truncate mr-4">
            MSME Portal
          </span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: "schemes", label: "Schemes" },
              { id: "compare", label: "Compare" },
              { id: "apply", label: "Apply" },
              { id: "tools", label: "Tools" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                data-ocid={`nav.${id}_link`}
                onClick={() => scrollTo(id)}
                className={`nav-link text-sm font-medium text-white/80 hover:text-white pb-1 ${
                  activeSection === id ? "active text-white" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Language switcher desktop */}
          <div className="hidden md:flex items-center gap-1">
            {(["en", "hi", "mr"] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                data-ocid={`lang.${l}_button`}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                  lang === l
                    ? "bg-portal-gold text-white shadow-md"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {l === "en" ? "English" : l === "hi" ? "हिंदी" : "मराठी"}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-portal-deep border-t border-white/10 px-4 pb-4">
            <div className="flex flex-col gap-2 pt-3">
              {[
                { id: "schemes", label: "Schemes" },
                { id: "compare", label: "Compare" },
                { id: "apply", label: "Apply" },
                { id: "tools", label: "Tools" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  data-ocid={`nav.${id}_link`}
                  onClick={() => scrollTo(id)}
                  className="text-white/80 hover:text-white text-left py-2 text-sm font-medium"
                >
                  {label}
                </button>
              ))}
              <div className="flex gap-1 pt-2 border-t border-white/10">
                {(["en", "hi", "mr"] as Language[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    data-ocid={`lang.${l}_button`}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                      lang === l
                        ? "bg-portal-gold text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {l === "en" ? "English" : l === "hi" ? "हिंदी" : "मराठी"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="hero-gradient min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
      >
        {/* Large geometric orb — top left */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "-8%",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.45 0.20 270 / 0.25) 0%, transparent 70%)",
          }}
        />
        {/* Large geometric orb — bottom right */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "5%",
            right: "-5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, oklch(0.55 0.18 250 / 0.2) 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Gold accent line on left edge */}
        <div
          className="absolute left-0 top-1/4 bottom-1/4 w-1 pointer-events-none"
          style={{
            background: "oklch(var(--portal-gold) / 0.6)",
            borderRadius: "0 2px 2px 0",
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in flex flex-col items-center gap-2 mb-5">
            <Badge className="bg-portal-gold/20 text-portal-gold border-portal-gold/40 text-xs font-semibold px-3 py-1 tracking-wide uppercase">
              Government of India Initiative
            </Badge>
            <span className="symbiosis-badge inline-flex items-center gap-1.5 text-xs text-white/60 bg-white/[0.08] border border-white/15 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-portal-gold inline-block" />
              A project by students of Symbiosis College of Arts &amp; Commerce,
              Pune
            </span>
          </div>

          <h1 className="animate-fade-up font-display font-black text-4xl sm:text-5xl md:text-7xl text-white leading-[1.05] tracking-tight mb-5">
            {t.title}
          </h1>
          <p className="animate-fade-up delay-200 text-white/75 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.intro}
          </p>

          <div className="animate-fade-up delay-300 flex flex-wrap gap-3 justify-center">
            <Button
              data-ocid="hero.primary_button"
              onClick={() => scrollTo("schemes")}
              className="bg-portal-gold hover:bg-portal-gold-deep text-white font-bold px-7 py-3 rounded-xl shadow-lg shadow-portal-gold/30 text-sm"
            >
              Explore Schemes <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("tools")}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-7 py-3 rounded-xl text-sm font-medium"
            >
              Check Eligibility
            </Button>
          </div>

          {/* Quick stat pills */}
          <div className="animate-fade-up delay-600 mt-12 flex flex-wrap justify-center gap-3">
            {[
              { val: "7+", label: "Schemes" },
              { val: "₹2 Cr", label: "Max Loan" },
              { val: "48M+", label: "Vendors" },
            ].map(({ val, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-sm"
              >
                <span className="font-display font-black text-portal-gold">
                  {val}
                </span>
                <span className="text-white/60 text-xs">{label}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-14 flex flex-col items-center gap-1.5 text-white/40">
            <span className="text-xs tracking-widest uppercase">
              Scroll to explore
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* Diagonal SVG divider */}
        <div className="hero-divider">
          <svg
            viewBox="0 0 1440 80"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
            role="presentation"
          >
            <path
              d="M0,80 L1440,20 L1440,80 Z"
              fill="oklch(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────────────── */}
      <div ref={statsRef} className="stats-bar py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-0 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          <div
            className={`py-4 sm:py-0 ${statsInView ? "animate-count-up" : "opacity-0"}`}
          >
            <div className="text-5xl font-display font-black text-white tracking-tight">
              {schemesCount}+
            </div>
            <div className="text-white/60 text-xs mt-1.5 tracking-widest uppercase">
              Schemes Available
            </div>
          </div>
          <div
            className={`py-4 sm:py-0 ${statsInView ? "animate-count-up delay-200" : "opacity-0"}`}
          >
            <div className="text-5xl font-display font-black text-portal-gold tracking-tight">
              ₹2 Cr
            </div>
            <div className="text-white/60 text-xs mt-1.5 tracking-widest uppercase">
              Maximum Loan Amount
            </div>
          </div>
          <div
            className={`py-4 sm:py-0 ${statsInView ? "animate-count-up delay-400" : "opacity-0"}`}
          >
            <div className="text-5xl font-display font-black text-white tracking-tight">
              {vendorsCount}M+
            </div>
            <div className="text-white/60 text-xs mt-1.5 tracking-widest uppercase">
              Vendors Helped
            </div>
          </div>
        </div>
      </div>

      {/* ── Schemes ─────────────────────────────────────────────────────── */}
      <section id="schemes" className="py-16 px-4 max-w-6xl mx-auto">
        <SectionHeader
          title="Major MSME Schemes"
          subtitle="Click on any scheme to learn more about eligibility and how to apply"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {schemes.map((scheme, i) => (
            <SchemeCard
              key={scheme.name}
              scheme={scheme}
              index={i}
              expanded={expandedCard === i}
              onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ── Comparison Table ────────────────────────────────────────────── */}
      <section id="compare" className="py-16 px-4 bg-portal-pale">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="Scheme Comparison"
            subtitle="Find the right scheme at a glance"
          />

          <div className="mt-8 bg-white rounded-2xl shadow-md overflow-hidden border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-portal-deep hover:bg-portal-deep">
                  <TableHead className="text-white font-semibold">
                    Scheme
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Loan / Benefit
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Best For
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    scheme: "PM SVANidhi",
                    amount: "₹50,000",
                    for: "Street Vendors",
                  },
                  {
                    scheme: "Mudra Loan",
                    amount: "₹10 Lakh",
                    for: "Small Businesses",
                  },
                  {
                    scheme: "CGTMSE",
                    amount: "₹2 Crore",
                    for: "Growing Businesses",
                  },
                  {
                    scheme: "PMFME",
                    amount: "35% Subsidy",
                    for: "Food Businesses",
                  },
                  {
                    scheme: "PMEGP",
                    amount: "15–35% Subsidy",
                    for: "New Businesses",
                  },
                  {
                    scheme: "ASPIRE",
                    amount: "Incubation Support",
                    for: "Rural Entrepreneurs",
                  },
                  {
                    scheme: "MSME Samadhan",
                    amount: "Payment Recovery",
                    for: "All MSMEs",
                  },
                ].map((row) => (
                  <TableRow key={row.scheme} className="compare-row">
                    <TableCell className="font-semibold text-portal-deep">
                      {row.scheme}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono font-semibold text-portal-mid">
                        {row.amount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {row.for}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ── How to Apply ─────────────────────────────────────────────────── */}
      <section id="apply" className="py-16 px-4 max-w-5xl mx-auto">
        <SectionHeader
          title={t.apply}
          subtitle="Follow these 5 simple steps to get started"
        />

        <div className="mt-10">
          {/* Stepper desktop */}
          <div className="hidden md:flex items-start gap-0 mb-8">
            {applySteps.map((step, i) => (
              <div
                key={step.title}
                className="flex-1 flex flex-col items-center"
              >
                <div className="flex items-center w-full">
                  <button
                    type="button"
                    data-ocid={`apply.step.${i + 1}`}
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                    className={`step-item w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all ${
                      activeStep === i
                        ? "bg-portal-deep border-portal-deep text-white shadow-lg scale-110"
                        : "bg-white border-portal-mid text-portal-mid hover:bg-portal-pale"
                    }`}
                  >
                    {i + 1}
                  </button>
                  {i < applySteps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 transition-colors ${
                        activeStep !== null && activeStep > i
                          ? "bg-portal-deep"
                          : "bg-border"
                      }`}
                    />
                  )}
                </div>
                <button
                  type="button"
                  data-ocid={`apply.step.${i + 1}`}
                  onClick={() => setActiveStep(activeStep === i ? null : i)}
                  className={`mt-3 text-center text-xs font-semibold max-w-[100px] transition-colors ${
                    activeStep === i
                      ? "text-portal-deep"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {step.title}
                </button>
              </div>
            ))}
          </div>

          {/* Step detail card */}
          {activeStep !== null && (
            <div className="bg-portal-pale border border-portal-mid/30 rounded-2xl p-6 mb-8 result-card-enter">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-portal-deep text-white flex items-center justify-center flex-shrink-0">
                  {applySteps[activeStep].icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-portal-deep mb-2">
                    Step {activeStep + 1}: {applySteps[activeStep].title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {applySteps[activeStep].description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile stepper */}
          <div className="md:hidden flex flex-col gap-3">
            {applySteps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                data-ocid={`apply.step.${i + 1}`}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`step-item flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                  activeStep === i
                    ? "bg-portal-pale border-portal-mid shadow-md"
                    : "bg-white border-border hover:border-portal-mid/50"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    activeStep === i
                      ? "bg-portal-deep text-white"
                      : "bg-portal-pale text-portal-mid"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">
                    {step.title}
                  </div>
                  {activeStep === i && (
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
                {activeStep === i ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documents ───────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-portal-pale">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title={t.docs}
            subtitle="Keep these ready before applying"
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.label}
                className="bg-white rounded-xl p-4 flex items-center gap-3 border border-border shadow-xs hover:shadow-md hover:border-portal-mid/40 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-portal-pale flex items-center justify-center text-portal-mid flex-shrink-0">
                  {doc.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm">{doc.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {doc.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <SectionHeader
          title={t.benefits}
          subtitle="Why register your business as an MSME?"
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group bg-white rounded-2xl p-6 border border-border shadow-xs hover:shadow-lg hover:border-portal-mid/30 transition-all text-center"
            >
              <div
                className={`w-12 h-12 ${b.iconClass} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
              >
                {b.icon}
              </div>
              <h3 className="font-display font-bold text-sm mb-2">{b.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vendor Examples ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-portal-pale">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            title={t.examples}
            subtitle="Real stories of vendors who transformed their businesses"
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendorExamples.map((v) => (
              <div
                key={v.name}
                className={`${v.bgClass} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${v.schemeColor} rounded-xl flex items-center justify-center`}
                  >
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm">{v.name}</h3>
                    <span className="text-xs text-muted-foreground font-medium">
                      {v.scheme}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {v.story}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-portal-gold-deep">
                  <Star className="w-3.5 h-3.5 fill-portal-gold text-portal-gold" />
                  {v.star}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ───────────────────────────────────────────────────────── */}
      <section id="tools" className="py-16 px-4 max-w-5xl mx-auto">
        <SectionHeader
          title="Tools for Vendors"
          subtitle="Use these interactive tools to plan your finances and find the right scheme"
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Loan Calculator */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-portal-pale rounded-xl flex items-center justify-center">
                <Calculator className="w-5 h-5 text-portal-mid" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base">
                  Loan Calculator
                </h3>
                <p className="text-xs text-muted-foreground">
                  10% p.a. interest, 3 year tenure
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="loan-amount"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Loan Amount (₹)
                </label>
                <Input
                  id="loan-amount"
                  data-ocid="tools.loan_input"
                  type="number"
                  placeholder="e.g. 50000"
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(e.target.value);
                    setLoanResult(null);
                  }}
                  className="font-mono"
                  onKeyDown={(e) => e.key === "Enter" && handleCalculateLoan()}
                />
              </div>
              <Button
                data-ocid="tools.loan_submit_button"
                onClick={handleCalculateLoan}
                className="w-full bg-portal-deep hover:bg-portal-mid text-white"
              >
                <Calculator className="mr-2 w-4 h-4" />
                Calculate Repayment
              </Button>
            </div>

            {loanResult && (
              <div
                data-ocid="tools.loan_result"
                className="mt-5 result-card-enter bg-portal-pale rounded-xl p-4 border border-portal-mid/20"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Total Repayment
                    </div>
                    <div className="text-xl font-display font-black text-portal-deep">
                      ₹
                      {loanResult.total.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                  <div className="text-center border-l border-border pl-3">
                    <div className="text-xs text-muted-foreground mb-0.5">
                      Monthly EMI
                    </div>
                    <div className="text-xl font-display font-black text-portal-mid">
                      ₹
                      {loanResult.emi.toLocaleString("en-IN", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground text-center">
                  Interest: ₹
                  {(
                    loanResult.total - Number.parseFloat(loanAmount)
                  ).toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  over 3 years
                </div>
              </div>
            )}
          </div>

          {/* Eligibility Checker */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-portal-pale rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-portal-mid" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base">
                  Scheme Eligibility Checker
                </h3>
                <p className="text-xs text-muted-foreground">
                  Find the best scheme for you
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="business-type"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Business Type
                </label>
                <Select
                  value={businessType}
                  onValueChange={(v) => {
                    setBusinessType(v);
                    setEligibilityResult(null);
                  }}
                >
                  <SelectTrigger
                    id="business-type"
                    data-ocid="tools.business_select"
                  >
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="street-vendor">Street Vendor</SelectItem>
                    <SelectItem value="shop-owner">Shop Owner</SelectItem>
                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                    <SelectItem value="food-business">Food Business</SelectItem>
                    <SelectItem value="service">Service Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="investment-amount"
                  className="text-sm font-medium mb-1.5 block"
                >
                  Investment Amount (₹)
                </label>
                <Input
                  id="investment-amount"
                  data-ocid="tools.investment_input"
                  type="number"
                  placeholder="e.g. 25000"
                  value={investmentAmount}
                  onChange={(e) => {
                    setInvestmentAmount(e.target.value);
                    setEligibilityResult(null);
                  }}
                  className="font-mono"
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleCheckEligibility()
                  }
                />
              </div>
              <Button
                data-ocid="tools.eligibility_submit_button"
                onClick={handleCheckEligibility}
                className="w-full bg-portal-mid hover:bg-portal-deep text-white"
              >
                <Search className="mr-2 w-4 h-4" />
                Check My Eligibility
              </Button>
            </div>

            {eligibilityResult && (
              <div
                data-ocid="tools.eligibility_result"
                className={`mt-5 result-card-enter rounded-xl p-4 border ${eligibilityResult.color}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Recommended Scheme
                  </span>
                </div>
                <div className="font-display font-black text-xl text-portal-deep mb-2">
                  {eligibilityResult.scheme}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {eligibilityResult.desc}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-portal-pale">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about MSME schemes"
          />

          <div className="mt-8">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${i}`}
                  data-ocid={`faq.item.${i + 1}`}
                  className="bg-white rounded-xl border border-border shadow-xs overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 text-left font-semibold text-sm hover:no-underline hover:bg-portal-pale/50 transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Official Portal ──────────────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="portal-cta-card rounded-2xl p-8 text-white">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-portal-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-portal-gold" />
              </div>
              <h2 className="font-display font-black text-2xl mb-2">
                Official MSME Portal
              </h2>
              <p className="text-white/70 text-sm mb-6 leading-relaxed max-w-sm mx-auto">
                Access all MSME schemes, apply online, track applications, and
                get official updates directly from the Government of India.
              </p>
              <a
                href="https://my.msme.gov.in/mymsme/Schemes.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-portal-gold hover:bg-portal-gold-deep text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-portal-gold/30">
                  Visit Official Website{" "}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-portal-deep text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-portal-gold" />
            <span className="font-display font-bold text-base">
              MSME Awareness Project
            </span>
          </div>
          <p className="text-white/70 text-sm mb-1">
            Helping Local Vendors Access Government Support
          </p>
          <div className="border-t border-white/10 mt-5 pt-5">
            <p className="text-white/80 text-sm font-semibold mb-1">
              Created by Students of Symbiosis College of Arts and Commerce
            </p>
            <p className="text-white/50 text-xs">
              Pune, Maharashtra — Academic Project | {new Date().getFullYear()}
            </p>
          </div>
          <div className="mt-5 text-white/30 text-xs">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`text-center ${inView ? "animate-fade-up" : "observe-init"}`}
    >
      <div className="section-accent-line mx-auto" />
      <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground mb-2">
        {title}
      </h2>
      <p className="text-muted-foreground text-sm max-w-xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
}

function SchemeCard({
  scheme,
  index,
  expanded,
  onToggle,
}: {
  scheme: Scheme;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { ref, inView } = useInView(0.1);
  const delayClass =
    [
      "",
      "delay-100",
      "delay-200",
      "delay-300",
      "delay-400",
      "delay-500",
      "delay-600",
    ][index] ?? "";

  return (
    <div
      ref={ref}
      className={`${inView ? `animate-fade-up ${delayClass}` : "observe-init"}`}
    >
      <button
        type="button"
        data-ocid={`schemes.card.${index + 1}`}
        className={`scheme-card w-full text-left bg-white rounded-2xl border border-border shadow-xs cursor-pointer overflow-hidden ${
          expanded ? "ring-2 ring-portal-mid/40" : ""
        }`}
        onClick={onToggle}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${scheme.color}`}
            >
              {scheme.icon}
            </div>
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              {scheme.badge}
            </Badge>
          </div>
          <h3 className="font-display font-bold text-base mb-1">
            {scheme.name}
          </h3>
          <p className="text-sm text-muted-foreground">{scheme.tagline}</p>
        </div>

        {expanded && (
          <div className="px-5 pb-5 border-t border-border pt-4 result-card-enter">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {scheme.detail}
            </p>
          </div>
        )}

        <div className="px-5 pb-4 flex items-center justify-between">
          <span className="text-xs text-portal-mid font-medium">
            {expanded ? "Click to collapse" : "Click to learn more"}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>
    </div>
  );
}
