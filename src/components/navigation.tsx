"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "@/components/smooth-scroll";
import { ContactModal } from "@/components/ui/contact-modal";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
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
            rootMargin: "-30% 0px -30% 0px",
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

        // Fallback for top of page
        const handleScroll = () => {
            if (window.scrollY < 100) {
                setActiveSection("home");
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            sections.forEach((section) => {
                if (section) observer.unobserve(section);
            });
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const lenis = useLenis();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-4 sm:px-8`}
        >
            <div className="max-w-[1540px] mx-auto pointer-events-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 items-center h-20">
                    {/* Logo - Column 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex justify-start"
                    >
                        <Link
                            href="/"
                            className="relative group flex items-center h-12 lg:h-14"
                            onMouseEnter={() => setIsLogoHovered(true)}
                            onMouseLeave={() => setIsLogoHovered(false)}
                        >
                            <motion.div
                                layout
                                className="flex items-center bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 rounded-full shadow-lg overflow-hidden h-full px-3 lg:px-4"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <div className="flex items-center font-bold text-white dark:text-neutral-900">
                                    <span className="text-xl lg:text-2xl">S</span>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            width: isLogoHovered ? "auto" : 0,
                                            opacity: isLogoHovered ? 1 : 0,
                                            marginRight: isLogoHovered ? "0.5rem" : 0
                                        }}
                                        className="overflow-hidden whitespace-nowrap text-lg lg:text-xl"
                                    >
                                        amy
                                    </motion.div>
                                    <span className="text-xl lg:text-2xl">H</span>
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            width: isLogoHovered ? "auto" : 0,
                                            opacity: isLogoHovered ? 1 : 0,
                                            marginLeft: isLogoHovered ? "0.1rem" : 0
                                        }}
                                        className="overflow-hidden whitespace-nowrap text-lg lg:text-xl"
                                    >
                                        ajar
                                    </motion.div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation - Column 2 (Centered) */}
                    <div className="hidden md:flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex items-center gap-1 bg-white/10 dark:bg-neutral-950/10 backdrop-blur-3xl rounded-full px-2 py-2 border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
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
                    </div>

                    {/* CTA and Mobile Toggle - Column 3 */}
                    <div className="flex items-center justify-end gap-4">
                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="hidden md:block"
                        >
                            <ContactModal>
                                <Button
                                    size="lg"
                                    className="rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 px-8 py-6 text-lg font-semibold shadow-xl hover:scale-105 transition-all"
                                >
                                    Book a Call
                                </Button>
                            </ContactModal>
                        </motion.div>

                        <div className="md:hidden">
                            <ThemeToggle />
                        </div>

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
