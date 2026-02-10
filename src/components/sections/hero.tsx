"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

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
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-neutral-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
                <div className="absolute right-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-transparent via-cyan-100/30 to-transparent dark:via-neutral-900/10" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-5xl mx-auto text-center space-y-8"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                        Available for new opportunities
                    </Badge>
                </motion.div>

                {/* Main heading */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Hi, I'm{" "}
                        <div className="h-[80px] md:h-[100px] flex items-center justify-center overflow-visible">
                            <GooeyText
                                texts={["Samy Hajar", "Developer", "Creator", "Builder"]}
                                morphTime={1}
                                cooldownTime={2}
                                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 dark:from-purple-300 dark:via-violet-300 dark:to-pink-300"
                                textClassName="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 dark:from-purple-300 dark:via-violet-300 dark:to-pink-300"
                            />
                        </div>
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
                        Full Stack Developer crafting exceptional digital experiences
                    </p>
                </motion.div>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                >
                    I build scalable web applications with modern technologies.
                    Passionate about creating intuitive user experiences and solving complex problems.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button asChild size="lg" className="gap-2">
                            <a href="#projects">
                                View My Work
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button asChild variant="outline" size="lg">
                            <a href="#contact">
                                Get In Touch
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex gap-4 justify-center pt-8"
                >
                    {[
                        { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
                        { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:samy.hajar@gmail.com", label: "Email" },
                    ].map(({ icon: Icon, href, label }) => (
                        <motion.div
                            key={label}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button variant="ghost" size="icon" asChild>
                                <a href={href} target={label !== "Email" ? "_blank" : undefined} rel={label !== "Email" ? "noopener noreferrer" : undefined}>
                                    <Icon className="w-5 h-5" />
                                    <span className="sr-only">{label}</span>
                                </a>
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}
