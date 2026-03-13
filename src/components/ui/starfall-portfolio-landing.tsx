import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────
const SANS = "'Inter', system-ui, sans-serif";
const BG = "#0F0F0F";
const CARD = "linear-gradient(120deg, #1E1E1E 0%, #121212 100%)";
const CARD_HOVER = "linear-gradient(120deg, #242424 0%, #181818 100%)";
const BORDER = "#2A2A2A";
const BORDER_HOVER = "rgba(255,255,255,0.2)";
const WHITE = "#ffffff";
const DIM = "rgba(255,255,255,0.45)";
const DIM2 = "rgba(255,255,255,0.25)";
const BLUE = "#5c7cfa";

// ─── Personal Data ────────────────────────────────────────────────────────────
const ME = {
    name: "Sreerag",
    lastname: "P.",
    fullname: "Sreerag P",
    handle: "@sreeragp",
    roleLabel: "A FLUTTER & WEB DEVELOPER",
    tagline: "I am a web & mobile developer based in Kerala, India.",
    email: "sreeragpmelmuri@gmail.com",
};

const EXPERIENCE = [
    { period: "2025 – Present", role: "Flutter Developer", company: "Spine Codes, Malappuram", desc: "Developing production-ready Flutter applications with scalable architecture and Firebase integration, while focusing on performance optimization and smooth user experience." },
    { period: "2024 – 2025", role: "Flutter Intern", company: "Neurobots", desc: "Completed a 6-month internship working on Flutter mobile applications, building UI components, learning API integration, and gaining real-world development experience." },
];

const EDUCATION = [
    { period: "2020 - 2023", role: "BA History", company: "University of Calicut", desc: "Bachelor of Arts in History — built strong analytical and communication foundations." },
];

const SKILLS = [
    { name: "Flutter", desc: "Cross-Platform" },
    { name: "Dart", desc: "Programming" },
    { name: "Responsive UI Design", desc: "Adaptive UI" },
    { name: "Provider", desc: "State Management" },
    { name: "BLoC Architecture", desc: "State Management" },
    { name: "REST API Integration", desc: "API Integration" },
    { name: "Firebase Authentication", desc: "User Auth" },
    { name: "Cloud Firestore", desc: "Database" }
];

const SOFT_SKILLS = [
    { name: "Team Collaboration", desc: "Team Work" },
    { name: "Problem Solving", desc: "Issue Handling" },
    { name: "Clean Code", desc: "Code Quality" },
    { name: "Communication", desc: "Clear Communication" },
    { name: "Time Management", desc: "Task Planning" },
    { name: "Adaptability", desc: "Quick Learning" }
];

const AWARDS = [
    { date: "15 May 2025", title: "Star of the Month", org: "Spine Codes" },
    { date: "10 February 2026", title: "Star of the Month", org: "Spine Codes" }
];

const PROJECTS = [
    { title: "ShopEasy", tags: ["Flutter", "Firebase"], desc: "E-commerce app with Razorpay." },
    { title: "ChatWave", tags: ["Flutter", "FCM"], desc: "Real-time chat with push notifications." },
    { title: "FitTrack", tags: ["Flutter", "SQLite"], desc: "Fitness tracker with fl_chart." },
    { title: "ExpenseManager", tags: ["Flutter", "CSV"], desc: "Finance manager with budget goals." }
];

// ─── Animations ───────────────────────────────────────────────────────────────

const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    }
} as any;

const childVariants = {
    hidden: { opacity: 0, x: 120, scale: 0.96 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any } }
} as any;

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
} as any;

const staggerItem = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as any } }
} as any;

const scaleRevealVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as any } }
} as any;

const aboutPageVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as any, staggerChildren: 0.15, delayChildren: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any }
    }
} as any;

const aboutChildVariants = {
    hidden: { opacity: 0, x: 100, y: 100 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] as any } }
} as any;

// ─── Components ────────────────────────────────────────────────────────────────

const IconBtn = ({ isHover }: { isHover?: boolean }) => (
    <div style={{
        width: 44, height: 44, borderRadius: "50%",
        border: `1px solid ${isHover ? WHITE : BORDER}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s ease",
        color: isHover ? WHITE : DIM,
        flexShrink: 0
    }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 12 Q7 13 8 16 Q9 13 12 12 Q9 11 8 8 Q7 11 4 12Z" fill="currentColor" stroke="none" />
            <path d="M10 12h10M20 12l-5-5M20 12l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const BentoCard = ({ children, style, onClick, className, variantsOverride }: any) => {
    const [hov, setHov] = useState(false);
    return (
        <motion.div
            variants={variantsOverride || childVariants}
            onClick={onClick}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className={className}
            style={{
                background: hov ? CARD_HOVER : CARD,
                borderRadius: 30,
                border: `1px solid ${hov ? BORDER_HOVER : "transparent"}`,
                transition: "all 0.3s ease",
                cursor: onClick ? "pointer" : "default",
                position: "relative",
                overflow: "hidden",
                ...style
            }}
        >
            {typeof children === "function" ? children(hov) : children}
        </motion.div>
    );
};

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ current, onNav }: { current: string, onNav: (p: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleNav = (id: string) => {
        setIsOpen(false);
        onNav(id);
    };

    return (
        <nav style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            maxWidth: 1250, margin: "0 auto", padding: "32px 24px",
            position: "relative"
        }}>
            <div
                onClick={() => handleNav("home")}
                style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.04em", color: WHITE, cursor: "pointer", position: "relative", zIndex: 101 }}>
                Sreerag
            </div>

            <div style={{ display: "flex", gap: 36 }} className="hide-mobile">
                {["Home", "About", "Works", "Contact"].map(n => {
                    const id = n.toLowerCase();
                    const active = current === id || (current === 'home' && n === 'Home');
                    return (
                        <div key={n} onClick={() => handleNav(id === 'home' ? 'home' : id === 'works' ? 'projects' : id === 'about' ? 'about' : 'details')} style={{
                            fontSize: 14, color: active ? WHITE : DIM, fontWeight: 500,
                            cursor: "pointer", transition: "color 0.2s"
                        }} onMouseEnter={e => (e.currentTarget.style.color = WHITE)} onMouseLeave={e => (e.currentTarget.style.color = active ? WHITE : DIM)}>
                            {n}
                        </div>
                    );
                })}
            </div>

            <button className="hide-mobile" style={{
                background: "#262626", color: WHITE, padding: "12px 28px", borderRadius: 30,
                border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background 0.2s"
            }} onMouseEnter={e => (e.currentTarget.style.background = "#333")} onMouseLeave={e => (e.currentTarget.style.background = "#262626")}>
                Let's talk
            </button>

            <div className="show-mobile" onClick={() => setIsOpen(!isOpen)} style={{ fontSize: 28, color: WHITE, cursor: "pointer", position: "relative", zIndex: 101 }}>
                {isOpen ? "✕" : "☰"}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                            background: "rgba(15, 15, 15, 0.98)", zIndex: 100,
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32
                        }}
                    >
                        {["Home", "About", "Works", "Contact"].map(n => {
                            const id = n.toLowerCase();
                            const active = current === id || (current === 'home' && n === 'Home');
                            return (
                                <div key={n} onClick={() => handleNav(id === 'home' ? 'home' : id === 'works' ? 'projects' : id === 'about' ? 'about' : 'details')} style={{
                                    fontSize: 24, color: active ? WHITE : DIM, fontWeight: 600, cursor: "pointer"
                                }}>
                                    {n}
                                </div>
                            );
                        })}
                        <button onClick={() => setIsOpen(false)} style={{
                            marginTop: 16, background: "#262626", color: WHITE, padding: "16px 36px", borderRadius: 30,
                            border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer"
                        }}>
                            Let's talk
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

// ─── Home Grid View ───────────────────────────────────────────────────────────
function HomeGrid({ onNav }: { onNav: (p: string) => void }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="hidden" animate="visible" exit="exit"
            style={{ maxWidth: 1250, margin: "0 auto", padding: "0 24px 60px" }}
        >
            <div className="home-grid-layout" style={{ marginBottom: 24 }}>

                {/* Main Hero Card (Left) */}
                <BentoCard onClick={() => onNav("about")} style={{ padding: 48, display: "flex", gap: 36, minHeight: 320 }} className="hero-card-mobile flex-col-small">
                    {(hov: boolean) => (
                        <>
                            <div className="hero-image-mobile" style={{
                                flexShrink: 0, width: 230, height: 230, borderRadius: "30px 4px 30px 4px",
                                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
                                overflow: "hidden"
                            }}>
                                <img src="/WhatsApp-Image-2026-03-07-at-9.27.22-PM.png" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(20%) drop-shadow(0 0 10px rgba(0,0,0,0.4))" }} alt={ME.name} />
                            </div>
                            <div className="hero-text-mobile" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <div style={{ fontSize: 13, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10, fontWeight: 600 }}>{ME.roleLabel}</div>
                                <h1 style={{ fontSize: 48, lineHeight: 1.1, color: WHITE, fontWeight: 500, marginBottom: 16 }}>{ME.name}<br />{ME.lastname}</h1>
                                <p style={{ fontSize: 14, color: DIM, lineHeight: 1.6, marginBottom: 20 }}>{ME.tagline}</p>
                            </div>
                            <div style={{ position: "absolute", bottom: 40, right: 40 }}>
                                <IconBtn isHover={hov} />
                            </div>
                        </>
                    )}
                </BentoCard>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

                    <BentoCard variantsOverride={childVariants} style={{ height: 60, borderRadius: 100, padding: "0 24px", display: "flex", alignItems: "center", overflow: "hidden" }}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to right, ${CARD}, transparent)`, zIndex: 2 }} />
                        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to left, ${CARD}, transparent)`, zIndex: 2 }} />
                        <div style={{ display: "flex", animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
                            <span style={{ fontSize: 11, color: DIM, letterSpacing: 2, fontWeight: 600, textTransform: "uppercase" }}>
                                {"LATEST WORK AND FEATURED • ".repeat(6)}
                            </span>
                        </div>
                    </BentoCard>

                    <div className="home-grid-layout" style={{ flex: 1 }}>
                        <BentoCard onClick={() => onNav("details")} style={{ padding: 32, display: "flex", flexDirection: "column", minWidth: 200 }} className="card-mobile">
                            {(hov: boolean) => (
                                <>
                                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                        <svg width="140" height="auto" viewBox="0 0 200 60" fill="none" opacity={0.6}>
                                            <path d="M20 40 Q40 10 60 30 T100 20 T140 40 T180 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                        <div>
                                            <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>More about me</div>
                                            <div style={{ fontSize: 20, color: WHITE, fontWeight: 500 }}>Credentials</div>
                                        </div>
                                        <IconBtn isHover={hov} />
                                    </div>
                                </>
                            )}
                        </BentoCard>

                        <BentoCard onClick={() => onNav("projects")} style={{ padding: 32, display: "flex", flexDirection: "column", minWidth: 200 }} className="card-mobile">
                            {(hov: boolean) => (
                                <>
                                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <div style={{ background: "#222", padding: "8px", borderRadius: 8, border: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 6, width: "100%", maxWidth: 160 }}>
                                            <div style={{ display: "flex", gap: 4 }}>
                                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff5f57" }} />
                                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#febc2e" }} />
                                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#28c840" }} />
                                            </div>
                                            <div style={{ background: "#111", height: 60, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <span style={{ fontSize: 10, color: DIM2, fontWeight: 600 }}>MY WORKS</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                        <div>
                                            <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Showcase</div>
                                            <div style={{ fontSize: 20, color: WHITE, fontWeight: 500 }}>Projects</div>
                                        </div>
                                        <IconBtn isHover={hov} />
                                    </div>
                                </>
                            )}
                        </BentoCard>
                    </div>
                </div>
            </div>

            <div className="home-stats-layout">
                <BentoCard style={{ padding: 32, display: "flex", flexDirection: "column", minHeight: 240 }} className="card-mobile">
                    {(hov: boolean) => (
                        <>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ fontSize: 80, fontWeight: 800, color: WHITE, letterSpacing: -2, border: `2px solid ${BORDER}`, padding: "0 24px", borderRadius: 24, background: "#111" }}>
                                    G
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Blog</div>
                                    <div style={{ fontSize: 20, color: WHITE, fontWeight: 500 }}>GFonts</div>
                                </div>
                                <IconBtn isHover={hov} />
                            </div>
                        </>
                    )}
                </BentoCard>

                <BentoCard style={{ padding: 32, display: "flex", flexDirection: "column", minHeight: 240 }} className="card-mobile">
                    {(hov: boolean) => (
                        <>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                                {[
                                    <svg key="1" width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="white" strokeOpacity="1" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" stroke="white" strokeOpacity="1" strokeWidth="1.5" /></svg>,
                                    <svg key="2" width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M12 19l4-4m-4 4l-4-4m4 4V5" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
                                    <svg key="3" width="36" height="36" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="1" strokeWidth="1.5" /><path d="M12 3a9 9 0 011 9 9 9 0 01-1 9 9 9 0 01-1-9 9 9 0 011-9z" stroke="white" strokeOpacity="1" strokeWidth="1.5" /></svg>,
                                    <svg key="4" width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M8 6l-6 6 6 6m8-12l6 6-6 6" stroke="white" strokeOpacity="1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                ]}
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Specialization</div>
                                    <div style={{ fontSize: 20, color: WHITE, fontWeight: 500 }}>Services Offering</div>
                                </div>
                                <IconBtn isHover={hov} />
                            </div>
                        </>
                    )}
                </BentoCard>

                <BentoCard style={{ padding: 32, display: "flex", flexDirection: "column", minHeight: 240 }} className="card-mobile">
                    {(hov: boolean) => (
                        <>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111", border: `2px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
                                </div>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111", border: `2px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Stay with me</div>
                                    <div style={{ fontSize: 20, color: WHITE, fontWeight: 500 }}>Profiles</div>
                                </div>
                                <IconBtn isHover={hov} />
                            </div>
                        </>
                    )}
                </BentoCard>

            </div>
        </motion.div>
    );
}

// ─── Details View (About / Credentials / etc) ──────────────────────────────────
function DetailsPage() {
    return (
        <motion.div
            variants={pageVariants}
            initial="hidden" animate="visible" exit="exit"
            style={{
                width: "100vw", position: "relative",
                left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw",
                background: BG, // ensure solid background for the full-width wipe
            }}
        >
            <div style={{
                maxWidth: 1250, margin: "0 auto", padding: "0 24px 80px",
                display: "flex", gap: 60, alignItems: "flex-start", flexWrap: "wrap", position: "relative"
            }}>
                {/* LEFT COLUMN: Sticky Profile */}
                <motion.div variants={childVariants} style={{ flex: "1 1 300px", maxWidth: 360, background: CARD, borderRadius: 30, padding: "32px", border: `1px solid ${BORDER}`, position: "sticky", top: 120, height: "fit-content" }}>
                    <div style={{
                        borderRadius: 24, background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
                        width: "100%", aspectRatio: "1/1", marginBottom: 32, overflow: "hidden"
                    }}>
                        <img src="/WhatsApp-Image-2026-03-07-at-9.27.22-PM.png" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(20%) drop-shadow(0 0 10px rgba(0,0,0,0.4))" }} alt={ME.name} />
                    </div>
                    <h2 style={{ fontSize: 28, color: WHITE, fontWeight: 500, marginBottom: 4, textAlign: "center" }}>{ME.fullname}</h2>
                    <div style={{ fontSize: 15, color: DIM, textAlign: "center", marginBottom: 32 }}>{ME.handle}</div>

                    <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
                        {["GH", "TW", "IN", "DR"].map(s => (
                            <div key={s} style={{ width: 50, height: 50, borderRadius: "50%", background: "#1C1C1C", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontSize: 13, fontWeight: 600 }}>{s}</div>
                        ))}
                    </div>
                    <button style={{ width: "100%", padding: "16px 0", borderRadius: 16, background: "#262626", color: WHITE, border: "none", fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#333")} onMouseLeave={e => (e.currentTarget.style.background = "#262626")}>Contact Me</button>
                </motion.div>

                {/* RIGHT COLUMN: Scrolling Content */}
                <motion.div variants={childVariants} style={{ flex: "2 1 500px", paddingTop: 16 }}>
                    <div style={{ marginBottom: 64 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: WHITE, textTransform: "uppercase", marginBottom: 32 }}>About Me</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        >
                            <p style={{ fontSize: 16, color: WHITE, lineHeight: 1.8 }}>
                                I am a passionate Flutter Developer focused on building modern, high-performance mobile applications with clean architecture and smooth user experiences. I enjoy transforming ideas into real products by creating responsive UI, efficient state management, and well-structured code.
                                <br /><br />
                                I have experience working with Flutter frameworks and tools such as Provider, BLoC, and Firebase integration for authentication, real-time data, and backend services. I continuously explore new technologies and best practices to improve app performance and user experience.
                                <br /><br />
                                My goal is to develop scalable applications that combine beautiful design, efficient functionality, and reliable performance.
                            </p>
                        </motion.div>
                    </div>

                    <div style={{ marginBottom: 64 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: WHITE, textTransform: "uppercase", marginBottom: 36 }}>Experience</div>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {EXPERIENCE.map((ex, i) => (
                                <motion.div key={i} variants={staggerItem} style={{ marginBottom: 36 }}>
                                    <div style={{ fontSize: 14, color: WHITE, marginBottom: 8 }}>{ex.period}</div>
                                    <div style={{ fontSize: 18, color: BLUE, fontWeight: 500, marginBottom: 6 }}>{ex.role}</div>
                                    <div style={{ fontSize: 14, color: WHITE, opacity: 0.7, marginBottom: 12 }}>{ex.company}</div>
                                    <p style={{ fontSize: 15, color: WHITE, opacity: 0.7, lineHeight: 1.7 }}>{ex.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div style={{ marginBottom: 64 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: WHITE, textTransform: "uppercase", marginBottom: 36 }}>Education</div>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {EDUCATION.map((ex, i) => (
                                <motion.div key={i} variants={staggerItem} style={{ marginBottom: 36 }}>
                                    <div style={{ fontSize: 14, color: WHITE, marginBottom: 8 }}>{ex.period}</div>
                                    <div style={{ fontSize: 18, color: BLUE, fontWeight: 500, marginBottom: 6 }}>{ex.role}</div>
                                    <div style={{ fontSize: 14, color: WHITE, opacity: 0.7, marginBottom: 12 }}>{ex.company}</div>
                                    <p style={{ fontSize: 15, color: WHITE, opacity: 0.7, lineHeight: 1.7 }}>{ex.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div style={{ marginBottom: 64 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: WHITE, textTransform: "uppercase", marginBottom: 44 }}>Skills</div>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 60px" }}>
                                {SKILLS.map((sk, i) => (
                                    <motion.div key={i} variants={staggerItem}>
                                        <div style={{ fontSize: 18, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{sk.name}</div>
                                        <div style={{ fontSize: 14, color: WHITE, opacity: 0.7 }}>{sk.desc}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div style={{ marginBottom: 64 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: WHITE, textTransform: "uppercase", marginBottom: 44 }}>Soft Skills</div>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 60px" }}>
                                {SOFT_SKILLS.map((sk, i) => (
                                    <motion.div key={i} variants={staggerItem}>
                                        <div style={{ fontSize: 18, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{sk.name}</div>
                                        <div style={{ fontSize: 14, color: WHITE, opacity: 0.7 }}>{sk.desc}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div style={{ marginBottom: 64 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 2, color: WHITE, textTransform: "uppercase", marginBottom: 36 }}>Awards</div>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            {AWARDS.map((aw, i) => (
                                <motion.div key={i} variants={staggerItem} style={{ marginBottom: 36 }}>
                                    <div style={{ fontSize: 14, color: WHITE, marginBottom: 8 }}>{aw.date}</div>
                                    <div style={{ fontSize: 18, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{aw.title}</div>
                                    <div style={{ fontSize: 14, color: WHITE, opacity: 0.7 }}>{aw.org}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                </motion.div>
            </div>
        </motion.div>
    );
}

// ─── New About Page ────────────────────────────────────────────────────────────
function AboutPage({ onNav }: { onNav: (p: string) => void }) {
    return (
        <motion.div
            variants={aboutPageVariants}
            initial="hidden" animate="visible" exit="exit"
            style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px", display: "flex", flexDirection: "column", gap: 40 }}
        >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: "grid", gridTemplateColumns: "minmax(0, 310px) minmax(0, 1fr)", gap: 24, alignItems: "stretch" }} className="home-grid-layout">
                {/* Photo Card */}
                <BentoCard variantsOverride={aboutChildVariants} style={{ padding: 24, cursor: "default", display: "flex", flexDirection: "column" }}>
                    {() => (
                        <div style={{ flex: 1, display: "flex", aspectRatio: "1/1" }}>
                            <div style={{
                                flex: 1, borderRadius: 24,
                                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
                                overflow: "hidden"
                            }}>
                                <img src="/WhatsApp-Image-2026-03-07-at-9.27.22-PM.png" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(20%)" }} alt={ME.name} />
                            </div>
                        </div>
                    )}
                </BentoCard>

                {/* Right Column Top */}
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    <motion.div variants={aboutChildVariants} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 12, marginBottom: 8 }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={{ transform: "rotate(45deg)" }}><path d="M12 2v20m10-10H2m15 7L7 5m10-10l-10 14" strokeLinecap="round" /></svg>
                        <h1 style={{ fontSize: 52, fontWeight: 700, color: WHITE, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>SELF-SUMMARY</h1>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={{ transform: "rotate(45deg)" }}><path d="M12 2v20m10-10H2m15 7L7 5m10-10l-10 14" strokeLinecap="round" /></svg>
                    </motion.div>

                    <BentoCard variantsOverride={aboutChildVariants} style={{ padding: "32px 40px", display: "flex", flexDirection: "column", justifyContent: "center", cursor: "default", flex: 1 }}>
                        {() => (
                            <div>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" opacity={0.5} style={{ marginBottom: 16 }}><path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" fill="white" strokeLinecap="round" /></svg>
                                <h2 style={{ fontSize: 48, color: WHITE, fontWeight: 500, marginBottom: 16 }}>{ME.fullname}</h2>
                                <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, maxWidth: "100%" }}>
                                    I am a web & mobile developer based in Kerala, India with a focus on web design, cross-platform mobile app development, and visual development. I have a diverse range of experience having worked across various fields and industries.
                                </p>
                            </div>
                        )}
                    </BentoCard>
                </div>

                {/* Experience Card */}
                <BentoCard variantsOverride={aboutChildVariants} style={{ padding: 40, cursor: "default" }}>
                    {() => (
                        <div>
                            <div style={{ fontSize: 16, color: WHITE, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 32 }}>EXPERIENCE</div>
                            {EXPERIENCE.map((ex, i) => (
                                <div key={i} style={{ marginBottom: 24 }}>
                                    <div style={{ fontSize: 16, color: DIM, marginBottom: 8 }}>{ex.period}</div>
                                    <div style={{ fontSize: 20, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{ex.role}</div>
                                    <div style={{ fontSize: 16, color: DIM }}>{ex.company}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </BentoCard>

                {/* Education Card */}
                <BentoCard variantsOverride={aboutChildVariants} style={{ padding: 40, cursor: "default" }}>
                    {() => (
                        <div>
                            <div style={{ fontSize: 16, color: WHITE, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 32 }}>EDUCATION</div>
                            {EDUCATION.map((ex, i) => (
                                <div key={i} style={{ marginBottom: 24 }}>
                                    <div style={{ fontSize: 16, color: DIM, marginBottom: 8 }}>{ex.period}</div>
                                    <div style={{ fontSize: 20, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{ex.role}</div>
                                    <div style={{ fontSize: 16, color: DIM }}>{ex.company}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </BentoCard>
            </motion.div>

            {/* Bottom Cards Row */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ display: "grid", gap: 24, marginTop: 0 }} className="about-stats-layout">
                {/* Profiles Card */}
                <BentoCard variantsOverride={aboutChildVariants} onClick={() => window.open('https://twitter.com', '_blank')} style={{ padding: 32, display: "flex", flexDirection: "column", minHeight: 200 }} className="card-mobile">
                    {(hov: boolean) => (
                        <>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111", border: `2px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
                                </div>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111", border: `2px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Stay with me</div>
                                    <div style={{ fontSize: 20, color: WHITE, fontWeight: 500 }}>Profiles</div>
                                </div>
                                <IconBtn isHover={hov} />
                            </div>
                        </>
                    )}
                </BentoCard>

                {/* Let's work together Card */}
                <BentoCard variantsOverride={aboutChildVariants} onClick={() => onNav("details")} style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200 }} className="card-mobile">
                    {(hov: boolean) => (
                        <>
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" style={{ transform: "rotate(45deg)", marginBottom: 16 }}><path d="M12 2v20m10-10H2m15 7L7 5m10-10l-10 14" strokeLinecap="round" /></svg>
                            <h2 style={{ fontSize: 44, color: WHITE, fontWeight: 500, lineHeight: 1.1, marginTop: 'auto' }}>
                                Let's <br /> work <span style={{ color: BLUE }}>together.</span>
                            </h2>
                            <div style={{ position: "absolute", bottom: 40, right: 40 }}>
                                <IconBtn isHover={hov} />
                            </div>
                        </>
                    )}
                </BentoCard>

                {/* Credentials Card */}
                <BentoCard variantsOverride={aboutChildVariants} onClick={() => onNav("details")} style={{ padding: 32, display: "flex", flexDirection: "column", minWidth: 200, minHeight: 200 }} className="card-mobile">
                    {(hov: boolean) => (
                        <>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                <svg width="140" height="auto" viewBox="0 0 200 60" fill="none" opacity={0.6}>
                                    <path d="M20 40 Q40 10 60 30 T100 20 T140 40 T180 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                    <div style={{ fontSize: 11, color: DIM, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>More about me</div>
                                    <div style={{ fontSize: 20, color: WHITE, fontWeight: 500 }}>Credentials</div>
                                </div>
                                <IconBtn isHover={hov} />
                            </div>
                        </>
                    )}
                </BentoCard>
            </motion.div>
        </motion.div>
    );
}

// ─── Projects View ────────────────────────────────────────────────────────────
function ProjectsPage() {
    return (
        <motion.div
            variants={pageVariants}
            initial="hidden" animate="visible" exit="exit"
            style={{ maxWidth: 1250, margin: "0 auto", padding: "0 24px 80px", display: "flex", flexDirection: "column", gap: 40 }}
        >
            <motion.div variants={childVariants}>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: 1, color: WHITE, textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>Showcase</div>
                <h1 style={{ fontSize: 48, fontWeight: 500, color: WHITE, textAlign: "center", marginBottom: 80 }}>My Projects</h1>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                {PROJECTS.map((p, i) => (
                    <motion.div key={i} variants={childVariants} style={{ background: CARD, borderRadius: 24, padding: 32, border: `1px solid ${BORDER}` }}>
                        <div style={{ height: 200, background: "#0a0a0a", borderRadius: 16, marginBottom: 24 }}></div>
                        <div style={{ fontSize: 20, color: WHITE, fontWeight: 500, marginBottom: 12 }}>{p.title}</div>
                        <p style={{ fontSize: 15, color: DIM, lineHeight: 1.6 }}>{p.desc}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main App Shell ───────────────────────────────────────────────────────────
export default function PortfolioLayout() {
    const [page, setPage] = useState<string>("home");

    return (
        <div style={{ background: BG, color: WHITE, fontFamily: SANS, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

            {/* Nav remains sticky at top */}
            <div style={{ position: "sticky", top: 0, zIndex: 50, background: BG }}>
                <NavBar current={page} onNav={setPage} />
            </div>

            <main style={{ flex: 1, position: "relative" }}>
                <AnimatePresence mode="wait">
                    {page === "home" && <HomeGrid key="home" onNav={setPage} />}
                    {page === "details" && <DetailsPage key="details" />}
                    {page === "about" && <AboutPage key="about" onNav={setPage} />}
                    {page === "projects" && <ProjectsPage key="projects" />}
                </AnimatePresence>
            </main>



            <style>{`
        body { background: #0F0F0F; margin: 0; }
        ::-webkit-scrollbar { width: 4px; background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        
        .show-mobile { display: none; }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .home-grid-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; }
        .home-stats-layout { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 24px; }
        .about-stats-layout { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.6fr) minmax(0, 0.7fr); gap: 24px; }

        @media (max-width: 900px) {
          .flex-col-mobile { flex-direction: column !important; gap: 24px !important; }
          .hide-mobile { display: none !important; }
          .home-grid-layout { grid-template-columns: 1fr !important; }
          .home-stats-layout { grid-template-columns: 1fr !important; }
          .about-stats-layout { grid-template-columns: 1fr !important; }
          /* Reset sticky for mobile */
          div[style*="position: sticky"] { position: relative !important; width: 100% !important; max-width: 100% !important; margin-bottom: 40px; top: 0 !important; }
        }
        @media (max-width: 600px) {
          .flex-col-small { flex-direction: column !important; text-align: center; gap: 24px !important; align-items: stretch !important; }
          .flex-col-small > div:last-child { position: static !important; margin-top: 16px; margin-left: auto; margin-right: auto; }
          
          /* Target grid containers directly */
          .flex-col-mobile { gap: 24px !important; }
          
          /* Remove minWidth limitations on mobile to force wrapping/stacking cleanly */
          .card-mobile, .hero-card-mobile {
              min-width: 0 !important;
              width: 100% !important;
              padding: 24px !important;
          }
          
          /* Ensure hero card text fits */
          .hero-text-mobile h1 { font-size: 32px !important; }
          .hero-card-mobile { padding: 32px 24px !important; }
          .hero-image-mobile { width: 100% !important; max-width: 220px !important; height: auto !important; aspect-ratio: 1/1 !important; margin: 0 auto !important; display: block !important; }
        }

        @media (max-width: 768px) {
          /* Grid layout should become single column */
          .home-grid-layout, .home-stats-layout, .about-stats-layout {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
          }
          /* Font sizes should reduce slightly */
          h1 {
            font-size: 34px !important;
          }
          h2 {
            font-size: 28px !important;
          }
          p {
            font-size: 14px !important;
          }
          /* Cards should stack vertically */
          .card-mobile, .hero-card-mobile {
            width: 100% !important;
            min-width: 100% !important;
            margin-bottom: 16px !important;
          }
          /* Navigation should show hamburger menu */
          .hide-mobile {
            display: none !important;
          }
          .show-mobile {
            display: block !important;
          }
          /* Images should be responsive */
          img {
            max-width: 100% !important;
            height: auto !important;
            object-fit: cover !important;
          }
        }
      `}</style>
        </div>
    );
}
