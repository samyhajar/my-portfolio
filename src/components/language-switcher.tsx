"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const languages = [
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "de", label: "Deutsch", flag: "🇩🇪" },
        { code: "fr", label: "Français", flag: "🇫🇷" },
        { code: "es", label: "Español", flag: "🇪🇸" },
    ];

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full w-10 h-10 group hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                >
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    >
                        <Globe className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                    </motion.div>
                    <span className="sr-only">Switch Language</span>
                    {open && (
                        <motion.span
                            layoutId="active-nav"
                            className="absolute inset-0 rounded-full bg-neutral-100 dark:bg-neutral-800 -z-10"
                        />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="p-2 min-w-[160px] bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl rounded-2xl overflow-hidden"
            >
                <AnimatePresence>
                    {open && (
                        <div className="flex flex-col gap-1">
                            {languages.map((lang, index) => (
                                <motion.div
                                    key={lang.code}
                                    initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.3,
                                        ease: "easeOut"
                                    }}
                                >
                                    <DropdownMenuItem
                                        onClick={() => handleLocaleChange(lang.code)}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-xl transition-all duration-200
                                            ${locale === lang.code
                                                ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white"
                                            }
                                        `}
                                    >
                                        <span className="text-lg leading-none filter drop-shadow-sm">{lang.flag}</span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold tracking-tight">{lang.label}</span>
                                            {locale === lang.code && (
                                                <motion.span
                                                    layoutId="active-indicator"
                                                    className="w-1 h-1 rounded-full bg-purple-500 absolute right-3"
                                                />
                                            )}
                                        </div>
                                    </DropdownMenuItem>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
