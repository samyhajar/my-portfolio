"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "@/components/smooth-scroll";

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
                            <Button
                                asChild
                                className="rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                            >
                                <a href="#contact">Book a Call</a>
                            </Button>
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

                {/* Mobile Navigation */}
                <motion.div
                    initial={false}
                    animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="py-4 space-y-2">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                                transition={{ duration: 0.2, delay: isOpen ? index * 0.05 : 0 }}
                                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeSection === link.id
                                    ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                    }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpen(false);
                                    lenis?.scrollTo(`#${link.id}`, { offset: -80 });
                                }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                            transition={{ duration: 0.2, delay: isOpen ? links.length * 0.05 : 0 }}
                        >
                            <Button className="w-full mt-2 rounded-full" asChild>
                                <a href="#contact" onClick={() => setIsOpen(false)}>
                                    Book a Call
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
}
