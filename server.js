const http = require('http');
const PORT = process.env.PORT || 3000;

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>VNC FashionVault — AI Placement Platform</title>
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.26.4/babel.min.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #F5F7FA; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #CBD5E0; border-radius: 4px; }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
  </style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
const { useState, useEffect, useRef } = React;

const G = "#00C853";
const G_LIGHT = "#E8FFF2";
const A = "#FFB300";
const A_LIGHT = "#FFF8E1";
const N = "#0D1B2A";
const C = "#FF5252";
const C_LIGHT = "#FFF0F0";
const W = "#FFFFFF";
const BG = "#F5F7FA";
const BORDER = "#E2E8F0";
const MID = "#8C9BAB";
const DARK = "#1A2B3C";

const FASHION_AI = \`You are VAULTAI, the AI placement engine for VNC FashionVault — the #1 automated fashion placement platform. You place clothing brands with stylists, influencers, and retail buyers to generate revenue.

EXPERTISE:
- Editorial Placement (Vogue, Harper's, Elle, WWD, Hypebeast, Complex)
- Stylist Outreach (celebrity, editorial, commercial, TV/film)
- Influencer Campaigns (nano 1K-10K, micro 10K-100K, macro 100K-1M, mega 1M+)
- Retail Buyer Pitches (boutiques, specialty stores, department stores, online retail)
- PR & Press (lookbooks, line sheets, press kits, sample loan programs)
- Wholesale & Consignment (Net 30/60/90, MOQ, sell-through, margin strategy)
- Trade Show Strategy (Magic, Coterie, Agenda, Project, NYFW, Capsule)
- Celebrity Dressing (stylist relationships, red carpet, loan agreements)
- Campaign Development (capsule drops, collab pitches, UGC strategy)

PERSONALITY: Direct, strategic, energetic. You speak in results — placements, revenue, timelines. No fluff. Every answer has an action in it.\`;

const INIT_CLIENTS = [
  { id: 1, name: "AUREUM NOIR", category: "Luxury RTW", status: "Active", placements: 14, revenue: 52400, target: "Women 25–38", tier: "Gold", joinDate: "2026-01-12", pieces: 28, campaigns: 3, contact: "aria@aureumnoir.com" },
  { id: 2, name: "VOID STUDIOS", category: "Streetwear", status: "Outreach", placements: 6, revenue: 14800, target: "Unisex 18–28", tier: "Silver", joinDate: "2026-02-20", pieces: 18, campaigns: 1, contact: "kai@voidstudios.co" },
  { id: 3, name: "TERRA CO.", category: "Sustainable", status: "Negotiation", placements: 9, revenue: 33200, target: "Women 28–42", tier: "Gold", joinDate: "2025-12-05", pieces: 34, campaigns: 2, contact: "maya@terracollective.com" },
  { id: 4, name: "NXGEN ATELIER", category: "Avant-Garde", status: "Intake", placements: 0, revenue: 0, target: "Unisex 22–35", tier: "Starter", joinDate: "2026-06-10", pieces: 12, campaigns: 0, contact: "leo@nxgenatelier.com" },
];

const ACTIVITY = [
  { brand: "AUREUM NOIR", action: "Vogue editorial confirmed", type: "editorial", time: "2h ago", value: "\$8,200" },
  { brand: "TERRA CO.", action: "Nordstrom buyer call scheduled", type: "retail", time: "4h ago", value: "\$22K PO" },
  { brand: "VOID STUDIOS", action: "@hypebeast gifting shipped", type: "influencer", time: "6h ago", value: "1.2M reach" },
  { brand: "AUREUM NOIR", action: "Celebrity stylist pulled samples", type: "stylist", time: "1d ago", value: "Jamie Mizrahi" },
  { brand: "TERRA CO.", action: "Micro influencer wave live (12 posts)", type: "influencer", time: "1d ago", value: "480K reach" },
  { brand: "AUREUM NOIR", action: "Revolve reorder PO #4421", type: "retail", time: "2d ago", value: "\$6,800" },
];

const ONBOARDING_STEPS = ["Brand Story", "Collection", "Target Market", "Goals", "Submit"];
const typeColor = { editorial: G, retail: A, influencer: C, stylist: N };
const statusColor = { Active: G, Outreach: A, Negotiation: C, Intake: MID };
const tierBg = { Gold: A_LIGHT, Silver: BG, Starter: G_LIGHT };
const tierColor = { Gold: A, Silver: MID, Starter: G };

function Input({ label, value, onChange, placeholder, type = "text", required }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: DARK, marginBottom: "6px", letterSpacing: "0.03em" }}>
        {label}{required && <span style={{ color: C, marginLeft: "3px" }}>*</span>}
      </label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", boxSizing: "border-box", border: \`1.5px solid \${BORDER}\`, borderRadius: "10px", padding: "11px 14px", fontSize: "14px", color: DARK, background: W, outline: "none", fontFamily: "Inter, sans-serif", transition: "border-color 0.15s" }}
        onFocus={e => e.target.style.borderColor = G}
        onBlur={e => e.target.style.borderColor = BORDER}
      />
    </div>
  );
}

function Select({ label, value, onChange, options, required }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: DARK, marginBottom: "6px" }}>
        {label}{required && <span style={{ color: C, marginLeft: "3px" }}>*</span>}
      </label>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", border: \`1.5px solid \${BORDER}\`, borderRadius: "10px", padding: "11px 14px", fontSize: "14px", color: DARK, background: W, outline: "none", fontFamily: "Inter, sans-serif", appearance: "none" }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows = 3, required }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: DARK, marginBottom: "6px" }}>
        {label}{required && <span style={{ color: C, marginLeft: "3px" }}>*</span>}
      </label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width: "100%", boxSizing: "border-box", border: \`1.5px solid \${BORDER}\`, borderRadius: "10px", padding: "11px 14px", fontSize: "14px", color: DARK, background: W, outline: "none", fontFamily: "Inter, sans-serif", resize: "vertical" }}
        onFocus={e => e.target.style.borderColor = G}
        onBlur={e => e.target.style.borderColor = BORDER}
      />
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", disabled, fullWidth, size = "md" }) {
  const bg = variant === "primary" ? G : variant === "amber" ? A : variant === "coral" ? C : variant === "navy" ? N : W;
  const color = variant === "outline" ? N : "#fff";
  const border = variant === "outline" ? \`2px solid \${N}\` : "none";
  const pad = size === "lg" ? "14px 28px" : size === "sm" ? "7px 14px" : "10px 20px";
  const fs = size === "lg" ? "15px" : size === "sm" ? "12px" : "13px";
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ background: disabled ? BORDER : bg, color: disabled ? MID : color, border: disabled ? "none" : border, borderRadius: "10px", padding: pad, fontSize: fs, fontWeight: "700", cursor: disabled ? "not-allowed" : "pointer", width: fullWidth ? "100%" : "auto", fontFamily: "Space Grotesk, Inter, sans-serif", letterSpacing: "0.02em", transition: "opacity 0.15s", boxShadow: disabled ? "none" : variant === "primary" ? \`0 4px 14px \${G}40\` : variant === "amber" ? \`0 4px 14px \${A}40\` : "none" }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.opacity = "0.88"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
      {children}
    </button>
  );
}

function Chip({ label, color, bg }) {
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", color, background: bg || \`\${color}18\`, letterSpacing: "0.04em" }}>{label}</span>
  );
}

function OnboardingPage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [aiPlan, setAiPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("vaultai_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [form, setForm] = useState({
    brandName: "", founderName: "", email: "", phone: "",
    category: "Contemporary RTW", story: "", aesthetic: "",
    pieces: "", priceRange: "", sizes: "",
    targetAge: "", targetGender: "Women", targetStyle: "",
    goals: [], budget: "Gifting Only", timeline: "3 months",
    instagram: "", website: "",
  });

  const goalOptions = ["Magazine Features", "Influencer Placements", "Retail Buyers", "Celebrity Styling", "E-commerce Boost", "Brand Awareness"];
  const f = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const toggleGoal = (g) => setForm(prev => ({ ...prev, goals: prev.goals.includes(g) ? prev.goals.filter(x => x !== g) : [...prev.goals, g] }));

  const canNext = [
    form.brandName && form.founderName && form.email,
    form.story && form.category,
    form.pieces && form.targetAge,
    form.goals.length > 0,
  ][step] ?? true;

  const generatePlan = async () => {
    setLoading(true);
    try {
      const key = apiKey || localStorage.getItem("vaultai_key");
      if (!key) { setShowKeyInput(true); setLoading(false); return; }
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: FASHION_AI + "\\n\\nReturn ONLY valid JSON. No markdown. No backticks.",
          messages: [{ role: "user", content: \`Create a placement plan for this brand. Return ONLY this JSON:\\n{"headline":"short bold result promise","channels":["channel1","channel2","channel3"],"estimatedPlacements":number,"estimatedMonthlyRevenue":"\$X,XXX–\$X,XXX","firstAction":"single most impactful first step","timelineWeeks":number,"influencerTier":"best influencer tier for this brand","topRetailer":"best retail target"}\\n\\nBrand: \${form.brandName} | Category: \${form.category} | Price Range: \${form.priceRange} | Target: \${form.targetAge} \${form.targetGender} | Goals: \${form.goals.join(", ")} | Budget: \${form.budget}\` }],
        }),
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content[0].text.replace(/\`\`\`json|\`\`\`/g, "").trim());
      setAiPlan(parsed);
    } catch {
      setAiPlan({ headline: "You're ready to scale.", channels: ["Influencer Gifting", "Boutique Retail", "Editorial Outreach"], estimatedPlacements: 8, estimatedMonthlyRevenue: "\$4,000–\$12,000", firstAction: "Build a press kit and send to 20 micro-influencers", timelineWeeks: 8, influencerTier: "Micro (10K–100K)", topRetailer: "Specialty boutiques" });
    }
    setLoading(false);
    setSubmitted(true);
  };

  if (showKeyInput) return (
    <div style={{ minHeight: "100vh", background: N, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: W, borderRadius: "20px", padding: "48px 40px", width: "380px", textAlign: "center" }}>
        <div style={{ fontSize: "32px", marginBottom: "12px" }}>🔑</div>
        <h2 style={{ fontSize: "20px", fontWeight: "900", color: DARK, margin: "0 0 8px", fontFamily: "Space Grotesk, sans-serif" }}>Enter Anthropic API Key</h2>
        <p style={{ color: MID, fontSize: "13px", margin: "0 0 20px" }}>Needed to power VAULTAI. Stored locally in your browser.</p>
        <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-ant-api03-..." style={{ width: "100%", boxSizing: "border-box", border: \`2px solid \${BORDER}\`, borderRadius: "10px", padding: "12px 14px", fontSize: "13px", color: DARK, outline: "none", marginBottom: "12px", fontFamily: "Inter, sans-serif" }} />
        <Btn onClick={() => { localStorage.setItem("vaultai_key", apiKey); setShowKeyInput(false); generatePlan(); }} variant="primary" fullWidth size="lg" disabled={!apiKey}>Save & Continue →</Btn>
      </div>
    </div>
  );

  if (submitted && aiPlan) return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ maxWidth: "520px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: G_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "28px" }}>✓</div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: DARK, margin: "0 0 8px", fontFamily: "Space Grotesk, sans-serif" }}>You're in the Vault.</h1>
          <p style={{ color: MID, fontSize: "15px", margin: 0 }}>Our AI built your placement strategy. Here's what's coming.</p>
        </div>
        <div style={{ background: W, borderRadius: "16px", padding: "28px", marginBottom: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: "18px", fontWeight: "800", color: G, marginBottom: "20px", fontFamily: "Space Grotesk, sans-serif" }}>{aiPlan.headline}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            {[
              { l: "Est. Monthly Revenue", v: aiPlan.estimatedMonthlyRevenue, c: G },
              { l: "Projected Placements", v: aiPlan.estimatedPlacements, c: A },
              { l: "Timeline", v: \`\${aiPlan.timelineWeeks} weeks\`, c: N },
              { l: "Influencer Tier", v: aiPlan.influencerTier, c: C },
            ].map(s => (
              <div key={s.l} style={{ background: BG, borderRadius: "10px", padding: "14px" }}>
                <div style={{ fontSize: "11px", color: MID, fontWeight: "600", marginBottom: "4px" }}>{s.l}</div>
                <div style={{ fontSize: "16px", fontWeight: "800", color: s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: N, borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: "600", marginBottom: "4px" }}>YOUR FIRST ACTION</div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: W }}>{aiPlan.firstAction}</div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {aiPlan.channels && aiPlan.channels.map(ch => <Chip key={ch} label={ch} color={G} />)}
          </div>
        </div>
        <div style={{ background: A_LIGHT, borderRadius: "12px", padding: "16px 20px", textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "13px", color: DARK, fontWeight: "600" }}>
            📩 A VNC placement agent will contact <strong>{form.email}</strong> within 24 hours to activate your account.
          </div>
        </div>
        <Btn onClick={() => onComplete({ ...form, aiPlan })} variant="primary" fullWidth size="lg">Enter FashionVault Dashboard →</Btn>
      </div>
    </div>
  );

  const steps = [
    <div key="s0">
      <h2 style={{ fontSize: "22px", fontWeight: "800", color: DARK, margin: "0 0 4px", fontFamily: "Space Grotesk, sans-serif" }}>Tell us about your brand</h2>
      <p style={{ color: MID, fontSize: "14px", margin: "0 0 24px" }}>This is where your placement journey starts.</p>
      <Input label="Brand Name" value={form.brandName} onChange={v => f("brandName", v)} placeholder="e.g. MAISON VOID" required />
      <Input label="Your Name" value={form.founderName} onChange={v => f("founderName", v)} placeholder="Founder / Contact name" required />
      <Input label="Email" type="email" value={form.email} onChange={v => f("email", v)} placeholder="brand@email.com" required />
      <Input label="Phone (optional)" value={form.phone} onChange={v => f("phone", v)} placeholder="+1 (000) 000-0000" />
      <Input label="Instagram Handle" value={form.instagram} onChange={v => f("instagram", v)} placeholder="@yourbrand" />
      <Input label="Website" value={form.website} onChange={v => f("website", v)} placeholder="https://yourbrand.com" />
    </div>,
    <div key="s1">
      <h2 style={{ fontSize: "22px", fontWeight: "800", color: DARK, margin: "0 0 4px", fontFamily: "Space Grotesk, sans-serif" }}>Your collection</h2>
      <p style={{ color: MID, fontSize: "14px", margin: "0 0 24px" }}>Help us understand what we're placing.</p>
      <Select label="Category" value={form.category} onChange={v => f("category", v)} options={["Contemporary RTW", "Luxury RTW", "Streetwear", "Sustainable Fashion", "Athleisure", "Avant-Garde", "Bridal", "Menswear", "Accessories", "Swimwear"]} required />
      <Textarea label="Brand Story & Aesthetic" value={form.story} onChange={v => f("story", v)} placeholder="What makes your brand different? What's the story?" required />
      <Input label="Number of Pieces in Collection" value={form.pieces} onChange={v => f("pieces", v)} placeholder="e.g. 24" required />
      <Input label="Price Range" value={form.priceRange} onChange={v => f("priceRange", v)} placeholder="e.g. \$80–\$450 retail" />
      <Input label="Available Sizes" value={form.sizes} onChange={v => f("sizes", v)} placeholder="e.g. XS–XL" />
    </div>,
    <div key="s2">
      <h2 style={{ fontSize: "22px", fontWeight: "800", color: DARK, margin: "0 0 4px", fontFamily: "Space Grotesk, sans-serif" }}>Who wears your brand?</h2>
      <p style={{ color: MID, fontSize: "14px", margin: "0 0 24px" }}>We'll match you to the right channels.</p>
      <Input label="Target Age Range" value={form.targetAge} onChange={v => f("targetAge", v)} placeholder="e.g. 22–35" required />
      <Select label="Primary Gender" value={form.targetGender} onChange={v => f("targetGender", v)} options={["Women", "Men", "Unisex", "Non-binary focused"]} />
      <Textarea label="Customer Style Profile" value={form.targetStyle} onChange={v => f("targetStyle", v)} placeholder="Describe your ideal customer's vibe, lifestyle, and shopping habits..." />
    </div>,
    <div key="s3">
      <h2 style={{ fontSize: "22px", fontWeight: "800", color: DARK, margin: "0 0 4px", fontFamily: "Space Grotesk, sans-serif" }}>What do you want to achieve?</h2>
      <p style={{ color: MID, fontSize: "14px", margin: "0 0 20px" }}>Pick everything that matters to you.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
        {goalOptions.map(g => {
          const selected = form.goals.includes(g);
          return (
            <div key={g} onClick={() => toggleGoal(g)} style={{ border: \`2px solid \${selected ? G : BORDER}\`, borderRadius: "10px", padding: "12px 14px", cursor: "pointer", background: selected ? G_LIGHT : W, transition: "all 0.15s" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: selected ? G : DARK }}>{g}</div>
            </div>
          );
        })}
      </div>
      <Select label="Marketing Budget" value={form.budget} onChange={v => f("budget", v)} options={["Gifting Only", "\$500–\$2,000/mo", "\$2,000–\$5,000/mo", "\$5,000–\$15,000/mo", "\$15,000+/mo"]} />
      <Select label="Launch Timeline" value={form.timeline} onChange={v => f("timeline", v)} options={["ASAP", "1 month", "3 months", "6 months", "Flexible"]} />
    </div>,
  ];

  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <div style={{ background: \`linear-gradient(135deg, \${N} 0%, #162740 100%)\`, padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px", fontWeight: "900", color: W, fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.02em" }}>VNC</span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>·</span>
          <span style={{ fontSize: "14px", fontWeight: "700", color: G }}>FashionVault</span>
        </div>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: "600" }}>AI Placement Platform</span>
      </div>
      <div style={{ maxWidth: "540px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "36px" }}>
          {ONBOARDING_STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: "4px", borderRadius: "2px", marginBottom: "6px", background: i <= step ? G : BORDER, transition: "background 0.3s" }} />
              <div style={{ fontSize: "10px", fontWeight: "700", color: i <= step ? G : MID, letterSpacing: "0.03em" }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ background: W, borderRadius: "16px", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", marginBottom: "20px" }}>
          {steps[step]}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            {step > 0 && <Btn onClick={() => setStep(s => s - 1)} variant="outline" size="md">← Back</Btn>}
            {step < ONBOARDING_STEPS.length - 2 ? (
              <Btn onClick={() => setStep(s => s + 1)} variant="primary" disabled={!canNext} fullWidth={step === 0} size="md">Continue →</Btn>
            ) : (
              <Btn onClick={generatePlan} variant="primary" disabled={!canNext || loading} fullWidth size="md">
                {loading ? "Building your strategy..." : "Generate My Placement Plan →"}
              </Btn>
            )}
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: "12px", color: MID }}>
          Already have an account? <span style={{ color: G, fontWeight: "700", cursor: "pointer" }} onClick={() => onComplete(null)}>Sign in →</span>
        </p>
      </div>
    </div>
  );
}

function Dashboard({ clients, setClients, setView }) {
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const chatBottom = useRef(null);

  const totalRevenue = clients.reduce((s, c) => s + c.revenue, 0);
  const totalPlacements = clients.reduce((s, c) => s + c.placements, 0);

  useEffect(() => {
    if (selectedClient) {
      setChatMsgs([{ role: "assistant", content: \`Ready to work on **\${selectedClient.name}** (\${selectedClient.category}). What placement do you want to run?\` }]);
      setActiveAction(null);
    }
  }, [selectedClient && selectedClient.id]);

  useEffect(() => { chatBottom.current && chatBottom.current.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs]);

  const getKey = () => localStorage.getItem("vaultai_key") || "";

  const sendChat = async (msg) => {
    const next = [...chatMsgs, { role: "user", content: msg }];
    setChatMsgs(next); setChatInput(""); setChatLoading(true);
    try {
      const key = getKey();
      const headers = { "Content-Type": "application/json", "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" };
      if (key) headers["x-api-key"] = key;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers,
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: FASHION_AI + \`\\n\\nActive client: \${selectedClient && selectedClient.name} | \${selectedClient && selectedClient.category} | Target: \${selectedClient && selectedClient.target} | Pieces: \${selectedClient && selectedClient.pieces}\`,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setChatMsgs(p => [...p, { role: "assistant", content: data.content[0].text }]);
    } catch (e) {
      setChatMsgs(p => [...p, { role: "assistant", content: \`⚠ \${e.message || "API error — add your Anthropic key via the key icon above."}\` }]);
    }
    setChatLoading(false);
  };

  const quickActions = [
    { id: "stylist", label: "Stylist Outreach", color: N, prompt: \`Generate a complete stylist outreach strategy for \${selectedClient && selectedClient.name} including pitch email, loan program terms, and top 10 stylist types to target.\` },
    { id: "influencer", label: "Influencer Campaign", color: C, prompt: \`Build a full influencer campaign for \${selectedClient && selectedClient.name}: tiers, gifting strategy, content brief, outreach DM template, and KPIs.\` },
    { id: "retail", label: "Retail Pitch", color: A, prompt: \`Create a retail buyer pitch for \${selectedClient && selectedClient.name}: best channels, buyer cold email, consignment vs wholesale recommendation, trade show strategy.\` },
    { id: "editorial", label: "Press Pitch", color: G, prompt: \`Write an editorial placement pitch for \${selectedClient && selectedClient.name}: target publications, editor pitch email, press kit checklist, story angles.\` },
  ];

  const renderMsg = (text) => text.split("\\n").map((line, i) => {
    if (!line) return <div key={i} style={{ height: "6px" }} />;
    if (line.startsWith("**") || line.startsWith("##")) return <div key={i} style={{ fontWeight: "800", color: DARK, fontSize: "13px", margin: "10px 0 4px" }}>{line.replace(/\\*\\*|##/g, "")}</div>;
    if (line.startsWith("- ") || line.startsWith("• ")) return <div key={i} style={{ paddingLeft: "12px", borderLeft: \`3px solid \${G}\`, margin: "3px 0", fontSize: "13px", color: DARK }}>{line.slice(2)}</div>;
    return <div key={i} style={{ fontSize: "13px", color: DARK, lineHeight: 1.65 }}>{line.replace(/\\*\\*/g, "")}</div>;
  });

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", flexDirection: "column" }}>
      <div style={{ background: W, borderBottom: \`1px solid \${BORDER}\`, padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px", fontWeight: "900", color: N, fontFamily: "Space Grotesk, sans-serif" }}>VNC</span>
          <span style={{ color: BORDER, fontSize: "20px" }}>·</span>
          <span style={{ fontSize: "13px", fontWeight: "700", color: DARK }}>FashionVault</span>
          <span style={{ background: G_LIGHT, color: G, fontSize: "10px", fontWeight: "800", padding: "3px 8px", borderRadius: "20px" }}>LIVE</span>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button onClick={() => { const k = prompt("Enter Anthropic API key (stored locally):"); if (k) localStorage.setItem("vaultai_key", k); }} title="Set API Key" style={{ background: "none", border: \`1.5px solid \${BORDER}\`, borderRadius: "8px", padding: "5px 10px", cursor: "pointer", fontSize: "16px" }}>🔑</button>
          <Btn onClick={() => setView("onboarding")} variant="outline" size="sm">+ New Client</Btn>
          <Btn onClick={() => setView("backend")} variant="navy" size="sm">Overseer Dashboard</Btn>
        </div>
      </div>

      <div style={{ background: W, borderBottom: \`1px solid \${BORDER}\`, padding: "16px 24px", display: "flex", gap: "16px", overflowX: "auto" }}>
        {[
          { l: "Total Revenue", v: \`\$\${(totalRevenue / 1000).toFixed(1)}K\`, c: G, bg: G_LIGHT },
          { l: "Total Placements", v: totalPlacements, c: A, bg: A_LIGHT },
          { l: "Active Brands", v: clients.filter(cl => cl.status === "Active").length, c: N, bg: "#EEF2FF" },
          { l: "In Negotiation", v: clients.filter(cl => cl.status === "Negotiation").length, c: C, bg: C_LIGHT },
          { l: "Media Value", v: "\$214K", c: DARK, bg: BG },
        ].map(s => (
          <div key={s.l} style={{ background: s.bg, borderRadius: "12px", padding: "14px 20px", minWidth: "130px", flex: 1 }}>
            <div style={{ fontSize: "11px", color: MID, fontWeight: "700", marginBottom: "4px" }}>{s.l}</div>
            <div style={{ fontSize: "24px", fontWeight: "900", color: s.c, fontFamily: "Space Grotesk, sans-serif" }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: "500px" }}>
        <div style={{ width: "260px", background: W, borderRight: \`1px solid \${BORDER}\`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "16px", borderBottom: \`1px solid \${BORDER}\`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontWeight: "800", color: DARK }}>CLIENT ROSTER</span>
            <Chip label={\`\${clients.length} brands\`} color={MID} bg={BG} />
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {clients.map(cl => (
              <div key={cl.id} onClick={() => setSelectedClient(cl)} style={{ padding: "14px 16px", borderBottom: \`1px solid \${BORDER}\`, background: selectedClient && selectedClient.id === cl.id ? G_LIGHT : W, borderLeft: \`4px solid \${selectedClient && selectedClient.id === cl.id ? G : "transparent"}\`, cursor: "pointer", transition: "all 0.15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: DARK, fontFamily: "Space Grotesk, sans-serif" }}>{cl.name}</div>
                    <div style={{ fontSize: "11px", color: MID, marginTop: "2px" }}>{cl.category}</div>
                  </div>
                  <Chip label={cl.status} color={statusColor[cl.status]} />
                </div>
                <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                  <div><span style={{ fontSize: "15px", fontWeight: "800", color: G }}>{cl.placements}</span><span style={{ fontSize: "10px", color: MID, marginLeft: "3px" }}>placed</span></div>
                  <div><span style={{ fontSize: "15px", fontWeight: "800", color: A }}>\${(cl.revenue / 1000).toFixed(1)}K</span></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: \`1px solid \${BORDER}\`, padding: "14px 16px" }}>
            <div style={{ fontSize: "11px", fontWeight: "800", color: DARK, marginBottom: "10px" }}>LIVE ACTIVITY</div>
            {ACTIVITY.slice(0, 3).map((a, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: typeColor[a.type] || N }}>{a.brand}</div>
                <div style={{ fontSize: "11px", color: DARK }}>{a.action}</div>
                <div style={{ fontSize: "10px", color: MID }}>{a.time} · <span style={{ color: G, fontWeight: "700" }}>{a.value}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {selectedClient ? (
            <>
              <div style={{ background: W, borderBottom: \`1px solid \${BORDER}\`, padding: "16px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "900", color: DARK, fontFamily: "Space Grotesk, sans-serif" }}>{selectedClient.name}</div>
                    <div style={{ fontSize: "13px", color: MID }}>{selectedClient.category} · {selectedClient.target} · {selectedClient.pieces} pieces</div>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <Chip label={selectedClient.tier} color={tierColor[selectedClient.tier]} bg={tierBg[selectedClient.tier]} />
                    <Chip label={selectedClient.status} color={statusColor[selectedClient.status]} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {quickActions.map(qa => (
                    <button key={qa.id} onClick={() => { setActiveAction(qa.id); sendChat(qa.prompt); }}
                      style={{ background: activeAction === qa.id ? qa.color : BG, color: activeAction === qa.id ? W : DARK, border: \`1.5px solid \${activeAction === qa.id ? qa.color : BORDER}\`, borderRadius: "8px", padding: "7px 14px", fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "all 0.15s" }}>
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px", background: BG }}>
                {chatMsgs.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ maxWidth: "86%", background: m.role === "user" ? N : W, borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px", padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                      {m.role === "assistant" && <div style={{ fontSize: "10px", fontWeight: "800", color: G, marginBottom: "6px", letterSpacing: "0.05em" }}>VAULTAI</div>}
                      <div style={{ color: m.role === "user" ? W : DARK }}>
                        {m.role === "assistant" ? renderMsg(m.content) : <span style={{ fontSize: "13px" }}>{m.content}</span>}
                      </div>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", gap: "5px", padding: "8px" }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: G, animation: \`bounce 0.8s \${i * 0.15}s infinite\` }} />)}
                  </div>
                )}
                <div ref={chatBottom} />
              </div>

              <div style={{ background: W, borderTop: \`1px solid \${BORDER}\`, padding: "14px 24px", display: "flex", gap: "10px" }}>
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && chatInput.trim() && sendChat(chatInput.trim())}
                  placeholder="Ask about placements, pricing, outreach, negotiations..."
                  style={{ flex: 1, border: \`1.5px solid \${BORDER}\`, borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: DARK, fontFamily: "Inter, sans-serif", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = G}
                  onBlur={e => e.target.style.borderColor = BORDER}
                />
                <Btn onClick={() => chatInput.trim() && sendChat(chatInput.trim())} variant="primary" disabled={!chatInput.trim() || chatLoading}>Send</Btn>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: MID }}>Select a client to start</div>
          )}
        </div>
      </div>
    </div>
  );
}

function BackendPage({ clients, setClients, setView }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState("overview");
  const [editClient, setEditClient] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsReport, setAnalyticsReport] = useState(null);

  const login = () => { if (pw === "VNC2026") { setAuthed(true); setPwError(false); } else setPwError(true); };
  const totalRevenue = clients.reduce((s, c) => s + c.revenue, 0);
  const totalPlacements = clients.reduce((s, c) => s + c.placements, 0);
  const avgRevenue = clients.length ? Math.round(totalRevenue / clients.length) : 0;

  const generateAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const key = localStorage.getItem("vaultai_key") || "";
      const headers = { "Content-Type": "application/json", "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" };
      if (key) headers["x-api-key"] = key;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers,
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: FASHION_AI + "\\n\\nReturn ONLY valid JSON. No markdown.",
          messages: [{ role: "user", content: \`Analyze this fashion placement agency portfolio. Return ONLY this JSON:\\n{"healthScore":number_0_to_100,"topPerformer":"brand name","bottleneck":"biggest issue","monthlyGrowth":"X%","recommendation":"single most impactful agency action","riskAlert":"any red flag","revenueTarget":"realistic next quarter target","expandOpportunity":"best growth opportunity"}\\n\\nPortfolio: \${clients.map(c => \`\${c.name}(\${c.category}, \${c.status}, \${c.placements} placements, \$\${c.revenue})\`).join(" | ")}\` }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      setAnalyticsReport(JSON.parse(data.content[0].text.replace(/\`\`\`json|\`\`\`/g, "").trim()));
    } catch {
      setAnalyticsReport({ healthScore: 74, topPerformer: "AUREUM NOIR", bottleneck: "Intake-to-active conversion speed", monthlyGrowth: "18%", recommendation: "Accelerate editorial pipeline — highest ROI channel", riskAlert: "NXGEN ATELIER has zero placements after intake", revenueTarget: "\$120K next quarter", expandOpportunity: "Add 2 sustainable brands — category is surging" });
    }
    setAnalyticsLoading(false);
  };

  const deleteClient = (id) => setClients(prev => prev.filter(c => c.id !== id));
  const saveEdit = (updated) => { setClients(prev => prev.map(c => c.id === updated.id ? updated : c)); setEditClient(null); };
  const updateStatus = (id, status) => setClients(prev => prev.map(c => c.id === id ? { ...c, status } : c));

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: N, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: W, borderRadius: "20px", padding: "48px 40px", width: "360px", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🔐</div>
        <h2 style={{ fontSize: "22px", fontWeight: "900", color: DARK, margin: "0 0 6px", fontFamily: "Space Grotesk, sans-serif" }}>Overseer Access</h2>
        <p style={{ color: MID, fontSize: "13px", margin: "0 0 28px" }}>VNC internal use only</p>
        <input type="password" value={pw} onChange={e => { setPw(e.target.value); setPwError(false); }} onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Enter access code"
          style={{ width: "100%", boxSizing: "border-box", border: \`2px solid \${pwError ? C : BORDER}\`, borderRadius: "10px", padding: "12px 14px", fontSize: "14px", color: DARK, outline: "none", marginBottom: "8px", fontFamily: "Inter, sans-serif", textAlign: "center" }}
        />
        {pwError && <div style={{ color: C, fontSize: "12px", marginBottom: "12px" }}>Incorrect code. Try again.</div>}
        <Btn onClick={login} variant="navy" fullWidth size="lg">Enter →</Btn>
        <div style={{ marginTop: "16px" }}><span style={{ color: G, fontSize: "12px", fontWeight: "700", cursor: "pointer" }} onClick={() => setView("dashboard")}>← Back to Dashboard</span></div>
        <div style={{ marginTop: "20px", padding: "10px", background: BG, borderRadius: "8px" }}><div style={{ fontSize: "11px", color: MID }}>Demo code: <strong>VNC2026</strong></div></div>
      </div>
    </div>
  );

  const TABS = ["overview", "clients", "analytics", "activity"];

  return (
    <div style={{ minHeight: "100vh", background: BG }}>
      <div style={{ background: N, padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "16px", fontWeight: "900", color: W, fontFamily: "Space Grotesk, sans-serif" }}>VNC</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span style={{ fontSize: "13px", fontWeight: "700", color: G }}>Overseer Backend</span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? G : "transparent", border: "none", color: tab === t ? "#000" : "rgba(255,255,255,0.5)", padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
          ))}
          <button onClick={() => setView("dashboard")} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: W, padding: "6px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", marginLeft: "8px" }}>← Exit</button>
        </div>
      </div>

      <div style={{ padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>
        {tab === "overview" && (
          <>
            <h2 style={{ fontSize: "24px", fontWeight: "900", color: DARK, margin: "0 0 20px", fontFamily: "Space Grotesk, sans-serif" }}>Agency Overview</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
              {[
                { l: "Total Revenue", v: \`\$\${(totalRevenue / 1000).toFixed(1)}K\`, c: G, bg: G_LIGHT },
                { l: "Total Placements", v: totalPlacements, c: A, bg: A_LIGHT },
                { l: "Total Clients", v: clients.length, c: N, bg: "#EEF2FF" },
                { l: "Avg Revenue/Client", v: \`\$\${(avgRevenue / 1000).toFixed(1)}K\`, c: C, bg: C_LIGHT },
              ].map(s => (
                <div key={s.l} style={{ background: s.bg, borderRadius: "14px", padding: "20px" }}>
                  <div style={{ fontSize: "11px", color: MID, fontWeight: "700", marginBottom: "6px" }}>{s.l}</div>
                  <div style={{ fontSize: "30px", fontWeight: "900", color: s.c, fontFamily: "Space Grotesk, sans-serif" }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: W, borderRadius: "14px", padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "14px", fontWeight: "800", color: DARK, marginBottom: "16px" }}>Revenue by Client</div>
              {clients.map(cl => {
                const pct = totalRevenue > 0 ? (cl.revenue / totalRevenue) * 100 : 0;
                return (
                  <div key={cl.id} style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: DARK }}>{cl.name}</span>
                      <span style={{ fontSize: "13px", fontWeight: "800", color: G }}>\${(cl.revenue / 1000).toFixed(1)}K</span>
                    </div>
                    <div style={{ height: "8px", background: BG, borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: \`\${pct}%\`, background: \`linear-gradient(90deg, \${G}, \${A})\`, borderRadius: "4px", transition: "width 0.6s" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "clients" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "900", color: DARK, margin: 0, fontFamily: "Space Grotesk, sans-serif" }}>Client Management</h2>
              <Btn onClick={() => setView("onboarding")} variant="primary">+ Onboard New Client</Btn>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {clients.map(cl => (
                <div key={cl.id} style={{ background: W, borderRadius: "14px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", fontWeight: "900", color: DARK, fontFamily: "Space Grotesk, sans-serif" }}>{cl.name}</span>
                      <Chip label={cl.tier} color={tierColor[cl.tier]} bg={tierBg[cl.tier]} />
                    </div>
                    <div style={{ fontSize: "12px", color: MID }}>{cl.category} · {cl.contact} · Joined {cl.joinDate}</div>
                  </div>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "900", color: G }}>{cl.placements}</div><div style={{ fontSize: "10px", color: MID }}>placed</div></div>
                    <div style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "900", color: A }}>\${(cl.revenue / 1000).toFixed(1)}K</div><div style={{ fontSize: "10px", color: MID }}>revenue</div></div>
                    <div style={{ textAlign: "center" }}><div style={{ fontSize: "18px", fontWeight: "900", color: N }}>{cl.campaigns}</div><div style={{ fontSize: "10px", color: MID }}>campaigns</div></div>
                  </div>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <select value={cl.status} onChange={e => updateStatus(cl.id, e.target.value)}
                      style={{ border: \`1.5px solid \${BORDER}\`, borderRadius: "8px", padding: "5px 8px", fontSize: "11px", fontWeight: "700", color: statusColor[cl.status], outline: "none" }}>
                      {["Intake", "Outreach", "Negotiation", "Active"].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <Btn onClick={() => setEditClient({ ...cl })} variant="outline" size="sm">Edit</Btn>
                    <Btn onClick={() => deleteClient(cl.id)} variant="coral" size="sm">Remove</Btn>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "analytics" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "900", color: DARK, margin: 0, fontFamily: "Space Grotesk, sans-serif" }}>AI Analytics Report</h2>
              <Btn onClick={generateAnalytics} variant="primary" disabled={analyticsLoading}>{analyticsLoading ? "Analyzing..." : "Generate Report"}</Btn>
            </div>
            {!analyticsReport && !analyticsLoading && (
              <div style={{ background: W, borderRadius: "14px", padding: "48px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>📊</div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: DARK, marginBottom: "8px" }}>Run your agency health check</div>
                <div style={{ fontSize: "13px", color: MID }}>AI analyzes your full portfolio and surfaces what to do next.</div>
              </div>
            )}
            {analyticsReport && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ background: W, borderRadius: "14px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", gridColumn: "1 / -1", display: "flex", gap: "24px", alignItems: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "56px", fontWeight: "900", color: analyticsReport.healthScore >= 70 ? G : C, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1 }}>{analyticsReport.healthScore}</div>
                    <div style={{ fontSize: "12px", color: MID, fontWeight: "700" }}>AGENCY HEALTH</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: "12px", background: BG, borderRadius: "6px", overflow: "hidden", marginBottom: "16px" }}>
                      <div style={{ height: "100%", width: \`\${analyticsReport.healthScore}%\`, background: \`linear-gradient(90deg, \${G}, \${A})\`, borderRadius: "6px" }} />
                    </div>
                    <div style={{ background: N, borderRadius: "10px", padding: "14px" }}>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", fontWeight: "700", marginBottom: "4px" }}>TOP RECOMMENDATION</div>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: W }}>{analyticsReport.recommendation}</div>
                    </div>
                  </div>
                </div>
                {[
                  { l: "Top Performer", v: analyticsReport.topPerformer, c: G, icon: "🏆" },
                  { l: "Monthly Growth", v: analyticsReport.monthlyGrowth, c: A, icon: "📈" },
                  { l: "Revenue Target", v: analyticsReport.revenueTarget, c: G, icon: "💰" },
                  { l: "Growth Opportunity", v: analyticsReport.expandOpportunity, c: N, icon: "🚀" },
                ].map(s => (
                  <div key={s.l} style={{ background: W, borderRadius: "14px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontSize: "20px", marginBottom: "8px" }}>{s.icon}</div>
                    <div style={{ fontSize: "11px", color: MID, fontWeight: "700", marginBottom: "4px" }}>{s.l}</div>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: s.c }}>{s.v}</div>
                  </div>
                ))}
                <div style={{ background: C_LIGHT, border: \`1.5px solid \${C}30\`, borderRadius: "14px", padding: "20px", gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: "12px", fontWeight: "800", color: C, marginBottom: "6px" }}>⚠ RISK ALERT</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: DARK }}>{analyticsReport.riskAlert}</div>
                </div>
                <div style={{ background: A_LIGHT, border: \`1.5px solid \${A}30\`, borderRadius: "14px", padding: "20px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "800", color: A, marginBottom: "6px" }}>BOTTLENECK</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: DARK }}>{analyticsReport.bottleneck}</div>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "activity" && (
          <>
            <h2 style={{ fontSize: "24px", fontWeight: "900", color: DARK, margin: "0 0 20px", fontFamily: "Space Grotesk, sans-serif" }}>Activity Log</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ background: W, borderRadius: "12px", padding: "16px 20px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: \`\${typeColor[a.type]}18\`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                    {a.type === "editorial" ? "📰" : a.type === "retail" ? "🏪" : a.type === "influencer" ? "📱" : "✨"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: DARK }}>{a.action}</div>
                    <div style={{ fontSize: "11px", color: MID }}>{a.brand} · {a.time}</div>
                  </div>
                  <Chip label={a.value} color={typeColor[a.type]} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {editClient && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: W, borderRadius: "16px", padding: "32px", width: "420px", maxHeight: "80vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "900", color: DARK, margin: "0 0 20px", fontFamily: "Space Grotesk, sans-serif" }}>Edit {editClient.name}</h3>
            <Input label="Brand Name" value={editClient.name} onChange={v => setEditClient(e => ({ ...e, name: v }))} />
            <Input label="Category" value={editClient.category} onChange={v => setEditClient(e => ({ ...e, category: v }))} />
            <Input label="Contact Email" value={editClient.contact} onChange={v => setEditClient(e => ({ ...e, contact: v }))} />
            <Input label="Target Market" value={editClient.target} onChange={v => setEditClient(e => ({ ...e, target: v }))} />
            <Input label="Placements" type="number" value={String(editClient.placements)} onChange={v => setEditClient(e => ({ ...e, placements: parseInt(v) || 0 }))} />
            <Input label="Revenue (\$)" type="number" value={String(editClient.revenue)} onChange={v => setEditClient(e => ({ ...e, revenue: parseInt(v) || 0 }))} />
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <Btn onClick={() => setEditClient(null)} variant="outline" fullWidth>Cancel</Btn>
              <Btn onClick={() => saveEdit(editClient)} variant="primary" fullWidth>Save Changes</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [view, setView] = useState("onboarding");
  const [clients, setClients] = useState(INIT_CLIENTS);

  const handleOnboardComplete = (data) => {
    if (data) {
      setClients(prev => [...prev, {
        id: Date.now(),
        name: data.brandName.toUpperCase(),
        category: data.category,
        status: "Intake",
        placements: 0,
        revenue: 0,
        target: \`\${data.targetGender} \${data.targetAge}\`,
        tier: "Starter",
        joinDate: new Date().toISOString().slice(0, 10),
        pieces: parseInt(data.pieces) || 10,
        campaigns: 0,
        contact: data.email,
      }]);
    }
    setView("dashboard");
  };

  return (
    <>
      {view === "onboarding" && <OnboardingPage onComplete={handleOnboardComplete} />}
      {view === "dashboard" && <Dashboard clients={clients} setClients={setClients} setView={setView} />}
      {view === "backend" && <BackendPage clients={clients} setClients={setClients} setView={setView} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
</script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(HTML);
});

server.listen(PORT, () => {
  console.log('FashionVault running on port ' + PORT);
});
