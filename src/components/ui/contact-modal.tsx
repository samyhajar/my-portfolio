"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Check, Copy, ArrowLeft } from "lucide-react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export function ContactModal({ children }: { children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);
    const [showCalendly, setShowCalendly] = useState(false);
    const email = "samy.hajar@gmail.com";
    const { resolvedTheme } = useTheme();
    const [calendlyUrl, setCalendlyUrl] = useState("");
    const t = useTranslations("ContactModal");

    useEffect(() => {
        const theme = resolvedTheme === "dark" ? "dark" : "light";
        const backgroundColor = theme === "dark" ? "171717" : "ffffff";
        const textColor = theme === "dark" ? "ffffff" : "171717";
        const primaryColor = "a855f7";

        setCalendlyUrl(
            `https://calendly.com/samy-hajar/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=${backgroundColor}&text_color=${textColor}&primary_color=${primaryColor}`
        );
    }, [resolvedTheme]);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                // Reset to default view when closed
                setTimeout(() => setShowCalendly(false), 300);
            }
        }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className={`
                p-0 overflow-hidden bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white gap-0 transition-all duration-300 ease-in-out
                fixed bottom-0 left-0 right-0 top-auto translate-y-0 translate-x-0
                sm:top-[50%] sm:left-[50%] sm:translate-y-[-50%] sm:translate-x-[-50%] sm:bottom-auto sm:right-auto sm:rounded-xl
                w-full max-w-full rounded-t-[20px] rounded-b-none
                ${showCalendly ? 'sm:max-w-[700px] sm:h-[600px] h-[85vh]' : 'sm:max-w-[500px] sm:h-auto h-auto'}
            `}>
                <div className="p-6 sm:p-8 space-y-6 h-full">
                    <AnimatePresence mode="wait" initial={false}>
                        {showCalendly ? (
                            <motion.div
                                key="calendly"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setShowCalendly(false)}
                                        className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </Button>
                                    <h3 className="text-xl font-bold">{t("selectTime")}</h3>
                                </div>
                                <div className="flex-1 w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden">
                                    <iframe
                                        src={calendlyUrl}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        title={t("calendlyTitle")}
                                    ></iframe>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                <DialogHeader className="space-y-3 text-left">
                                    <DialogTitle className="text-4xl sm:text-5xl font-bold tracking-tighter">
                                        {t("title")}
                                    </DialogTitle>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
                                        {t("description")}
                                    </p>
                                </DialogHeader>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Book a call */}
                                    <button
                                        onClick={() => setShowCalendly(true)}
                                        className="group text-left flex flex-col justify-between p-4 h-32 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-transparent hover:border-purple-500/20 dark:hover:border-purple-500/20 hover:bg-white dark:hover:bg-neutral-800/80 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-900 dark:text-white">{t("bookCall")}</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wider mt-1">{t("callDuration")}</p>
                                        </div>
                                    </button>

                                    {/* Email me */}
                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col justify-between p-4 h-32 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-transparent hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:bg-white dark:hover:bg-neutral-800/80 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-900 dark:text-white">{t("emailMe")}</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wider mt-1">{t("openGmail")}</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
                                    <button
                                        onClick={handleCopyEmail}
                                        className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group"
                                    >
                                        <div className="relative">
                                            <AnimatePresence mode="wait">
                                                {copied ? (
                                                    <motion.div
                                                        key="check"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                    >
                                                        <Check className="w-4 h-4 text-green-500" />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="copy"
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.5 }}
                                                    >
                                                        <Copy className="w-4 h-4 group-hover:text-neutral-900 dark:group-hover:text-white" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <span>{t("copyEmail")}</span>
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <a href="https://github.com/samyhajar" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                            <SiGithub className="w-5 h-5" />
                                        </a>
                                        <a href="https://linkedin.com/in/samyhajar" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                            <SiLinkedin className="w-5 h-5" />
                                        </a>
                                        <a href={`mailto:${email}`} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
