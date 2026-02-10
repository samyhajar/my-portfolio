"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { motion, Variants } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLenis } from "@/components/smooth-scroll";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export function Hero() {
    const lenis = useLenis();

    const scrollToProjects = (e: React.MouseEvent) => {
        e.preventDefault();
        lenis?.scrollTo('#projects', { offset: -80 });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Left Sidebar - Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-8"
            >
                {/* Scroll Text */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-500 tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">
                        Scroll
                    </span>
                    <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />
                </div>

                {/* Theme Toggle */}
                <div className="mt-4">
                    <ThemeToggle />
                </div>
            </motion.div>

            {/* Right Sidebar - Social Links */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-6"
            >
                <div className="flex flex-col gap-6">
                    <a href="https://github.com/samyhajar" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 transform hover:scale-110">
                        <SiGithub size={24} />
                    </a>
                    <a href="https://linkedin.com/in/samyhajar" target="_blank" rel="noopener noreferrer" className="text-[#0077b5] transition-transform duration-300 transform hover:scale-110">
                        <SiLinkedin size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] transition-transform duration-300 transform hover:scale-110">
                        <SiInstagram size={24} />
                    </a>
                </div>
                <div className="h-16 w-[1px] bg-gradient-to-b from-neutral-300 dark:from-neutral-600 to-transparent" />
            </motion.div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-[1400px] mx-auto px-4 w-full relative z-10"
            >
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                    {/* Left Column - Name */}
                    <motion.div variants={itemVariants} className="text-center lg:text-right flex-1 min-w-0">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white whitespace-nowrap">
                            Samy Hajar
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 mt-2 font-medium tracking-[0.2em] uppercase">
                            Full Stack Developer
                        </p>
                    </motion.div>

                    {/* Right Column - Morphing Sentence */}
                    <motion.div variants={itemVariants} className="text-center lg:text-left flex-1 min-w-0 flex flex-col sm:flex-row items-center sm:items-baseline justify-center lg:justify-start gap-4 overflow-visible">
                        <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-400 dark:text-neutral-500 shrink-0">
                            I build
                        </span>
                        <div className="h-[60px] md:h-[90px] w-auto min-w-[300px] flex items-center justify-center sm:justify-start overflow-visible">
                            <GooeyText
                                texts={["Experiences", "Solutions", "Products", "The Future"]}
                                morphTime={1}
                                cooldownTime={2}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400"
                                textClassName="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 text-center sm:text-left"
                            />
                        </div>
                    </motion.div>
                </div>


                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mt-16 text-center"
                >
                    I transform thorny problems into elegant solutions using visual design, rapid prototyping, and interaction skills.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Button asChild size="lg" className="gap-2 rounded-full px-8 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100">
                            <a href="#projects" onClick={scrollToProjects}>
                                View Projects
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>



            {/* Scroll Down Indicator */}
            <motion.button
                onClick={scrollToProjects}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
                <ChevronDown className="w-6 h-6 animate-bounce" />
            </motion.button>
        </section>
    );
}
