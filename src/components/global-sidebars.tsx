"use client";

import { motion } from "framer-motion";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import { ThemeToggle } from "@/components/theme-toggle";

export function GlobalSidebars() {
    return (
        <>
            {/* Left Sidebar - Scroll & Theme */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-8"
            >
                {/* Scroll Text */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-neutral-500 tracking-[0.2em] [writing-mode:vertical-lr] rotate-180">
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
                    <a href="https://github.com/samyhajar" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300 transform hover:scale-110" aria-label="Visit GitHub Profile">
                        <SiGithub size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/samy-hajar-116137182/" target="_blank" rel="noopener noreferrer" className="text-[#0077b5] transition-transform duration-300 transform hover:scale-110" aria-label="Visit LinkedIn Profile">
                        <SiLinkedin size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] transition-transform duration-300 transform hover:scale-110" aria-label="Visit Instagram Profile">
                        <SiInstagram size={24} />
                    </a>
                </div>
                <div className="h-16 w-[1px] bg-gradient-to-b from-neutral-300 dark:from-neutral-600 to-transparent" />
            </motion.div>
        </>
    );
}
