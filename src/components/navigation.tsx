"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "@/components/smooth-scroll";
import { ContactModal } from "@/components/ui/contact-modal";

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const links = [
        { href: "#home", label: "Home", id: "home" },
        { href: "#projects", label: "Projects", id: "projects" },
        { href: "#skills", label: "Skills", id: "skills" },
        { href: "#contact", label: "Contact", id: "contact" },
    ];

    // Track scroll position for navbar background
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Intersection Observer for active section detection
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        const sections = links.map((link) => document.getElementById(link.id)).filter(Boolean);
        sections.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    const lenis = useLenis();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none`}
        >
            <div className="max-w-7xl mx-auto px-4 pointer-events-auto">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Link href="/" className="relative group">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 flex items-center justify-center shadow-lg"
                                >
                                    <span className="text-white dark:text-neutral-900 font-bold text-xl lg:text-2xl">
                                        SH
                                    </span>
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden md:flex items-center gap-1 bg-white/10 dark:bg-neutral-950/10 backdrop-blur-3xl rounded-full px-2 py-2 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
                    >
                        {links.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                className="relative"
                            >
                                <a
                                    href={link.href}
                                    className={`relative px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base font-medium rounded-full transition-all duration-200 block ${activeSection === link.id
                                        ? "text-white"
                                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const element = document.getElementById(link.id);
                                        if (element) {
                                            lenis?.scrollTo(`#${link.id}`, { offset: -80 });
                                        }
                                    }}
                                >
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full shadow-md"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                            style={{ zIndex: -1 }}
                                        />
                                    )}
                                    {activeSection === link.id ? (
                                        <span className="relative z-10 text-white dark:text-neutral-900">{link.label}</span>
                                    ) : (
                                        <span className="relative z-10">{link.label}</span>
                                    )}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex items-center gap-4">
                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="hidden md:block"
                        >
                            <ContactModal>
                                <Button
                                    className="rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                                >
                                    Book a Call
                                </Button>
                            </ContactModal>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <motion.div
                                animate={{ rotate: isOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.div>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isOpen ? 1 : 0,
                        pointerEvents: isOpen ? "auto" : "none",
                    }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center justify-center"
                    style={{ top: 0, height: "100dvh" }}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-4 p-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="flex flex-col items-center gap-8">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                                transition={{ duration: 0.4, delay: isOpen ? 0.1 + index * 0.1 : 0 }}
                                className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors ${activeSection === link.id
                                    ? "text-neutral-900 dark:text-white"
                                    : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                                    }`}
                                onClick={() => {
                                    setIsOpen(false);
                                    lenis?.scrollTo(`#${link.id}`, { offset: -80 });
                                }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                            transition={{ duration: 0.4, delay: isOpen ? 0.1 + links.length * 0.1 : 0 }}
                            className="pt-8"
                        >
                            <ContactModal>
                                <Button size="lg" className="rounded-full px-8 text-lg" onClick={() => setIsOpen(false)}>
                                    Book a Call
                                </Button>
                            </ContactModal>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}
