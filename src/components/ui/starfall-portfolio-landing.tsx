import React, { useEffect, useState } from "react";
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

// ─── Personal Data ────────────────────────────────────────────────────────────
const ME = {
    name: "Sreerag",
    lastname: "P.",
    fullname: "Sreerag P.",
    handle: "@sreeragp",
    roleLabel: "A FLUTTER & WEB DEVELOPER",
    tagline: "I am a web & mobile developer based in Kerala, India.",
    email: "sreeragpmelmuri@gmail.com",
};

const EXPERIENCE = [
    { period: "2024 - Present", role: "Flutter Developer", company: "Spine Codes, Malappuram", desc: "Building production-grade apps with BLoC architecture, Firebase integration, and smooth animations." },
    { period: "2023 - 2024", role: "Junior Flutter Developer", company: "Freelance", desc: "Developed cross-platform mobile apps for clients using REST APIs, SQLite, and custom UI designs." },
    { period: "2023", role: "Flutter Intern", company: "Tech Startup", desc: "Contributed to UI development and bug fixing in a live e-commerce Flutter application." },
];

const EDUCATION = [
    { period: "2020 - 2023", role: "BA History", company: "University of Calicut", desc: "Bachelor of Arts in History — built strong analytical and communication foundations." },
    { period: "2023", role: "Flutter & Dart", company: "Udemy", desc: "End-to-end Flutter development including widgets, state management, and Firebase." }
];

const SKILLS = [
    { name: "Flutter", pct: 90 }, { name: "Dart", pct: 88 },
    { name: "Firebase", pct: 82 }, { name: "REST API", pct: 80 },
    { name: "React", pct: 75 }, { name: "BLoC / Cubit", pct: 78 }
];

const AWARDS = [
    { date: "14 May 2024", title: "Best Flutter App", org: "Spine Codes Hackathon" },
    { date: "26 June 2023", title: "Top Graduate Developer", org: "Kerala Tech Community" }
];

const PROJECTS = [
    { title: "ShopEasy", tags: ["Flutter", "Firebase"], desc: "E-commerce app with Razorpay." },
    { title: "ChatWave", tags: ["Flutter", "FCM"], desc: "Real-time chat with push notifications." },
    { title: "FitTrack", tags: ["Flutter", "SQLite"], desc: "Fitness tracker with fl_chart." },
    { title: "ExpenseManager", tags: ["Flutter", "CSV"], desc: "Finance manager with budget goals." }
];

// ─── Animations ───────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as any;

const pageVariants = {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)", y: 0 },
    visible: {
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        y: 0,
        transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] as any, staggerChildren: 0.3, delayChildren: 0.4 }
    },
    exit: {
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] as any }
    }
};

const childVariants = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as any } }
};

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

const BentoCard = ({ children, style, onClick, className }: any) => {
    const [hov, setHov] = useState(false);
    return (
        <motion.div
            variants={childVariants}
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
    return (
        <nav style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            maxWidth: 1250, margin: "0 auto", padding: "32px 24px",
        }}>
            <div
                onClick={() => onNav("home")}
                style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.04em", color: WHITE, cursor: "pointer" }}>
                Sreerag
            </div>

            <div style={{ display: "flex", gap: 36 }} className="hide-mobile">
                {["Home", "About", "Works", "Contact"].map(n => {
                    const id = n.toLowerCase();
                    const active = current === id || (current === 'home' && n === 'Home') || (current === 'details' && n === 'About');
                    return (
                        <div key={n} onClick={() => onNav(id === 'home' ? 'home' : id === 'works' ? 'projects' : 'details')} style={{
                            fontSize: 14, color: active ? WHITE : DIM, fontWeight: 500,
                            cursor: "pointer", transition: "color 0.2s"
                        }} onMouseEnter={e => (e.currentTarget.style.color = WHITE)} onMouseLeave={e => (e.currentTarget.style.color = active ? WHITE : DIM)}>
                            {n}
                        </div>
                    );
                })}
            </div>

            <button style={{
                background: "#262626", color: WHITE, padding: "12px 28px", borderRadius: 30,
                border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background 0.2s"
            }} onMouseEnter={e => (e.currentTarget.style.background = "#333")} onMouseLeave={e => (e.currentTarget.style.background = "#262626")}>
                Let's talk
            </button>
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
            <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap", flexDirection: "row" }} className="flex-col-mobile">

                {/* Main Hero Card (Left) */}
                <BentoCard onClick={() => onNav("details")} style={{ flex: "1 1 48%", minWidth: 320, padding: 48, display: "flex", alignItems: "center", gap: 36, minHeight: 320 }} className="flex-col-small">
                    {(hov: boolean) => (
                        <>
                            <div style={{
                                flexShrink: 0, width: 230, height: 230, borderRadius: "30px",
                                background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
                                overflow: "hidden"
                            }}>
                                <img src="/person.png" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(20%) drop-shadow(0 0 10px rgba(0,0,0,0.4))" }} alt={ME.name} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
                <div style={{ flex: "1 1 48%", minWidth: 320, display: "flex", flexDirection: "column", gap: 24 }}>

                    <BentoCard style={{ height: 60, borderRadius: 100, padding: "0 24px", display: "flex", alignItems: "center", overflow: "hidden" }}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to right, ${CARD}, transparent)`, zIndex: 2 }} />
                        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 40, background: `linear-gradient(to left, ${CARD}, transparent)`, zIndex: 2 }} />
                        <div style={{ display: "flex", animation: "ticker 20s linear infinite", whiteSpace: "nowrap" }}>
                            <span style={{ fontSize: 11, color: DIM, letterSpacing: 2, fontWeight: 600, textTransform: "uppercase" }}>
                                {"LATEST WORK AND FEATURED • ".repeat(6)}
                            </span>
                        </div>
                    </BentoCard>

                    <div style={{ display: "flex", gap: 24, flex: 1, flexWrap: "wrap" }}>
                        <BentoCard onClick={() => onNav("details")} style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", minWidth: 200 }}>
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

                        <BentoCard onClick={() => onNav("projects")} style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", minWidth: 200 }}>
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

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", flexDirection: "row" }} className="flex-col-mobile">
                <BentoCard style={{ flex: "1 1 calc(33.3% - 16px)", padding: 32, display: "flex", flexDirection: "column", minHeight: 240 }}>
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

                <BentoCard style={{ flex: "2 1 calc(40% - 16px)", padding: 32, display: "flex", flexDirection: "column", minHeight: 240 }}>
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

                <BentoCard style={{ flex: "1 1 calc(26.6% - 16px)", padding: 32, display: "flex", flexDirection: "column", minHeight: 240 }}>
                    {(hov: boolean) => (
                        <>
                            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111", border: `2px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontSize: 13, fontWeight: 600 }}>DR</div>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111", border: `2px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: WHITE, fontSize: 13, fontWeight: 600 }}>TW</div>
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
                        <img src="/person.png" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(20%) drop-shadow(0 0 10px rgba(0,0,0,0.4))" }} alt={ME.name} />
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
                                Sit amet luctussd fav venenatis, lectus magna fringilla inis urna, porttltor rhoncus dolor purus non enim praesent in elementum sahas facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis viverra orci sagittis eu volutpat odio facilisis mauris sit.
                                <span style={{ color: WHITE, margin: "0 6px" }}>Scelerisque</span>
                                fermentum duisi faucibus in ornare quam sisd sit amet luctussd fav venenatis, lectus magna fringilla zac urna, porttitor rhoncus dolor purus non enim praesent cuz elementum sahas facilisis leot.
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
                            initial={{ opacity: 0, x: 200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        >
                            {EXPERIENCE.map((ex, i) => (
                                <div key={i} style={{ marginBottom: 36 }}>
                                    <div style={{ fontSize: 14, color: WHITE, marginBottom: 8 }}>{ex.period}</div>
                                    <div style={{ fontSize: 18, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{ex.role}</div>
                                    <div style={{ fontSize: 14, color: WHITE, opacity: 0.7, marginBottom: 12 }}>{ex.company}</div>
                                    <p style={{ fontSize: 15, color: WHITE, opacity: 0.7, lineHeight: 1.7 }}>{ex.desc}</p>
                                </div>
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
                            initial={{ opacity: 0, x: 200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        >
                            {EDUCATION.map((ex, i) => (
                                <div key={i} style={{ marginBottom: 36 }}>
                                    <div style={{ fontSize: 14, color: WHITE, marginBottom: 8 }}>{ex.period}</div>
                                    <div style={{ fontSize: 18, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{ex.role}</div>
                                    <div style={{ fontSize: 14, color: WHITE, opacity: 0.7, marginBottom: 12 }}>{ex.company}</div>
                                    <p style={{ fontSize: 15, color: WHITE, opacity: 0.7, lineHeight: 1.7 }}>{ex.desc}</p>
                                </div>
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
                            initial={{ opacity: 0, x: 200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        >
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px 60px" }}>
                                {SKILLS.map((sk, i) => (
                                    <div key={i}>
                                        <div style={{ fontSize: 14, color: WHITE, marginBottom: 8 }}>{sk.pct}%</div>
                                        <div style={{ fontSize: 18, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{sk.name}</div>
                                        <div style={{ fontSize: 14, color: WHITE, opacity: 0.7 }}>Non enim praesent</div>
                                    </div>
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
                            initial={{ opacity: 0, x: 200 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        >
                            {AWARDS.map((aw, i) => (
                                <div key={i} style={{ marginBottom: 36 }}>
                                    <div style={{ fontSize: 14, color: WHITE, marginBottom: 8 }}>{aw.date}</div>
                                    <div style={{ fontSize: 18, color: WHITE, fontWeight: 500, marginBottom: 6 }}>{aw.title}</div>
                                    <div style={{ fontSize: 14, color: WHITE, opacity: 0.7 }}>{aw.org}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                </motion.div>
            </div>
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
                    {page === "projects" && <ProjectsPage key="projects" />}
                </AnimatePresence>
            </main>



            <style>{`
        body { background: #0F0F0F; margin: 0; }
        ::-webkit-scrollbar { width: 4px; background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 900px) {
          .flex-col-mobile { flex-direction: column !important; }
          .hide-mobile { display: none !important; }
        }
        @media (max-width: 600px) {
          .flex-col-small { flex-direction: column !important; text-align: center; gap: 24px !important; }
          .flex-col-small > div:last-child { position: static !important; margin-top: 16px; }
        }
      `}</style>
        </div>
    );
}
