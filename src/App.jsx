import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail, Phone, MapPin, Award, GraduationCap,
  Code, Cpu, Palette, Globe, CheckCircle2,
  ExternalLink, X, Languages, Layers,
  Copy, Check, Send, Linkedin, Terminal, Download, Menu
} from 'lucide-react';

import profilePic from './cert/profile-pic.png';
import certHardware from './cert/computer-hardware-basics.png';
import certMarketing from './cert/Certificat Marketing Digital.jpeg';
import certWordpress from './cert/Certificat WordPress.jpeg';

gsap.registerPlugin(ScrollTrigger);

function TypedLine({ text, className = "" }) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        obs.disconnect();
        let i = 0;
        const timer = setInterval(() => {
          setDisplayed(text.slice(0, i));
          i++;
          if (i > text.length) clearInterval(timer);
        }, 20);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [text]);
  return <span ref={ref} className={className}>{displayed}<span className="animate-pulse" style={{ color: '#00FF87' }}>_</span></span>;
}

export default function App() {
  const mainRef = useRef();
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedType, setCopiedType] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -80', end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: '.navbar' }
      });
      gsap.from('.hero-elem', { y: 20, opacity: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0 });
      gsap.utils.toArray('.section-anim').forEach(s => {
        gsap.from(s, { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: s, start: 'top 85%' } });
      });
      gsap.utils.toArray('.timeline-card').forEach((card, i) => {
        gsap.from(card, { x: i % 2 === 0 ? -20 : 20, opacity: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
      });
      gsap.utils.toArray('.skill-card').forEach(card => {
        gsap.from(card, { scale: 0.95, opacity: 0, duration: 0.4, ease: 'back.out(1.2)', scrollTrigger: { trigger: card, start: 'top 90%' } });
      });
      gsap.utils.toArray('.cert-card').forEach(card => {
        gsap.from(card, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out', scrollTrigger: { trigger: card, start: 'top 90%' } });
      });
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Empêcher le scroll si le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const GREEN = '#00FF87';
  const CYAN = '#00D4FF';

  const certificates = [
    {
      title: "Computer Hardware Basics",
      issuer: "Cisco Networking Academy",
      badge: "Verified Badge",
      image: certHardware,
      date: "Certif. Vérifiée",
      desc: "Architecture matérielle, composants, diagnostic et dépannage, maintenance préventive.",
      skills: ["Architecture PC", "Maintenance", "Hardware", "Cisco"]
    },
    {
      title: "Création de Sites WordPress",
      issuer: "Cursa - John Taleb",
      badge: "u6580053",
      image: certWordpress,
      date: "Juillet 2025",
      desc: "Conception, thèmes, plugins et déploiement WordPress modernes, sécurisés et responsives.",
      skills: ["WordPress", "CMS", "Web Design", "SEO"]
    },
    {
      title: "Marketing Digital Complet",
      issuer: "Cursa - Ludo Salenne",
      badge: "u6580053",
      image: certMarketing,
      date: "Juillet 2025",
      desc: "Stratégies d'acquisition, contenu, référencement et optimisation des conversions.",
      skills: ["Marketing", "Contenu", "Branding", "SEO"]
    }
  ];

  const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=Saidousy0008@gmail.com&su=Collaboration%20-%20Saïdou%20SY&body=Bonjour%20Saïdou,";
  const linkedinUrl = "https://www.linkedin.com/in/seydousy152";

  const navLinks = [
    ['#about', 'À Propos'],
    ['#formation', 'Formation'],
    ['#experience', 'Expérience'],
    ['#certifications', 'Certificats'],
    ['#skills', 'Compétences'],
    ['#contact', 'Contact']
  ];

  const skills = [
    { name: 'Hardware PC & Support Helpdesk', percent: 90, icon: Palette, green: true },
    { name: 'Admin Système (Windows Server, AD, GPO)', percent: 80, icon: Layers, green: false },
    { name: 'WordPress & CMS', percent: 88, icon: Globe, green: true },
    { name: 'Réseaux & Infrastructure (VLAN, Cisco)', percent: 75, icon: Cpu, green: false },
    { name: 'Bases de Données & SQL (PHP, MySQL)', percent: 85, icon: CheckCircle2, green: true },
    { name: 'Marketing Digital', percent: 82, icon: Award, green: false },
  ];

  const modules = [
    { icon: Code, label: "Dév & Web", desc: "Algo, POO, HTML/CSS/JS, PHP, WordPress" },
    { icon: Layers, label: "Systèmes d'Info", desc: "MERISE, SQL/MySQL, BDD relationnelles" },
    { icon: Cpu, label: "Réseaux & Archi", desc: "Architecture PC, IP, routage, Cisco" },
    { icon: CheckCircle2, label: "Méthodes Agiles", desc: "Scrum, sprints, pilotage de projets" },
    { icon: Globe, label: "Gestion & Entreprise", desc: "Comptabilité, contrôle de gestion" },
    { icon: Award, label: "Sécurité Informa.", desc: "GPO, pare-feu, VLAN, conformité" }
  ];

  const languages = [
    { lang: 'Français', level: 'Courant', dots: 5 },
    { lang: 'Wolof', level: 'Maternel', dots: 5 },
    { lang: 'Poulard', level: 'Maternel', dots: 5 },
    { lang: 'Anglais', level: 'Intermédiaire', dots: 3 }
  ];

  return (
    <div ref={mainRef} className="font-sans text-text bg-primary min-h-screen">
      <div className="noise-overlay"></div>
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-60"></div>

      {/* NAV */}
      <nav className="navbar fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-auto max-w-7xl z-50 transition-all duration-300 rounded-full px-5 py-2.5 flex items-center justify-between gap-5 md:gap-7 bg-[#030712]/60 backdrop-blur-md border border-white/5 [&.nav-scrolled]:bg-[#030712]/85 [&.nav-scrolled]:border-[#00FF87]/20">
        <a href="#" className="font-mono font-bold flex items-center gap-1.5 shrink-0" style={{ color: GREEN, textShadow: `0 0 20px ${GREEN}80` }}>
          <Terminal size={16} /> Saïdou.SY
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-5 text-sm font-mono text-text/60">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-accent transition-colors whitespace-nowrap">{label}</a>
          ))}
        </div>
        <a
          href="./cv.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex shrink-0 text-xs font-mono font-bold border px-3 py-1.5 rounded-full transition-all duration-300 hover:text-primary items-center gap-1.5"
          style={{ color: GREEN, borderColor: `${GREEN}60` }}
          onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = '#030712'; }}
          onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = GREEN; }}>
          <Download size={13} /> CV
        </a>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white hover:text-accent transition-colors ml-auto flex items-center justify-center p-1" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} style={{ color: GREEN }} /> : <Menu size={22} style={{ color: GREEN }} />}
        </button>
      </nav>

      {/* MOBILE MENU FULLSCREEN OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030712]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-6 text-center w-full px-6">
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-2xl font-mono text-white hover:text-accent transition-colors block w-full py-2 border-b border-white/5">
                {label}
              </a>
            ))}
          </div>
          <a
            href="./cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/10 bg-white/5 px-8 py-3.5 rounded-full font-medium transition-all flex items-center gap-2 font-mono text-sm text-white/60 hover:border-accent/30">
            <Download size={16} style={{ color: GREEN }} /> Télécharger CV
          </a>
        </div>
      )}

      {/* HERO */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center relative px-6 text-center pt-24 pb-16 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: `${GREEN}12`, filter: 'blur(120px)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: `${CYAN}12`, filter: 'blur(120px)' }}></div>

        <div className="z-20 flex flex-col items-center max-w-4xl mx-auto">
          {/* Photo */}
          <div className="hero-elem relative mb-8 group">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-[3px]" style={{ background: `linear-gradient(135deg,${GREEN},${CYAN},${GREEN})`, boxShadow: `0 0 50px ${GREEN}40` }}>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary bg-muted">
                <img src={profilePic} alt="Saïdou SY" loading="eager" fetchPriority="high" className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-primary animate-pulse" style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}` }}></div>
          </div>

          {/* Terminal badge */}
          <div className="hero-elem font-mono text-xs mb-5 bg-muted rounded-lg px-4 py-2 flex items-center gap-2 max-w-full overflow-hidden" style={{ border: `1px solid ${GREEN}30`, color: `${GREEN}cc` }}>
            <span style={{ color: `${GREEN}50` }} className="shrink-0">$</span>
            <TypedLine text="whoami  ->  Licence 3 Informatique de Gestion • ENSUP Afrique Dakar" />
          </div>

          <h1 className="hero-elem text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter mb-3 text-white font-serif">
            Saïdou <span style={{ color: GREEN, textShadow: `0 0 40px ${GREEN}60` }}>SY</span>
          </h1>
          <h2 className="hero-elem text-xl sm:text-2xl font-mono mb-8" style={{ color: CYAN }}>
            <span style={{ opacity: 0.4 }}>// </span>Informatique de Gestion & Designer Graphique
          </h2>
          <p className="hero-elem text-text/70 text-base md:text-lg max-w-2xl font-light mb-10 leading-relaxed">
            Systèmes d'information, gestion de parc hospitalier, administration réseau Windows Server et créativité — au service de solutions numériques performantes.
          </p>

          <div className="hero-elem flex flex-wrap justify-center items-center gap-4 text-xs font-mono text-text/50 mb-12 bg-muted/60 backdrop-blur-md px-6 py-3 rounded-full" style={{ border: `1px solid ${GREEN}15` }}>
            <span className="flex items-center gap-1.5" style={{ color: `${GREEN}cc` }}><GraduationCap size={13} /> ENSUP Afrique</span>
            <span style={{ color: `${GREEN}40` }}>|</span>
            <span className="flex items-center gap-1.5" style={{ color: CYAN }}><Palette size={13} /> +5 ans Gesign Graphique</span>
            <span style={{ color: `${GREEN}40` }}>|</span>
            <span className="flex items-center gap-1.5" style={{ color: GREEN }}><MapPin size={13} /> Dakar, Sénégal</span>
          </div>

          <div className="hero-elem flex flex-wrap gap-4 justify-center">
            <a href={gmailUrl} target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full font-bold font-mono text-sm flex items-center gap-2 hover:scale-[1.04] transition-all duration-300"
              style={{ background: GREEN, color: '#030712', boxShadow: `0 0 30px ${GREEN}50` }}
            ><Send size={16} /> Écrire sur Gmail</a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="border px-8 py-3.5 rounded-full font-bold font-mono text-sm flex items-center gap-2 hover:scale-[1.04] transition-all duration-300"
              style={{ borderColor: `${CYAN}60`, color: CYAN, background: `${CYAN}10` }}
            ><Linkedin size={16} /> LinkedIn</a>
            <a
              href="./cv.html"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 bg-white/5 px-8 py-3.5 rounded-full font-medium transition-all flex items-center gap-2 font-mono text-sm text-white/60 hover:border-accent/30">
              <Download size={16} style={{ color: GREEN }} /> Télécharger CV
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 section-anim">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <div className="font-mono text-xs mb-2 flex items-center gap-2" style={{ color: GREEN }}><span style={{ opacity: 0.4 }}>01.</span> À_PROPOS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Qui suis-<span style={{ color: GREEN }}>je</span> ?</h2>
            <div className="mt-4 w-16 h-0.5" style={{ background: `linear-gradient(90deg,${GREEN},${CYAN})` }}></div>
          </div>
          <div className="md:col-span-8 text-lg leading-relaxed text-text/80 font-light space-y-5">
            <p>Actuellement en <strong style={{ color: GREEN }}>Licence 3 Informatique de Gestion</strong> à l'<strong className="text-white">ENSUP Afrique de Dakar</strong>(diplôme homologué CAMES & ANAQ-SUP),suite à la validation de ma Licence 2 (2024–2026).Disponible immédiatement pour un stage de fin d'études ou des opportunités en alternance/CDI (Présentiel à Dakar ou Remote).</p>
            <p>Mon stage au <strong style={{ color: CYAN }}>CHRO de Ourossogui</strong> m'a permis de gérer un parc hospitalier de 70+ postes, déployer Windows Server avec Active Directory, DNS, DHCP et assurer le support helpdesk N1/N2.</p>
            <p>Depuis 2019, je crée des identités visuelles professionnelles sur <strong style={{ color: GREEN }}>Canva Pro</strong>. Cette double expertise technique et créative me permet d'aborder chaque projet avec une vision complète.</p>
          </div>
        </div>
      </section>

      {/* FORMATION */}
      <section id="formation" className="py-28 px-6">
        <div className="max-w-5xl mx-auto section-anim">
          <div className="text-center mb-16">
            <div className="font-mono text-xs mb-2 flex items-center justify-center gap-2" style={{ color: GREEN }}><span style={{ opacity: 0.4 }}>02.</span> FORMATION_ACADÉMIQUE</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Parcours <span style={{ color: CYAN }}>Académique</span></h2>
          </div>
          <div className="space-y-6">
            <div className="bg-muted rounded-2xl p-8 relative overflow-hidden" style={{ border: `1px solid ${GREEN}25`, boxShadow: `0 0 40px ${GREEN}06` }}>
              <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(90deg,${GREEN},${CYAN},transparent)` }}></div>
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="font-mono text-[11px] px-3 py-1 rounded-full flex items-center gap-1.5" style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}><GraduationCap size={12} /> Licence 2 validée (2024-2026)</span>
                    <span className="font-mono text-[11px] text-text/50 bg-black/30 px-2.5 py-1 rounded-full border border-white/5">CAMES & ANAQ-SUP</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-serif">Licence en Informatique de Gestion</h3>
                  <div className="flex items-center gap-2 mt-1" style={{ color: CYAN }}>
                    <span className="italic">ENSUP Afrique — Dakar, Sénégal</span>
                    <a href="https://www.ensupafrique.com" target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[11px] flex items-center gap-1 px-2 py-0.5 rounded hover:underline ml-2"
                      style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}
                    >ensupafrique.com <ExternalLink size={11} /></a>
                  </div>
                </div>
                <span className="font-mono text-xs bg-primary px-4 py-2 rounded-xl border border-white/10 text-text/70">Déc. 2024 — Aujourd'hui</span>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {modules.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-primary/60 border border-white/5 hover:border-accent/30 transition-colors">
                    <div className="flex items-center gap-2 mb-1.5">
                      <m.icon size={14} style={{ color: GREEN }} />
                      <span className="font-bold text-white text-xs">{m.label}</span>
                    </div>
                    <p className="text-text/60 text-[11px] leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted rounded-2xl p-6 border border-white/5 hover:border-accent/25 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs" style={{ color: GREEN }}>JUILLET 2022</span>
                  <span className="font-mono text-[11px] text-text/50 bg-primary/60 px-2 py-0.5 rounded">Diplôme</span>
                </div>
                <h3 className="text-lg font-bold text-white font-serif">Baccalauréat Scientifique (S2)</h3>
                <div className="text-sm italic mb-2" style={{ color: CYAN }}>Lycée El Hadji Yero Basse de Ourossogui</div>
                <p className="text-[12px] text-text/60 leading-relaxed">Mathématiques, sciences physiques et logique analytique.</p>
              </div>
              <div className="bg-muted rounded-2xl p-6 border border-white/5 hover:border-accent/25 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs" style={{ color: GREEN }}>JUILLET 2019</span>
                  <span className="font-mono text-[11px] text-text/50 bg-primary/60 px-2 py-0.5 rounded">Diplôme</span>
                </div>
                <h3 className="text-lg font-bold text-white font-serif">BFEM</h3>
                <div className="text-sm italic mb-2" style={{ color: GREEN }}>CEM 3 de Tivaouane</div>
                <p className="text-[12px] text-text/60 leading-relaxed">Début de mes créations visuelles et passion pour l'informatique.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPÉRIENCE */}
      <section id="experience" className="py-28 px-6" style={{ background: 'rgba(13,17,23,0.5)' }}>
        <div className="max-w-4xl mx-auto section-anim">
          <div className="text-center mb-20">
            <div className="font-mono text-xs mb-2 flex items-center justify-center gap-2" style={{ color: GREEN }}><span style={{ opacity: 0.4 }}>03.</span> EXPÉRIENCE_PRO</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Sur le <span style={{ color: GREEN }}>terrain</span></h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-30" style={{ background: `linear-gradient(to bottom,${GREEN},${CYAN},${GREEN})` }}></div>
            <div className="space-y-10">
              {/* CHRO */}
              <div className="timeline-card relative md:w-1/2 md:pr-12 ml-auto md:ml-0">
                <div className="hidden md:block absolute right-0 top-8 w-3 h-3 rounded-full translate-x-[6.5px]" style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}` }}></div>
                <div className="bg-muted rounded-2xl p-7 relative overflow-hidden hover:scale-[1.01] transition-transform duration-300" style={{ border: `1px solid ${GREEN}30`, boxShadow: `0 0 20px ${GREEN}06` }}>
                  <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(90deg,${GREEN},transparent)` }}></div>
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full mb-2 inline-block" style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>STAGE - GESTION & INFRASTRUCTURE</span>
                  <div className="font-mono text-xs mb-1" style={{ color: GREEN }}>OCT. 2025 - DEC. 2025</div>
                  <h3 className="text-xl font-bold text-white mb-1 font-serif">Stagiaire en Informatique de Gestion</h3>
                  <div className="text-sm italic mb-4" style={{ color: CYAN }}>Centre Hospitalier Régional de Ourossogui (CHRO)</div>
                  <p className="text-sm text-text/75 leading-relaxed mb-4">Gestion de 70+ ordinateurs, 12 switches, 6 routeurs, 36 imprimantes et 2 serveurs. Déploiement <strong style={{ color: GREEN }}>Windows Server</strong> (Active Directory, DNS, DHCP, GPO), helpdesk N1/N2, VLAN, HOPITALIA & Ciel.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Windows Server', 'Active Directory', 'DHCP/DNS', 'Gestion Parc', 'VLAN', 'Helpdesk N1/N2'].map((t, i) => (
                      <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Canva */}
              <div className="timeline-card relative md:w-1/2 md:pl-12 ml-auto">
                <div className="hidden md:block absolute left-0 top-8 w-3 h-3 rounded-full -translate-x-[6px]" style={{ background: CYAN, boxShadow: `0 0 12px ${CYAN}` }}></div>
                <div className="bg-muted rounded-2xl p-7 hover:scale-[1.01] transition-transform duration-300" style={{ border: `1px solid ${CYAN}30`, boxShadow: `0 0 20px ${CYAN}06` }}>
                  <div className="font-mono text-xs mb-1" style={{ color: CYAN }}>JUIN 2019 - PRÉSENT (+5 ANS)</div>
                  <h3 className="text-xl font-bold text-white mb-1 font-serif">Designer Graphiste</h3>
                  <div className="text-sm italic mb-4" style={{ color: CYAN }}>Indépendant / Projets & Entreprises</div>
                  <p className="text-sm text-text/75 leading-relaxed mb-4">Expertise <strong style={{ color: CYAN }}>Canva Pro</strong> — identités visuelles,WordPress & CMS, UI/UX (Figma - Bases), HTML5 / CSS3 / JS, Branding & Logos, Responsive Design.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Canva Pro', 'Branding', 'Direction Artistique', 'Visuels SNS', 'Print & Digital'].map((t, i) => (
                      <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ color: CYAN, background: `${CYAN}15`, border: `1px solid ${CYAN}30` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* WordPress */}
              <div className="timeline-card relative md:w-1/2 md:pr-12 ml-auto md:ml-0">
                <div className="hidden md:block absolute right-0 top-8 w-3 h-3 rounded-full translate-x-[6.5px]" style={{ background: GREEN, boxShadow: `0 0 12px ${GREEN}` }}></div>
                <div className="bg-muted rounded-2xl p-7 border border-white/5 hover:border-accent/25 hover:scale-[1.01] transition-all duration-300">
                  <div className="font-mono text-xs mb-1" style={{ color: GREEN }}>2023 - PRÉSENT</div>
                  <h3 className="text-xl font-bold text-white mb-1 font-serif">Concepteur Web & Spécialiste WordPress</h3>
                  <div className="text-sm italic mb-4" style={{ color: GREEN }}>Projets Web & Cursa Certified</div>
                  <p className="text-sm text-text/75 leading-relaxed mb-4">Sites vitrines et catalogues WordPress — intégration, sécurisation, optimisation performance, conformité mobile.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['WordPress', 'HTML/CSS', 'PHP', 'SEO', 'Responsive'].map((t, i) => (
                      <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Maintenance */}
              <div className="timeline-card relative md:w-1/2 md:pl-12 ml-auto">
                <div className="hidden md:block absolute left-0 top-8 w-3 h-3 rounded-full -translate-x-[6px]" style={{ background: CYAN, boxShadow: `0 0 12px ${CYAN}` }}></div>
                <div className="bg-muted rounded-2xl p-7 border border-white/5 hover:scale-[1.01] transition-all duration-300" style={{ borderColor: `${CYAN}15` }}>
                  <div className="font-mono text-xs mb-1" style={{ color: CYAN }}>2022 - PRÉSENT</div>
                  <h3 className="text-xl font-bold text-white mb-1 font-serif">Maintenance & Support Matériel PC</h3>
                  <div className="text-sm italic mb-4" style={{ color: CYAN }}>Certifié Cisco Hardware Basics</div>
                  <p className="text-sm text-text/75 leading-relaxed mb-4">Diagnostic pannes hardware/software, assemblage, réinstallation OS, configuration périphériques.</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Hardware PC', 'Diagnostic', 'Windows/Linux', 'Réseaux locaux'].map((t, i) => (
                      <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded" style={{ color: CYAN, background: `${CYAN}15`, border: `1px solid ${CYAN}30` }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-28 px-6">
        <div className="max-w-6xl mx-auto section-anim">
          <div className="text-center mb-16">
            <div className="font-mono text-xs mb-2 flex items-center justify-center gap-2" style={{ color: GREEN }}><span style={{ opacity: 0.4 }}>04.</span> CERTIFICATIONS</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Badges &amp; <span style={{ color: GREEN }}>Certificats</span></h2>
            <p className="text-text/50 mt-4 text-sm font-mono">// Cliquez pour agrandir</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certificates.map((cert, i) => (
              <div key={i} onClick={() => setSelectedCert(cert)}
                className="cert-card bg-muted rounded-2xl p-5 transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-2"
                style={{ border: `1px solid ${GREEN}20`, boxShadow: `0 0 20px ${GREEN}04` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${GREEN}50`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${GREEN}20`}
              >
                <div className="w-full h-48 rounded-xl overflow-hidden mb-5 border border-white/5 relative flex items-center justify-center p-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
                  <img src={cert.image} alt={cert.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: 'rgba(3,7,18,0.7)' }}>
                    <span className="font-bold text-xs flex items-center gap-1.5 font-mono px-3 py-1.5 rounded-full" style={{ background: GREEN, color: '#030712' }}><ExternalLink size={12} /> Voir</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full" style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>{cert.badge}</span>
                  <span className="font-mono text-[10px] text-text/40">{cert.date}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-accent transition-colors mb-1" style={{}}>  {cert.title}</h3>
                <div className="text-xs text-text/50 mb-3 font-mono">{cert.issuer}</div>
                <p className="text-[11px] text-text/65 leading-relaxed mb-4 flex-1">{cert.desc}</p>
                <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
                  {cert.skills.map((s, j) => (
                    <span key={j} className="font-mono text-[10px] text-text/50 bg-primary/60 px-1.5 py-0.5 rounded">#{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-6 section-anim" style={{ background: 'rgba(13,17,23,0.5)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="font-mono text-xs mb-2 flex items-center justify-center gap-2" style={{ color: GREEN }}><span style={{ opacity: 0.4 }}>05.</span> STACK_TECHNIQUE</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Compétences <span style={{ color: CYAN }}>Clés</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, i) => {
              const c = skill.green ? GREEN : CYAN;
              return (
                <div key={i} className="skill-card bg-muted rounded-2xl p-5 flex flex-col items-center justify-between text-center aspect-square group hover:scale-[1.04] transition-all"
                  style={{ border: `1px solid ${c}20`, boxShadow: `0 0 20px ${c}08` }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${c}50`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${c}20`}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ border: `1px solid ${c}30`, background: `${c}12` }}>
                    <skill.icon size={18} style={{ color: c }} />
                  </div>
                  <div>
                    <div className="font-mono text-lg font-bold mb-0.5" style={{ color: c }}>{skill.percent}%</div>
                    <h4 className="font-bold text-[11px] text-white leading-tight">{skill.name}</h4>
                  </div>
                  <div className="w-full h-1 rounded-full overflow-hidden bg-primary/60">
                    <div className="h-full rounded-full" style={{ width: `${skill.percent}%`, background: c }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Langues */}
          <div className="mt-12 bg-muted rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6" style={{ border: `1px solid ${GREEN}15` }}>
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3 rounded-xl" style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}25` }}><Languages size={22} style={{ color: GREEN }} /></div>
              <div>
                <h3 className="font-bold text-white">Langues</h3>
                <p className="text-[11px] text-text/50 font-mono">Multilingual communicator</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {languages.map((item, i) => (
                <div key={i} className="bg-primary/70 px-4 py-2.5 rounded-xl border border-white/5 text-center">
                  <div className="text-xs font-bold text-white">{item.lang}</div>
                  <div className="flex justify-center gap-1 my-1">
                    {[1, 2, 3, 4, 5].map(d => (
                      <span key={d} className="w-2 h-2 rounded-full" style={{ background: d <= item.dots ? GREEN : 'rgba(255,255,255,0.1)' }}></span>
                    ))}
                  </div>
                  <div className="text-[10px] text-text/50 font-mono">{item.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 50%, ${GREEN}08 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, ${CYAN}08 0%, transparent 60%)` }}></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 section-anim">
          <div className="font-mono text-xs mb-3 flex items-center justify-center gap-2" style={{ color: GREEN }}><span style={{ opacity: 0.4 }}>06.</span> CONTACT</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white font-serif mb-4">Travaillons <span style={{ color: GREEN, textShadow: `0 0 30px ${GREEN}60` }}>ensemble</span></h2>
          <p className="text-text/60 max-w-lg mx-auto text-sm font-mono mb-12">
            <span style={{ color: GREEN }}>// </span>Opportunités en Informatique de Gestion, design ou admin réseau.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {/* Email */}
            <div className="bg-muted p-5 rounded-2xl flex flex-col items-center gap-3 group" style={{ border: `1px solid ${GREEN}20` }}>
              <div className="p-3 rounded-xl group-hover:scale-110 transition-transform" style={{ background: `${GREEN}12` }}><Mail size={22} style={{ color: GREEN }} /></div>
              <div className="text-center">
                <span className="font-mono text-[10px] text-text/50 uppercase block mb-1">Email</span>
                <span className="text-xs text-white font-mono font-medium break-all select-all">Saidousy0008@gmail.com</span>
              </div>
              <div className="flex gap-2 w-full">
                <a href={gmailUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 font-mono"
                  style={{ background: GREEN, color: '#030712' }}
                ><Send size={11} /> Gmail</a>
                <button onClick={() => copyToClipboard('Saidousy0008@gmail.com', 'email')}
                  className="bg-white/5 hover:bg-white/10 text-white text-[11px] py-1.5 px-2 rounded-lg transition-colors flex items-center gap-1 font-mono"
                >{copiedType === 'email' ? <Check size={12} style={{ color: GREEN }} /> : <Copy size={12} />} Copier</button>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="bg-muted p-5 rounded-2xl flex flex-col items-center gap-3 group" style={{ border: `1px solid ${CYAN}20` }}>
              <div className="p-3 rounded-xl group-hover:scale-110 transition-transform" style={{ background: `${CYAN}12` }}><Linkedin size={22} style={{ color: CYAN }} /></div>
              <div className="text-center">
                <span className="font-mono text-[10px] text-text/50 uppercase block mb-1">LinkedIn</span>
                <span className="text-xs text-white font-mono font-medium">Saïdou SY</span>
              </div>
              <div className="flex gap-2 w-full">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 font-mono"
                  style={{ background: CYAN, color: '#030712' }}
                ><Linkedin size={11} /> Profil</a>
                <button onClick={() => copyToClipboard(linkedinUrl, 'linkedin')}
                  className="bg-white/5 hover:bg-white/10 text-white text-[11px] py-1.5 px-2 rounded-lg transition-colors flex items-center gap-1 font-mono"
                >{copiedType === 'linkedin' ? <Check size={12} style={{ color: CYAN }} /> : <Copy size={12} />} Copier</button>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-muted p-5 rounded-2xl flex flex-col items-center gap-3 group" style={{ border: `1px solid ${GREEN}20` }}>
              <div className="p-3 rounded-xl group-hover:scale-110 transition-transform" style={{ background: `${GREEN}12` }}><Phone size={22} style={{ color: GREEN }} /></div>
              <div className="text-center">
                <span className="font-mono text-[10px] text-text/50 uppercase block mb-1">Téléphone</span>
                <span className="text-xs text-white font-mono font-medium">+221 77 859 58 00</span>
              </div>
              <div className="flex gap-2 w-full">
                <a href="tel:+221778595800" className="flex-1 text-[11px] font-bold py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 font-mono" style={{ background: GREEN, color: '#030712' }}><Phone size={11} /> Appeler</a>
                <button onClick={() => copyToClipboard('+221778595800', 'phone')} className="bg-white/5 hover:bg-white/10 text-white text-[11px] py-1.5 px-2 rounded-lg transition-colors flex items-center gap-1 font-mono">
                  {copiedType === 'phone' ? <Check size={12} style={{ color: GREEN }} /> : <Copy size={12} />} Copier
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="bg-muted p-5 rounded-2xl flex flex-col items-center gap-3" style={{ border: `1px solid ${CYAN}20` }}>
              <div className="p-3 rounded-xl" style={{ background: `${CYAN}12` }}><MapPin size={22} style={{ color: CYAN }} /></div>
              <div className="text-center">
                <span className="font-mono text-[10px] text-text/50 uppercase block mb-1">Localisation</span>
                <span className="text-xs text-white font-mono font-medium">Mariste, Dakar, SN</span>
              </div>
              <div className="w-full">
                <span className="font-mono text-[10px] block text-center py-1.5 rounded-lg" style={{ color: CYAN, background: `${CYAN}12`, border: `1px solid ${CYAN}25` }}>Présentiel & Remote</span>
              </div>
            </div>
          </div>

          <a href={gmailUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-sm font-mono hover:scale-[1.03] transition-all duration-300"
            style={{ background: `linear-gradient(135deg,${GREEN},${CYAN})`, color: '#030712', boxShadow: `0 0 40px ${GREEN}40` }}
          ><Send size={16} /> Envoyer un message via Gmail</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary py-8 text-center text-[11px] font-mono text-text/40 flex flex-col items-center gap-2" style={{ borderTop: `1px solid ${GREEN}15` }}>
        <div className="flex items-center gap-2" style={{ color: GREEN }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}` }}></div>
          <span>Disponible immédiatement • Dakar & Remote</span>
        </div>
        <div>&copy; {new Date().getFullYear()} Saïdou SY — Informatique de Gestion & Design Graphique.</div>
      </footer>

      {/* MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.92)' }} onClick={() => setSelectedCert(null)}>
          <div className="bg-muted rounded-2xl max-w-2xl w-full p-6 relative" style={{ border: `1px solid ${GREEN}30`, boxShadow: `0 0 60px ${GREEN}15` }} onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 w-full h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg,${GREEN},${CYAN},transparent)` }}></div>
            <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 p-2 rounded-full text-white transition-all z-10" style={{ background: 'rgba(0,0,0,0.6)' }}
              onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = '#030712'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.color = 'white'; }}
            ><X size={18} /></button>
            <div className="w-full max-h-[60vh] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-5" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <img src={selectedCert.image} alt={selectedCert.title} className="max-h-[55vh] max-w-full object-contain rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs px-3 py-0.5 rounded-full" style={{ color: GREEN, background: `${GREEN}15`, border: `1px solid ${GREEN}30` }}>{selectedCert.badge}</span>
                <span className="font-mono text-xs text-text/50">{selectedCert.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
              <div className="text-sm font-mono" style={{ color: CYAN }}>{selectedCert.issuer}</div>
              <p className="text-[12px] text-text/65 leading-relaxed pt-2 border-t border-white/10">{selectedCert.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}