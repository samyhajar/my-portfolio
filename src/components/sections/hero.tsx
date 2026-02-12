"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLenis } from "@/components/smooth-scroll";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
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
    const t = useTranslations("Hero");
    const lenis = useLenis();

    const scrollToProjects = (e: React.MouseEvent) => {
        e.preventDefault();
        lenis?.scrollTo('#projects', { offset: -80 });
    };

    // Helper to get array from translations
    const morphingTexts = t.raw("morphingTexts");

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-[1400px] mx-auto w-full relative z-10"
            >
                <div className="flex flex-col lg:flex-row items-center justify-center gap-9 sm:gap-14 lg:gap-20">
                    {/* Left Column - Name */}
                    <motion.div variants={itemVariants} className="text-center lg:text-right flex-1 w-full lg:min-w-0">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white break-words">
                            {t("title")}
                        </h1>
                        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 mt-3 sm:mt-4 font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                            {t("role")}
                        </p>
                    </motion.div>

                    {/* Right Column - Morphing Sentence */}
                    <motion.div variants={itemVariants} className="flex-1 w-full lg:min-w-0 flex justify-center lg:justify-start overflow-visible">
                        <div className="flex flex-col items-start gap-0 sm:gap-2 pl-4 sm:pl-0">
                            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-apple text-neutral-500 dark:text-neutral-400 shrink-0 italic -mb-4 sm:-mb-8 lg:-mb-14 -ml-4 sm:-ml-8 lg:-ml-12 drop-shadow-[0_0_15px_rgba(163,163,163,0.3)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300">
                                {t("iBuild")}
                            </span>
                            <div className="h-[50px] sm:h-[60px] md:h-[75px] lg:h-[90px] w-[280px] sm:w-[400px] lg:w-[600px] flex items-center justify-start overflow-visible">
                                <GooeyText
                                    texts={morphingTexts}
                                    morphTime={1}
                                    cooldownTime={2}
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 leading-tight"
                                    textClassName="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 text-left leading-tight"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>


                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed mt-8 sm:mt-12 lg:mt-16 text-center px-4"
                >
                    {t("description")}
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 sm:mt-10 lg:mt-12 text-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Button asChild size="lg" className="gap-2 rounded-full px-6 sm:px-8 text-sm sm:text-base bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100">
                            <a href="#projects" onClick={scrollToProjects}>
                                {t("viewProjects")}
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
                className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Scroll to Projects"
            >
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            </motion.button>
        </section>
    );
}
