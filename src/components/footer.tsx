export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Samy Hajar</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Full Stack Developer passionate about creating exceptional digital experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/#projects" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a href="/#skills" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                    Skills
                                </a>
                            </li>
                            <li>
                                <a href="/#contact" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Connect</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a href="mailto:samy.hajar@gmail.com" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-600 dark:text-neutral-400">
                    <p>© {currentYear} Samy Hajar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
