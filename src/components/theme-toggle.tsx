"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        )
    }

    return (
        <motion.button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative w-16 h-16 rounded-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Light Mode */}
            <motion.div
                initial={false}
                animate={{
                    opacity: theme === "light" ? 1 : 0,
                    scale: theme === "light" ? 1 : 0.8,
                    rotate: theme === "light" ? 0 : -90,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <span className="text-[10px] font-bold text-neutral-900 tracking-wider">
                    LIGHT
                </span>
            </motion.div>

            {/* Dark Mode */}
            <motion.div
                initial={false}
                animate={{
                    opacity: theme === "dark" ? 1 : 0,
                    scale: theme === "dark" ? 1 : 0.8,
                    rotate: theme === "dark" ? 0 : 90,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <span className="text-[10px] font-bold text-white tracking-wider">
                    DARK
                </span>
            </motion.div>

            {/* Hover effect ring */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    )
}

