import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Bolt, Building2, Car, CheckCircle2, ChevronRight, Clock, Gauge, Home, Lightbulb, MapPin, Menu, Phone, ShieldCheck, Sparkles, Star, Wrench, X, Zap } from 'lucide-react';
import { business, navItems, process, serviceGroups, testimonials } from './content.js';

const pageCopy = {
  services: {
    kicker: 'Complete electrical services',
    title: 'Premium electrical work for power, safety, lighting, repairs and EV charging.',
    lead: 'Ampra Electrical presents every service clearly so customers instantly understand what can be handled, from small repairs to more complex upgrades.'
  },
  emergency: {
    kicker: '24 hour emergency electrician',
    title: 'Urgent electrical support when the job cannot wait.',
    lead: 'Electrical faults can become serious quickly. Ampra Electrical is positioned for urgent callouts across Kellyville Ridge, Sydney and nearby areas.'
  },
  residential: {
    kicker: 'Residential electrician Sydney',
    title: 'Clean electrical work for safer, smarter Sydney homes.',
    lead: 'From power points and lighting to renovations, fans, wiring, switchboards and EV chargers, the residential page is built to convert homeowners.'
  },
  commercial: {
    kicker: 'Commercial electrical contractor',
    title: 'Reliable electrical support for shops, offices and property managers.',
    lead: 'A professional page for commercial maintenance, fault finding, switchboards, lighting upgrades, repairs and ongoing support.'
  },
  ev: {
    kicker: 'EV charger installation Sydney',
    title: 'Future-ready EV charger installation for homes and businesses.',
    lead: 'A high-value page designed for electric vehicle charger enquiries, switchboard capacity checks, wall-mounted chargers and dedicated circuits.'
  },
  about: {
    kicker: 'About Ampra Electrical',
    title: 'Precision, safety and clean workmanship on every electrical project.',
    lead: 'Ampra Electrical Pty Ltd is a Sydney-based electrical company built on trust, safety, precision, clear communication and long-term reliability.'
  },
  reviews: {
    kicker: 'Google reviews',
    title: '5.0 rated electrical service with real customer feedback.',
    lead: 'Use the rating and review snippets to give the preview social proof without inventing fake testimonials.'
  },
  contact: {
    kicker: 'Contact Ampra Electrical',
    title: 'Request a quote or call Ampra Electrical now.',
    lead: 'A conversion-focused contact page with phone, quote form, address, hours and service area information.'
  }
};

function go(page) {
  window.history.pushState({}, '', `#${page}`);
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function usePage() {
  const [page, setPage] = useState(() => window.location.hash.replace('#', '') || 'home');
  useState(() => {
    const handler = () => setPage(window.location.hash.replace('#', '') || 'home');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  });
  return page;
}

function Logo() {
  return <button className="brand" onClick={() => go('home')} aria-label="Ampra Electrical home">
    <span className="brandMark"><Bolt size={24} fill="currentColor" /></span>
    <span><strong>Ampra Electrical</strong><small>Precision. Power. Peace of Mind.</small></span>
  </button>;
}

function Header({ page }) {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <div className="topline"><span><Clock size={15} /> Open 24 hours</span><span><MapPin size={15} /> Kellyville Ridge, Sydney</span><span><Star size={15} fill="currentColor" /> 5.0 from 11 Google reviews</span></div>
    <div className="navShell">
      <Logo />
      <nav className={open ? 'nav open' : 'nav'}>
        {navItems.map(([id, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => { go(id); setOpen(false); }}>{label}</button>)}
      </nav>
      <div className="headerActions"><a className="ghostBtn" href={`tel:${business.tel}`}><Phone size={17} /> {business.phone}</a><button className="primaryBtn" onClick={() => go('contact')}>Get a Free Quote</button></div>
      <button className="menuBtn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function Hero() {
  return <section className="hero">
    <div className="gridGlow"></div>
    <div className="container heroGrid">
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
        <div className="eyebrow"><span className="liveDot"></span> 24/7 Electrician in Kellyville Ridge and Sydney</div>
        <h1>Sydney electricians built on precision, safety and peace of mind.</h1>
        <p className="heroLead">Ampra Electrical provides 24/7 electrical services across Kellyville Ridge, Sydney and nearby areas - from urgent repairs and switchboard upgrades to lighting, power, wiring and EV charger installations.</p>
        <div className="heroCtas"><a className="primaryBtn xl" href={`tel:${business.tel}`}><Phone size={20} /> Call {business.phone}</a><button className="ghostBtn xl" onClick={() => go('contact')}>Request a Quote <ArrowRight size={19} /></button></div>
        <div className="trustRow">
          {['5.0 Google Rating', 'Open 24 Hours', 'Sydney & Nearby Areas', 'Residential, Commercial & Industrial'].map(item => <span key={item}><CheckCircle2 size={17} /> {item}</span>)}
        </div>
      </motion.div>
      <motion.div className="commandCentre" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }}>
        <div className="statusBar"><span>AMPRA POWER CONTROL</span><strong>LIVE</strong></div>
        <div className="powerOrb"><Zap size={64} fill="currentColor" /></div>
        <div className="metricGrid">
          <Metric icon={<ShieldCheck />} title="Safety-first" value="Compliant work" />
          <Metric icon={<Wrench />} title="Urgent repairs" value="24 hour support" />
          <Metric icon={<Gauge />} title="Switchboards" value="Upgrade ready" />
          <Metric icon={<Car />} title="EV chargers" value="Future-ready" />
        </div>
        <div className="diagnosticCard"><div><span>Active service profile</span><strong>Residential • Commercial • Industrial</strong></div><button onClick={() => go('services')}>View services</button></div>
      </motion.div>
    </div>
  </section>;
}

function Metric({ icon, title, value }) {
  return <div className="metric"><span>{icon}</span><div><b>{title}</b><small>{value}</small></div></div>;
}

function SectionHead({ kicker, title, lead, right }) {
  return <div className="sectionHead"><div><span className="kicker">{kicker}</span><h2>{title}</h2>{lead && <p>{lead}</p>}</div>{right}</div>;
}

function Services({ filter }) {
  const groups = useMemo(() => {
    if (!filter) return serviceGroups;
    return serviceGroups.filter(group => group.title.toLowerCase().includes(filter) || group.services.join(' ').toLowerCase().includes(filter));
  }, [filter]);
  return <section className="section servicesBlock">
    <div className="container">
      <SectionHead kicker="Services" title="A complete electrical capability suite." lead="Grouped like a serious contractor website, not a plain list. Customers can instantly see the type of work Ampra Electrical handles." right={<button className="outlineBtn" onClick={() => go('contact')}>Start a quote <ChevronRight size={17} /></button>} />
      <div className="serviceGrid">{groups.map((group, index) => <motion.article className="serviceCard" key={group.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }}>
        <div className="cardTop"><span className="serviceIndex">0{index + 1}</span><Sparkles size={22} /></div>
        <h3>{group.title}</h3><p>{group.description}</p>
        <ul>{group.services.map(s => <li key={s}><CheckCircle2 size={16} /> {s}</li>)}</ul>
      </motion.article>)}</div>
    </div>
  </section>;
}

function WhyChoose() {
  const items = [
    ['Precision', 'Neat, carefully planned electrical work with attention to detail.'],
    ['Safety', 'Compliance-first thinking for homes, businesses and larger projects.'],
    ['Clear communication', 'Straightforward advice, practical timelines and no confusing technical talk.'],
    ['Clean workmanship', 'A professional finish that respects the property and leaves the job tidy.']
  ];
  return <section className="section darkPanelSection"><div className="container split"><div><span className="kicker">Why Ampra</span><h2>Designed to feel premium, trustworthy and local.</h2><p>This page sells the same thing customers care about before hiring an electrician: safety, speed, price confidence, quality and trust.</p><button className="primaryBtn" onClick={() => go('about')}>Learn about Ampra</button></div><div className="whyStack">{items.map(([t, d]) => <div className="whyItem" key={t}><BadgeCheck /><div><h3>{t}</h3><p>{d}</p></div></div>)}</div></div></section>;
}

function EmergencyBand() {
  return <section className="section emergencyBand"><div className="container emergencyGrid"><div><span className="kicker">Emergency electrician</span><h2>Call before the circuit becomes dangerous.</h2><p>Electrical issues can become serious quickly. If something smells burnt, sparks, repeatedly trips or feels unsafe, stop using that circuit and call a licensed electrician.</p><div className="warningList">{['Power outages', 'Burning smells', 'Tripping circuits', 'Faulty switches', 'Switchboard faults', 'Urgent repairs'].map(x => <span key={x}><Zap size={16} /> {x}</span>)}</div></div><div className="emergencyCall"><strong>24 hour callout ready</strong><a href={`tel:${business.tel}`}>{business.phone}</a><button className="primaryBtn" onClick={() => go('emergency')}>View emergency page</button></div></div></section>;
}

function Process() {
  return <section className="section"><div className="container"><SectionHead kicker="Process" title="A quote journey that feels organised." lead="The website guides visitors from problem to phone call with zero confusion." /><div className="processGrid">{process.map(([num, title, copy]) => <div className="processCard" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>;
}

function Reviews() {
  return <section className="section reviews"><div className="container"><SectionHead kicker="Reviews" title="5.0 rated by local customers." lead="Real review snippets from Google, presented in a premium way." right={<div className="ratingPill"><Star fill="currentColor" /> {business.rating} • {business.reviews}</div>} /><div className="reviewGrid">{testimonials.map(t => <article className="reviewCard" key={t.name}><div className="stars">★★★★★</div><p>“{t.quote}”</p><strong>{t.name}</strong></article>)}</div></div></section>;
}

function Areas() {
  return <section className="section areas"><div className="container"><SectionHead kicker="Service areas" title="Kellyville Ridge, Sydney and nearby areas." lead="Built for local search visibility across the Hills District and North West Sydney." /><div className="areaCloud">{business.areas.map(area => <span key={area}>{area}</span>)}</div></div></section>;
}

function HomePage() {
  return <><Hero /><Services /><EmergencyBand /><WhyChoose /><Process /><Reviews /><Areas /><FinalCta /></>;
}

function InnerPage({ page }) {
  const copy = pageCopy[page] || pageCopy.services;
  const filterMap = { emergency: 'emergency', residential: 'residential', commercial: 'commercial', ev: 'ev', services: '' };
  return <>
    <section className="innerHero"><div className="container"><span className="kicker">{copy.kicker}</span><h1>{copy.title}</h1><p>{copy.lead}</p><div className="heroCtas"><a className="primaryBtn" href={`tel:${business.tel}`}>Call {business.phone}</a><button className="ghostBtn" onClick={() => go('contact')}>Request quote</button></div></div></section>
    {page === 'about' ? <AboutPage /> : page === 'reviews' ? <Reviews /> : page === 'contact' ? <ContactPage /> : <SpecialisedPage page={page} filter={filterMap[page]} />}
  </>;
}

function SpecialisedPage({ page, filter }) {
  const cards = {
    emergency: [['Power outages', 'Fast fault support for sudden loss of power.'], ['Burning smells or sparks', 'Safety-first advice for high-risk issues.'], ['Tripping circuits', 'Diagnose overloads, faulty appliances or wiring faults.']],
    residential: [['Power and switches', 'New power points, relocation and safe repairs.'], ['Lighting and fans', 'Clean indoor, outdoor and ceiling fan installations.'], ['Renovations', 'Electrical work planned around new layouts.']],
    commercial: [['Maintenance', 'Ongoing electrical support for shops and offices.'], ['Fault finding', 'Reduce downtime with organised diagnostics.'], ['Lighting upgrades', 'Improve presentation, safety and efficiency.']],
    ev: [['Charger installs', 'Wall-mounted EV charger installation.'], ['Capacity checks', 'Switchboard and circuit suitability checks.'], ['Future-ready upgrades', 'Dedicated circuits and smart charging preparation.']],
    services: [['Complete coverage', 'All listed electrical services presented clearly.'], ['Premium UX', 'Built to convert search visitors into calls.'], ['Local SEO', 'Pages aimed at Kellyville Ridge and Sydney searches.']]
  }[page] || [];
  return <><section className="section"><div className="container"><div className="featureGrid">{cards.map(([title, copy]) => <div className="featureCard" key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section><Services filter={filter} /><Process /><Areas /><FinalCta /></>;
}

function AboutPage() {
  return <><section className="section"><div className="container split"><div><span className="kicker">Company profile</span><h2>A Sydney electrical company built for trust.</h2><p>Ampra Electrical Pty Ltd is a Sydney-based electrical company built on precision, safety and peace of mind. Electrical work should be completed with care, clear communication and long-term reliability.</p><p>Whether it is a small repair, new installation, switchboard upgrade, EV charger or a more complex electrical project, the focus remains the same: safe, clean, compliant work done right the first time.</p></div><div className="valueGrid">{['Precision', 'Safety', 'Trust', 'Clean workmanship', 'Clear communication', 'Reliable response'].map(v => <span key={v}><ShieldCheck size={18} /> {v}</span>)}</div></div></section><WhyChoose /><Areas /><FinalCta /></>;
}

function ContactPage() {
  return <section className="section contactSection"><div className="container contactGrid"><form className="quoteForm" onSubmit={(e) => e.preventDefault()}><span className="kicker">Quote form</span><h2>Request your electrical quote.</h2><div className="two"><input placeholder="Name" /><input placeholder="Phone" /></div><div className="two"><input placeholder="Email" /><input placeholder="Suburb" /></div><div className="two"><select><option>Service needed</option><option>Emergency repair</option><option>Switchboard upgrade</option><option>EV charger</option><option>Lighting or power</option><option>Wiring</option></select><select><option>Urgency</option><option>Today</option><option>This week</option><option>Planning ahead</option></select></div><textarea placeholder="Describe the job, property type and any safety concerns."></textarea><label className="uploadBox">Upload photos option - connect this to form storage later</label><button className="primaryBtn xl">Request My Electrical Quote</button></form><aside className="contactCard"><h3>Call Ampra Electrical</h3><a className="bigPhone" href={`tel:${business.tel}`}>{business.phone}</a><p>{business.hours}</p><div className="contactLine"><MapPin /> {business.address}</div><div className="contactLine"><Star /> {business.rating} from {business.reviews}</div><div className="mapMock"><span>Map location</span><strong>36 Conrad Rd<br />Kellyville Ridge NSW 2155</strong></div></aside></div></section>;
}

function FinalCta() {
  return <section className="finalCta"><div className="container ctaInner"><div><span className="kicker">Ready to show them?</span><h2>A premium preview built to sell the website.</h2><p>Use this as the live demo when messaging Ampra Electrical. The design is focused on trust, 24-hour response, high-value services and local enquiries.</p></div><a className="primaryBtn xl" href={`tel:${business.tel}`}><Phone size={20} /> Call {business.phone}</a></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container footerGrid"><div><Logo /><p>Electrical work should always be completed by qualified professionals. Contact Ampra Electrical for advice specific to your property and project.</p></div><div><h4>Services</h4><button onClick={() => go('emergency')}>Emergency Electrician</button><button onClick={() => go('residential')}>Residential Electrical</button><button onClick={() => go('commercial')}>Commercial Electrical</button><button onClick={() => go('ev')}>EV Chargers</button></div><div><h4>Contact</h4><a href={`tel:${business.tel}`}>{business.phone}</a><span>{business.address}</span><span>{business.hours}</span><span>Sydney and nearby areas</span></div></div><div className="container footerBottom">Ampra Electrical Pty Ltd • {business.tagline} • Website preview concept</div></footer>;
}

export default function App() {
  const page = usePage();
  return <div><Header page={page} />{page === 'home' ? <HomePage /> : <InnerPage page={page} />}<Footer /><div className="mobileBar"><a href={`tel:${business.tel}`}><Phone size={18} /> Call</a><button onClick={() => go('contact')}>Quote</button></div></div>;
}
