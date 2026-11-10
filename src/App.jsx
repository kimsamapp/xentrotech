import { useState, useEffect, useRef } from "react";

/* ============================================================
   XentroTech Solutions landing page
   EDIT ME: contact details, work photos and text content below.
   WORKS: fill each list with {src, alt, cap} to replace the sample images.
   ============================================================ */
const C={email:"hello@xentrotech.com",tel:"+630000000000",telShow:"+63 000 000 0000",addr:"Cebu City, Cebu, Philippines",hours:"Mon to Sat, 9:00 AM to 6:00 PM"};

const WORKS={about:[],solar:[],cctv:[],repair:[],cabling:[]};

const ICO={
call:"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
mail:"M3 5h18v14H3zM3 7l9 6 9-6",text:"M4 4h16v12H8l-4 4z",
pin:"M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
clock:"M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",arrow:"M5 12h14M13 6l6 6-6 6",plus:"M12 5v14M5 12h14",
image:"M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M8.5 9.5h.01",menu:"M4 7h16M4 12h16M4 17h16",close:"M6 6l12 12M18 6 6 18"
};

const SERVICES=[
["solar","Solar power installation","Cut your electricity bill with solar systems sized for your home, shop or business."],
["cctv","CCTV and security cameras","Clear day-and-night coverage with recording and live viewing on your phone."],
["repair","Computer repair","Fast repair, upgrades and cleanup for desktops and laptops, at your place or ours."],
["cabling","Network cabling","Neat, tested LAN and Wi-Fi cabling for offices, shops and schools."]
];

const DET={
solar:{f:["Site and roof assessment to size your system correctly","Grid-tied, hybrid and off-grid solar for homes and businesses","Panel, inverter and battery supply and installation","Monitoring setup and after-install maintenance"],tools:"Grid-tied, hybrid, off-grid",time:"1 to 4 weeks"},
cctv:{f:["Site check and camera placement plan with no blind spots","IP and analog cameras for indoor and outdoor use, day and night","DVR or NVR recording with remote viewing on your phone","Repairs, upgrades and maintenance of existing systems"],tools:"IP and analog, DVR/NVR",time:"1 to 3 days"},
repair:{f:["Desktop and laptop repair, upgrades and cleaning","Virus removal, data recovery and operating system reinstall","Screen, keyboard, battery and parts replacement","On-site visits or drop-off, for homes and offices"],tools:"All major brands",time:"Same day to 3 days"},
cabling:{f:["Structured LAN cabling for offices, shops and schools","Cat5e and Cat6 installation, patch panels and racks","Wi-Fi access point and router setup","Cable testing, labeling and a tidy finish"],tools:"Cat5e, Cat6, fiber",time:"1 to 5 days"}
};

const WORK=[
["solar","Rooftop solar for a small business","High daytime electricity bills.","A grid-tied system sized to the shop’s daytime load.","Lower monthly power cost and a system built to last."],
["cctv","CCTV for a multi-room office","Blind spots and no way to review incidents.","Eight cameras on entrances and work areas, viewable on a phone.","Full coverage with footage available from anywhere."],
["cabling","Office network cabling","Slow Wi-Fi and cables running across the floor.","Structured Cat6 cabling, patch panel and access points, all labeled.","Stable connections and easy future changes."]
];

const STEPS=[["Survey","We visit, measure and listen to what you need."],["Quote","You get a clear, itemized quote before we start."],["Install","Our technicians install and test everything."],["Support","We stay on call for repairs and maintenance."]];

const VALUES=[["Neat, safe work","Proper mounting, tested cabling and clean finishes you can trust."],["Clear quotes","Itemized pricing and no surprise costs."],["Honest advice","We recommend what you need, not the biggest package."],["Local support","A Cebu team that can visit you when something needs attention."]];

const SAMPLES={
about:[{scene:"tm",cap:"Our team"},{scene:"s1",cap:"Rooftop solar installation"},{scene:"c1",cap:"CCTV installation"},{scene:"n1",cap:"Network rack and cabling"},{scene:"wk",cap:"Our workshop"}],
solar:[{scene:"s1",cap:"Rooftop solar installation"},{scene:"s2",cap:"Panel array with inverter"}],
cctv:[{scene:"c1",cap:"Exterior cameras covering entrances"},{scene:"c2",cap:"Recorder and live monitoring"}],
repair:[{scene:"r1",cap:"Laptop repair and upgrade"},{scene:"r2",cap:"Desktop cleaning and parts replacement"}],
cabling:[{scene:"n1",cap:"Rack, patch panel and labeled cables"},{scene:"n2",cap:"Cable run to wall sockets and Wi-Fi"}]};

const PAGES=[["home","Home"],["services","Services"],["about","About us"],["contact","Get a free quote"]];

const META={
home:["XentroTech Solutions | Solar, CCTV, Computer Repair & Network Cabling in Cebu","Cebu-based XentroTech Solutions installs solar power systems and CCTV, repairs computers and runs network cabling for homes and businesses. Get a free quote."],
services:["Services | Solar, CCTV, Computer Repair & Network Cabling | XentroTech Cebu","Solar installation, CCTV and security cameras, computer repair and network cabling in Cebu. See what each service includes and how long it takes."],
about:["About Us | XentroTech Solutions Cebu","Meet XentroTech Solutions, a Cebu-based team for solar, CCTV, computer repair and network cabling. Learn how we work and what we stand for."],
contact:["Get a Free Quote | XentroTech Solutions Cebu","Request a free quote for solar, CCTV, computer repair or network cabling in Cebu. Call, text, email or send us a message."]
};

const SCENES={
solar:(<g><circle className="o fl" cx="190" cy="34" r="15"/><circle className="g pu" cx="160" cy="26" r="3.5"/><circle className="g pu" cx="214" cy="62" r="3.5"/><path className="s2 st" d="M44 122 70 62h122l-26 60z"/><path className="ln" d="M101 62 75 122M132 62 106 122M163 62 137 122M57 92h118"/><path className="ln" d="M108 122v12M72 134h74"/><path className="g" d="M38 28l-9 17h8l-4 14 13-19h-8z"/></g>),
cctv:(<g><rect className="s2 st" x="28" y="34" width="84" height="38" rx="8"/><circle className="o" cx="120" cy="53" r="14"/><circle className="s2" cx="120" cy="53" r="5"/><path className="g dim fl2" d="M136 53 156 34v38z"/><path className="ln" d="M58 72v22"/><rect className="l" x="26" y="94" width="68" height="8" rx="3"/><rect className="s2 st" x="156" y="82" width="62" height="42" rx="6"/><rect className="l" x="162" y="88" width="22" height="14"/><rect className="l" x="190" y="88" width="22" height="14"/><rect className="l" x="162" y="106" width="22" height="12"/><circle className="o pu" cx="201" cy="112" r="3.5"/><circle className="g pu" cx="44" cy="46" r="3"/></g>),
repair:(<g><rect className="s2 st" x="60" y="24" width="120" height="78" rx="8"/><path className="l" d="M42 110h156l-10 12H52z"/><path d="M96 62l16 16 32-34" fill="none" stroke="var(--green)" stroke-width="7" stroke-linecap="round" strokeLinejoin="round"/><g className="fl"><circle className="o" cx="200" cy="34" r="13"/><circle className="s2" cx="200" cy="34" r="4.5"/></g><circle className="g pu" cx="38" cy="42" r="5"/></g>),
cabling:(<g><rect className="s2 st" x="40" y="20" width="160" height="40" rx="6"/><rect className="l" x="52" y="32" width="20" height="16" rx="3"/><rect className="l" x="80" y="32" width="20" height="16" rx="3"/><rect className="l" x="108" y="32" width="20" height="16" rx="3"/><rect className="l" x="136" y="32" width="20" height="16" rx="3"/><rect className="l" x="164" y="32" width="20" height="16" rx="3"/><path className="so" d="M62 48C62 88 86 88 86 116"/><path className="sgn" d="M118 48V116"/><path className="so" d="M174 48C174 88 154 88 154 116"/><rect className="s2 st" x="66" y="116" width="108" height="24" rx="5"/><circle className="g pu" cx="82" cy="128" r="3.5"/><circle className="o pu" cx="120" cy="128" r="3.5"/><circle className="g pu" cx="158" cy="128" r="3.5"/></g>)
};

const PHOTO={
s1:(<g><circle className="o" cx="200" cy="30" r="16"/><rect className="s2 st" x="24" y="98" width="192" height="62"/><rect className="l" x="46" y="116" width="26" height="44"/><rect className="l" x="96" y="114" width="30" height="22"/><rect className="l" x="146" y="114" width="30" height="22"/><path className="g" d="M36 98l14-24h34l-14 24z"/><path className="g" d="M98 98l14-24h34l-14 24z"/><path className="g" d="M160 98l14-24h34l-14 24z"/></g>),
s2:(<g><circle className="o" cx="40" cy="32" r="16"/><path className="g dim" d="M30 140 60 40h150l-30 100z"/><path className="ln" d="M110 40 80 140M160 40 130 140M50 73h150M40 107h150"/><path className="st" style={{fill:"none"}} d="M30 140 60 40h150l-30 100z"/><rect className="l" x="196" y="118" width="30" height="40" rx="4"/><circle className="g pu" cx="211" cy="131" r="3.5"/></g>),
c1:(<g><rect className="s2 st" x="30" y="40" width="180" height="120"/><rect className="l" x="48" y="58" width="36" height="26"/><rect className="l" x="102" y="58" width="36" height="26"/><rect className="l" x="156" y="58" width="36" height="26"/><rect className="l" x="48" y="102" width="36" height="26"/><rect className="l" x="156" y="102" width="36" height="26"/><rect className="m" x="108" y="126" width="24" height="34"/><rect className="o" x="34" y="30" width="18" height="10" rx="3"/><rect className="o" x="188" y="30" width="18" height="10" rx="3"/><path className="g dim fl2" d="M52 38 94 62 62 92z"/><path className="g dim fl2" d="M188 38 146 62 178 92z"/></g>),
c2:(<g><rect className="s2 st" x="24" y="22" width="192" height="116" rx="8"/><rect className="l" x="34" y="32" width="84" height="44" rx="4"/><rect className="l" x="122" y="32" width="84" height="44" rx="4"/><rect className="l" x="34" y="82" width="84" height="44" rx="4"/><rect className="l" x="122" y="82" width="84" height="44" rx="4"/><circle className="g" cx="76" cy="56" r="6"/><rect className="o" x="150" y="48" width="28" height="18" rx="3"/><rect className="m" x="52" y="98" width="48" height="6" rx="3"/><circle className="g" cx="164" cy="104" r="6"/><circle className="o pu" cx="44" cy="42" r="3"/><circle className="o pu" cx="132" cy="42" r="3"/><rect className="l" x="108" y="138" width="24" height="12"/><rect className="l" x="90" y="150" width="60" height="6" rx="3"/></g>),
r1:(<g><rect className="s2 st" x="56" y="26" width="128" height="86" rx="8"/><path className="l" d="M36 122h168l-12 16H48z"/><path className="sgn" style={{strokeWidth:7}} d="M92 70l18 18 36-40" strokeLinejoin="round"/><rect className="o fl" x="196" y="52" width="10" height="34" rx="4" transform="rotate(30 201 69)"/><circle className="g pu" cx="34" cy="48" r="5"/></g>),
r2:(<g><rect className="s2 st" x="70" y="18" width="100" height="144" rx="8"/><circle className="l" cx="120" cy="58" r="28"/><circle className="g" cx="120" cy="58" r="8"/><path className="sgn" d="M120 34v14M120 68v14M96 58h14M130 58h14"/><rect className="o" x="86" y="100" width="68" height="12" rx="3"/><rect className="g" x="86" y="120" width="68" height="12" rx="3"/><rect className="l" x="86" y="140" width="68" height="8" rx="3"/><circle className="o pu" cx="192" cy="40" r="5"/></g>),
n1:(<g><rect className="s2 st" x="70" y="12" width="100" height="116" rx="6"/><rect className="l" x="78" y="20" width="84" height="22" rx="3"/><rect className="l" x="78" y="48" width="84" height="22" rx="3"/><rect className="l" x="78" y="76" width="84" height="22" rx="3"/><rect className="l" x="78" y="104" width="84" height="18" rx="3"/><path className="g" d="M84 27h8v8h-8zM96 27h8v8h-8zM108 27h8v8h-8zM120 27h8v8h-8zM132 27h8v8h-8zM144 27h8v8h-8zM84 55h8v8h-8zM96 55h8v8h-8zM108 55h8v8h-8zM120 55h8v8h-8zM132 55h8v8h-8zM144 55h8v8h-8z"/><path className="so" d="M92 98C92 140 56 138 52 172"/><path className="sgn" d="M120 128V172"/><path className="so" d="M148 98C148 140 184 138 188 172"/></g>),
n2:(<g><rect className="s2 st" x="20" y="18" width="200" height="144" rx="6"/><circle className="l" cx="190" cy="44" r="15"/><path className="sgn" d="M180 42a14 14 0 0 1 20 0M184 48a8 8 0 0 1 12 0"/><path className="so" d="M32 56H150V116H184"/><path className="sgn" d="M32 70H136V130H184"/><rect className="l" x="184" y="104" width="28" height="36" rx="5"/><rect className="s2" x="190" y="112" width="16" height="12" rx="2"/><circle className="o pu" cx="40" cy="30" r="4"/></g>),
tm:(<g><circle className="o" cx="68" cy="72" r="16"/><path className="l" d="M38 156a30 30 0 0 1 60 0z"/><circle className="g" cx="120" cy="64" r="18"/><path className="o" d="M104 58a16 16 0 0 1 32 0z"/><path className="l" d="M86 156a34 34 0 0 1 68 0z"/><circle className="o" cx="172" cy="74" r="16"/><path className="l" d="M142 156a30 30 0 0 1 60 0z"/><circle className="g pu" cx="210" cy="30" r="5"/></g>),
wk:(<g><rect className="s2 st" x="24" y="18" width="192" height="80" rx="6"/><rect className="o" x="44" y="32" width="9" height="46" rx="4"/><rect className="g" x="68" y="32" width="9" height="46" rx="4"/><circle className="l" cx="112" cy="56" r="17"/><rect className="m" x="142" y="38" width="36" height="8" rx="3"/><rect className="m" x="142" y="56" width="36" height="8" rx="3"/><rect className="l" x="20" y="112" width="200" height="14" rx="3"/><path className="ln" d="M40 126v36M200 126v36"/><rect className="s2 st" x="60" y="94" width="50" height="18" rx="3"/><circle className="o" cx="150" cy="104" r="8"/></g>)
};


function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="XentroTech Solutions logo">
      <defs>
        <linearGradient id="lgA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff6b1a" /><stop offset="1" stopColor="#ffb02e" /></linearGradient>
        <linearGradient id="lgB" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2ee66b" /><stop offset="1" stopColor="#9dff6a" /></linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="61" height="61" rx="17" style={{ fill: "var(--surface)", stroke: "var(--line)" }} strokeWidth="2" />
      <path d="M14 14 50 50" stroke="url(#lgA)" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M50 14 14 50" stroke="url(#lgB)" strokeWidth="6.5" strokeLinecap="round" />
      <g fill="none" strokeWidth="2.4" strokeLinecap="round" style={{ fill: "var(--bg)" }}>
        <g transform="translate(12.5 12.5) rotate(45)" stroke="#ff6b1a"><rect x="-5" y="-4.5" width="10" height="9" rx="2.5" /><path d="M-5 0h-2" /></g>
        <g transform="translate(51.5 51.5) rotate(45)" stroke="#ff6b1a"><rect x="-5" y="-4.5" width="10" height="9" rx="2.5" /><path d="M5 0h2" /></g>
        <g transform="translate(51.5 12.5) rotate(-45)" stroke="#2ee66b"><rect x="-5" y="-4.5" width="10" height="9" rx="2.5" /><path d="M-5 0h-2" /></g>
        <g transform="translate(12.5 51.5) rotate(-45)" stroke="#2ee66b"><rect x="-5" y="-4.5" width="10" height="9" rx="2.5" /><path d="M5 0h2" /></g>
      </g>
      <circle cx="32" cy="32" r="11" style={{ fill: "var(--bg)" }} stroke="#ffb02e" strokeWidth="2.6" />
      <g stroke="#ffb02e" strokeWidth="1.8" strokeLinecap="round"><path d="M32 23.6v1.6M32 38.8v1.6M23.6 32h1.6M38.8 32h1.6M26 26l1.1 1.1M36.9 36.9 38 38M26 38l1.1-1.1M36.9 27.1 38 26" /></g>
      <circle cx="32" cy="32" r="4.6" fill="#ffb02e" />
    </svg>
  );
}

/* Wordmark: the "o" in Xentro is a sun */
function Wm() {
  return (
    <span className="wm" aria-hidden="true">Xentr
      <svg className="wo" viewBox="0 0 24 24">
        <g stroke="#ffb02e" strokeWidth="2.2" strokeLinecap="round"><path d="M12 1.5v2.6M12 19.9v2.6M1.5 12h2.6M19.9 12h2.6M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" /></g>
        <circle cx="12" cy="12" r="5.4" fill="#ffb02e" />
      </svg>Tech
    </span>
  );
}

function Svg({ n, s = 20, cls = "" }) {
  return (
    <svg className={cls} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICO[n]} /></svg>
  );
}

function useSeen(margin) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect(); } }, { rootMargin: margin });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ children, d = 0, cls = "" }) {
  const [ref, seen] = useSeen("0px 0px -60px 0px");
  return <div ref={ref} className={"rv " + cls + (seen ? " in" : "")} style={{ transitionDelay: d + "ms" }}>{children}</div>;
}

function Count({ to, suf = "" }) {
  const [ref, seen] = useSeen("0px");
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    let st, raf;
    const f = (t) => { st = st || t; const p = Math.min((t - st) / 1700, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [seen]);
  return <b ref={ref}>{v}{suf}</b>;
}

const STATS = [[50, "+", "projects completed"], [4, "", "core services, one team"], [24, "h", "typical response time"]];
function Stats() {
  return <div className="stats">{STATS.map(([n, s, l]) => <div key={l}><Count to={n} suf={s} /><span>{l}</span></div>)}</div>;
}

function Art({ n }) {
  const [ref, seen] = useSeen("300px");
  return (
    <div className="art" ref={ref}>
      {seen ? <svg viewBox="0 0 240 150" role="img" aria-label={"Illustration of " + n + " service"}>{SCENES[n]}</svg> : <div className="sk" />}
    </div>
  );
}

function Pic({ m, lazy }) {
  return m.scene ? (
    <svg viewBox="0 0 240 180" preserveAspectRatio="xMidYMid slice" role="img" aria-label={m.cap}><rect className="bgr" width="240" height="180" />{PHOTO[m.scene]}</svg>
  ) : (
    <img src={m.src} alt={m.alt || m.cap || "XentroTech work sample"} loading={lazy ? "lazy" : "eager"} decoding="async" />
  );
}

function useRoute() {
  const get = () => { const h = location.hash.replace("#", ""); return PAGES.some((p) => p[0] === h) ? h : "home"; };
  const [r, setR] = useState(get);
  useEffect(() => {
    const f = () => { setR(get()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    document.title = META[r][0];
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", META[r][1]);
  }, [r]);
  return r;
}

function Header({ route }) {
  const [open, setOpen] = useState(false);
  const go = () => setOpen(false);
  return (
    <header>
      <div className="wrap bar">
        <a className="brand" href="#home" onClick={go} aria-label="XentroTech Solutions home"><Logo /><span><Wm /><small>Solutions · Cebu</small></span></a>
        <button className="menu" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}><Svg n={open ? "close" : "menu"} s={22} /></button>
        <nav id="nav" className={open ? "open" : ""} aria-label="Main">
          <ul>
            {PAGES.slice(0, 3).map(([k, l]) => <li key={k}><a href={"#" + k} aria-current={route === k ? "page" : undefined} onClick={go}>{l}</a></li>)}
            <li><a className="btn p sm" href="#contact" onClick={go}>Get a free quote<Svg n="arrow" s={16} cls="arr" /></a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Head({ title, lead }) {
  return <div className="wrap pt"><h1>{title}</h1><p className="lead">{lead}</p></div>;
}
function SHead({ title, lead }) {
  return <div className="shead"><h2>{title}</h2>{lead && <p className="lead">{lead}</p>}</div>;
}

function Cards() {
  return (
    <div className="cards">
      {SERVICES.map(([i, t, d], k) => (
        <Reveal key={t} d={k * 90}>
          <article className="card"><Art n={i} /><h3>{t}</h3><p>{d}</p><a className="more" href="#services">Learn more<Svg n="arrow" s={16} /></a></article>
        </Reveal>
      ))}
    </div>
  );
}

function Steps() {
  return <ol className="steps">{STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>;
}

function CTA() {
  return (
    <div className="wrap" style={{ paddingBottom: 88 }}>
      <div className="cta">
        <h2>Ready to get started?</h2>
        <p>Tell us what you need and we will reply with a clear, itemized quote.</p>
        <div className="row">
          <a className="btn p" href="#contact">Get a free quote<Svg n="arrow" s={18} cls="arr" /></a>
          <a className="btn g" href={"tel:" + C.tel}><Svg n="call" s={18} />Call {C.telShow}</a>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="h1"><div className="wrap">
        <div className="grid">
          <div>
            <h1 id="h1">Solar, CCTV and IT services for <em>Cebu</em> homes and businesses.</h1>
            <p className="lead">XentroTech Solutions installs solar systems and security cameras, repairs computers and runs network cabling, with friendly local support.</p>
            <div className="row"><a className="btn p" href="#contact">Get a free quote<Svg n="arrow" s={18} cls="arr" /></a><a className="btn g" href="#services">Explore services</a></div>
          </div>
          <div className="mark" aria-hidden="true"><Logo size={360} /></div>
        </div>
        <Stats />
      </div></section>
      <section className="sec" style={{ paddingTop: 24 }} aria-labelledby="s1"><div className="wrap">
        <div className="shead"><h2 id="s1">What we do</h2><p className="lead">Four services from one local team, so you deal with a single contact from survey to support.</p></div>
        <Cards />
      </div></section>
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="s2"><div className="wrap">
        <SHead title="How we work" lead="A simple process with no surprises." /><Steps />
      </div></section>
      <section className="sec" style={{ paddingTop: 0 }} aria-labelledby="s3"><div className="wrap">
        <SHead title="Selected work" lead="Sample projects showing how we solve everyday problems." />
        <div className="work">
          {WORK.map(([i, t, c, b, r], k) => (
            <Reveal key={t} d={k * 90}>
              <article className="card"><Art n={i} /><h3>{t}</h3>
                <dl><dt>Challenge</dt><dd>{c}</dd><dt>What we built</dt><dd>{b}</dd><dt>Result</dt><dd>{r}</dd></dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div></section>
      <CTA />
    </main>
  );
}

function Gallery({ k, auto = false }) {
  const items = WORKS[k].length ? WORKS[k] : SAMPLES[k];
  const n = items.length;
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const x0 = useRef(0);
  const go = (j) => setI((j + n) % n);
  useEffect(() => {
    if (!auto || pause || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((j) => (j + 1) % n), 4500);
    return () => clearInterval(t);
  }, [pause, n]);
  return (
    <div className="car" role="region" aria-roledescription="carousel" aria-label={"Work samples: " + k} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <div className="view" onTouchStart={(e) => { x0.current = e.touches[0].clientX; }} onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - x0.current; if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1)); }}>
        <div className="track" style={{ transform: "translateX(-" + i * 100 + "%)" }}>
          {items.map((m, j) => (
            <div className="slide" key={j} aria-hidden={j !== i}>
              <Pic m={m} lazy={j > 0} />
              {m.scene && <span className="tag">Sample image</span>}
              {m.cap && <div className="capt">{m.cap}</div>}
            </div>
          ))}
        </div>
        {n > 1 && (<>
          <button className="cb prev" type="button" aria-label="Previous photo" onClick={() => go(i - 1)}><Svg n="arrow" s={20} /></button>
          <button className="cb next" type="button" aria-label="Next photo" onClick={() => go(i + 1)}><Svg n="arrow" s={20} /></button>
          <span className="cnt" aria-live="polite">{i + 1} / {n}</span>
        </>)}
      </div>
      {n > 1 && (
        <div className="thumbs">
          {items.map((m, j) => <button key={j} className="thumb" type="button" aria-pressed={j === i} aria-label={"Show photo " + (j + 1)} onClick={() => setI(j)}><Pic m={m} lazy /></button>)}
        </div>
      )}
    </div>
  );
}

function ServicesPage() {
  return (
    <main id="main">
      <Head title="Our services" lead="Solar, CCTV, computer repair and network cabling. Choose one service or combine them for a complete setup." />
      {SERVICES.map(([i, t, d], k) => (
        <section className={"wrap det" + (k % 2 ? " alt" : "")} key={t} aria-label={t}>
          <Reveal cls="detart"><Gallery k={i} /></Reveal>
          <Reveal d={120}>
            <h2>{t}</h2><p className="lead">{d}</p>
            <ul>{DET[i].f.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="meta"><span className="chip">{DET[i].tools}</span><span className="chip">Typical timeline: {DET[i].time}</span></div>
            <div className="row" style={{ marginTop: 26 }}><a className="btn p" href="#contact">Get a free quote<Svg n="arrow" s={18} cls="arr" /></a></div>
          </Reveal>
        </section>
      ))}
      <div style={{ height: 56 }} /><CTA />
    </main>
  );
}

function About() {
  return (
    <main id="main">
      <Head title="About XentroTech Solutions" lead="A Cebu-based team that powers, protects and connects homes and businesses." />
      <section className="sec" style={{ paddingBottom: 24 }}><div className="wrap about">
        <Reveal><Gallery k="about" auto /></Reveal>
        <Reveal d={120}><div className="copy"><h2>Our story</h2>
          <p>XentroTech Solutions is a Cebu-based team that installs solar systems and CCTV, repairs computers and runs network cabling. We started with a simple idea: local homes and businesses deserve reliable technology and a technician who answers the phone.</p>
          <p>Today we help families, shops, offices and schools stay powered, secure and connected. Every job starts with a site visit and a clear quote, and ends with a tested, tidy installation.</p>
          <div className="area"><span className="chip">Cebu City</span><span className="chip">Nearby areas on request</span></div>
        </div></Reveal>
      </div></section>
      <section className="sec" style={{ paddingBottom: 24 }}><div className="wrap"><Stats /></div></section>
      <section className="sec" style={{ paddingBottom: 24 }}><div className="wrap">
        <SHead title="What we stand for" lead="The standards behind every installation and repair." />
        <div className="vals">
          {VALUES.map(([t, d], k) => <Reveal key={t} d={k * 90}><article className="card"><span className="num">0{k + 1}</span><h3>{t}</h3><p>{d}</p></article></Reveal>)}
        </div>
      </div></section>
      <section className="sec"><div className="wrap"><SHead title="How we work" lead="From first call to final test." /><Steps /></div></section>
      <CTA />
    </main>
  );
}

function Contact() {
  const [f, setF] = useState({ name: "", phone: "", email: "", service: SERVICES[0][1], msg: "" });
  const [e, setE] = useState({});
  const [href, setHref] = useState("");
  const on = (k) => (ev) => setF({ ...f, [k]: ev.target.value });
  const submit = (ev) => {
    ev.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = "Enter a valid email, like name@email.com.";
    if (f.msg.trim().length < 10) x.msg = "Tell us a little about what you need (at least 10 characters).";
    setE(x);
    if (Object.keys(x).length) return;
    const body = `Name: ${f.name}\nPhone: ${f.phone || "-"}\nEmail: ${f.email}\nService: ${f.service}\n\n${f.msg}`;
    const h = "mailto:" + C.email + "?subject=" + encodeURIComponent("Quote request: " + f.service) + "&body=" + encodeURIComponent(body);
    setHref(h);
    window.location.href = h;
  };
  return (
    <main id="main">
      <Head title="Get a free quote" lead="Tell us what you need. Call, text, email or send the form and we will reply within one business day." />
      <div className="wrap two sec" style={{ paddingTop: 44 }}>
        {href ? (
          <div className="ok" role="status">
            <h2>Almost done</h2>
            <p className="lead" style={{ marginTop: 12 }}>Your email app should now be open with your request ready to send. If it did not open, use the button below.</p>
            <div className="row"><a className="btn p" href={href}><Svg n="mail" s={18} />Open email</a><button className="btn g" type="button" onClick={() => setHref("")}>Edit request</button></div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label>Full name<input value={f.name} onChange={on("name")} autoComplete="name" aria-invalid={!!e.name} />{e.name && <span className="err">{e.name}</span>}</label>
            <div className="split">
              <label>Email<input type="email" inputMode="email" value={f.email} onChange={on("email")} autoComplete="email" aria-invalid={!!e.email} />{e.email && <span className="err">{e.email}</span>}</label>
              <label>Phone (optional)<input type="tel" inputMode="tel" value={f.phone} onChange={on("phone")} autoComplete="tel" /></label>
            </div>
            <label>Service needed<select value={f.service} onChange={on("service")}>{SERVICES.map((x) => <option key={x[1]}>{x[1]}</option>)}</select></label>
            <label>Project details<textarea value={f.msg} onChange={on("msg")} aria-invalid={!!e.msg} />{e.msg && <span className="err">{e.msg}</span>}</label>
            <button className="btn p" type="submit">Request my free quote<Svg n="arrow" s={18} cls="arr" /></button>
          </form>
        )}
        <div className="info">
          <a className="card ic" href={"tel:" + C.tel}><span className="ico"><Svg n="call" /></span><span><small>Call us</small><strong>{C.telShow}</strong></span></a>
          <a className="card ic" href={"sms:" + C.tel}><span className="ico"><Svg n="text" /></span><span><small>Send a text</small><strong>{C.telShow}</strong></span></a>
          <a className="card ic" href={"mailto:" + C.email}><span className="ico"><Svg n="mail" /></span><span><small>Email us</small><strong>{C.email}</strong></span></a>
          <a className="card ic" href="https://www.google.com/maps/search/?api=1&query=Cebu+City+Philippines" target="_blank" rel="noopener noreferrer"><span className="ico"><Svg n="pin" /></span><span><small>Visit us</small><strong>{C.addr}</strong></span></a>
          <div className="card ic"><span className="ico"><Svg n="clock" /></span><span><small>Hours</small><strong>{C.hours}</strong></span></div>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <a className="brand" href="#home" aria-label="XentroTech Solutions home"><Logo size={34} /><span><Wm /><small>Solutions · Cebu</small></span></a>
          <p style={{ marginTop: 14, maxWidth: "38ch" }}>Solar, CCTV, computer repair and network cabling for Cebu homes and businesses.</p>
        </div>
        <div><h3>Explore</h3><ul>{PAGES.map(([k, l]) => <li key={k}><a href={"#" + k}>{l}</a></li>)}</ul></div>
        <div><h3>Contact</h3><ul><li><a href={"tel:" + C.tel}>{C.telShow}</a></li><li><a href={"mailto:" + C.email}>{C.email}</a></li><li>{C.addr}</li></ul></div>
        <p className="copy-r">© 2026 XentroTech Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}

function MobileBar({ route }) {
  if (route === "contact") return null;
  return (
    <div className="mbar">
      <a className="btn g" href={"tel:" + C.tel}><Svg n="call" s={18} />Call</a>
      <a className="btn p" href="#contact">Free quote</a>
    </div>
  );
}

export default function App() {
  const r = useRoute();
  const V = { home: Home, services: ServicesPage, about: About, contact: Contact }[r];
  return (<><Header route={r} /><V /><Footer /><MobileBar route={r} /></>);
}
