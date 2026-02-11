"use client";

import { useEffect, useRef, useMemo, useState, createContext, useContext } from "react";
import { useTheme } from "next-themes";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Sphere } from "@react-three/drei";
import * as ONE from "three";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiNodedotjs,
    SiPython,
    SiPostgresql,
    SiSupabase,
    SiPrisma,
    SiGit,
    SiDocker,
    SiAwslambda,
    SiFigma,
    SiThreedotjs,
    SiGraphql
} from "react-icons/si";
import { MorphingText } from "./text-morphing";

// Tech stack data with official brand icons
const TECH_STACK = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "AWS", icon: SiAwslambda, color: "#FF9900" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Three.js", icon: SiThreedotjs, color: "#000000" },
    { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
];

import { projects } from "@/data/projects";

// Context for sharing hover state between 3D and 2D components
const HoverContext = createContext<{
    hoveredTech: typeof TECH_STACK[number] | null;
    setHoveredTech: (tech: typeof TECH_STACK[number] | null) => void;
}>({
    hoveredTech: null,
    setHoveredTech: () => { },
});

function TechNode({ position, tech }: { position: [number, number, number], tech: typeof TECH_STACK[number] }) {
    const Icon = tech.icon;
    const { setHoveredTech } = useContext(HoverContext);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <group position={position}>
            <Html center distanceFactor={10} zIndexRange={[40, 0]}>
                <div
                    className="relative flex items-center justify-center cursor-pointer group"
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                >
                    {/* Icon */}
                    <div className="p-2 rounded-full transition-all duration-300 group-hover:scale-125 group-hover:bg-white/10 group-hover:backdrop-blur-md">
                        <Icon
                            size={30}
                            style={{
                                color: tech.color,
                                filter: `drop-shadow(0 0 ${isDark ? '12px' : '8px'} ${isDark ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.3)'})`
                            }}
                        />
                    </div>
                </div>
            </Html>
        </group>
    );
}

function MobileTechGrid() {
    const { hoveredTech, setHoveredTech } = useContext(HoverContext);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Tech Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                {TECH_STACK.map((tech) => {
                    const Icon = tech.icon;
                    const isActive = hoveredTech?.name === tech.name;
                    return (
                        <button
                            key={tech.name}
                            onClick={() => setHoveredTech(isActive ? null : tech)}
                            className={`flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl transition-all duration-300 ${isActive
                                ? 'bg-white dark:bg-neutral-900 shadow-xl scale-105 ring-2'
                                : 'bg-white/60 dark:bg-neutral-900/60 hover:bg-white dark:hover:bg-neutral-900 hover:shadow-lg active:scale-95'
                                }`}
                            style={isActive ? { '--tw-ring-color': tech.color } as React.CSSProperties : {}}
                        >
                            <Icon
                                size={isActive ? 56 : 48}
                                style={{ color: tech.color }}
                                className="transition-all duration-300 mb-2"
                            />
                            <span className={`text-xs sm:text-sm font-semibold text-center transition-colors ${isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400'
                                }`}>
                                {tech.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Project Display */}
            <MobileProjectDisplay />
        </div>
    );
}

function MobileProjectDisplay() {
    const { hoveredTech } = useContext(HoverContext);

    const relatedProjects = useMemo(() => {
        if (!hoveredTech) return [];
        return projects.filter(project =>
            project.technologies.some(t =>
                t.toLowerCase().includes(hoveredTech.name.toLowerCase()) ||
                hoveredTech.name.toLowerCase().includes(t.toLowerCase())
            )
        );
    }, [hoveredTech]);

    if (!hoveredTech) {
        return (
            <div className="text-center py-8">
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Tap a technology to see related projects
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tech Name */}
            <div className="text-center space-y-1">
                <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
                    Selected Technology
                </p>
                <h3
                    className="text-2xl sm:text-3xl font-bold tracking-tight"
                    style={{ color: hoveredTech.color }}
                >
                    {hoveredTech.name}
                </h3>
                <p className="text-xs text-neutral-500">
                    {relatedProjects.length} {relatedProjects.length === 1 ? 'project' : 'projects'}
                </p>
            </div>

            {/* Project Cards */}
            {relatedProjects.length > 0 ? (
                <div className="space-y-3">
                    {relatedProjects.map((project, idx) => (
                        <div
                            key={project.slug}
                            className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                            style={{
                                animationDelay: `${idx * 100}ms`,
                            }}
                        >
                            <span
                                className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: project.color || '#3b82f6' }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                                    {project.title}
                                </p>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-4">
                    No projects using this technology yet
                </p>
            )}
        </div>
    );
}

function TechSphere() {
    const groupRef = useRef<ONE.Group>(null);
    const { viewport } = useThree();
    const { hoveredTech } = useContext(HoverContext);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Distribute points on a sphere using Fibonacci lattice
    const nodes = useMemo(() => {
        const points = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < TECH_STACK.length; i++) {
            const y = 1 - (i / (TECH_STACK.length - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            points.push({
                position: [x * 2.2, y * 2.2, z * 2.2] as [number, number, number],
                tech: TECH_STACK[i]
            });
        }
        return points;
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            // Auto rotation - pause when hovering over an icon
            if (!hoveredTech) {
                groupRef.current.rotation.y += 0.003;
            }

            // Scroll influence (subtle) - only when not hovering
            if (!hoveredTech) {
                const scrollOffset = window.scrollY;
                groupRef.current.rotation.x = scrollOffset * 0.0005;
            }
        }
    });

    return (
        <group ref={groupRef}>
            {/* Wireframe Sphere */}
            <Sphere args={[2.0, 32, 32]}>
                <meshStandardMaterial
                    color={isDark ? "#b86bff" : "#a855f7"}
                    wireframe
                    transparent
                    opacity={isDark ? 0.25 : 0.1}
                />
            </Sphere>

            {/* Connection Lines */}
            <Sphere args={[2.1, 16, 16]}>
                <meshStandardMaterial
                    color={isDark ? "#60a5fa" : "#3b82f6"}
                    wireframe
                    transparent
                    opacity={isDark ? 0.15 : 0.05}
                />
            </Sphere>

            {/* Nodes */}
            {nodes.map((node, i) => (
                <TechNode key={i} position={node.position} tech={node.tech} />
            ))}
        </group>
    );
}

function ProjectDisplay() {
    const { hoveredTech } = useContext(HoverContext);

    // Find projects that use the hovered tech
    const relatedProjects = useMemo(() => {
        if (!hoveredTech) return [];
        return projects.filter(project =>
            project.technologies.some(t =>
                t.toLowerCase().includes(hoveredTech.name.toLowerCase()) ||
                hoveredTech.name.toLowerCase().includes(t.toLowerCase())
            )
        );
    }, [hoveredTech]);

    const projectTitles = relatedProjects.map(p => p.title);

    return (
        <div className="flex flex-col items-start justify-center h-full px-4 sm:px-6 md:px-8 lg:px-16 pointer-events-none">
            {hoveredTech && relatedProjects.length > 0 ? (
                <div className="space-y-4 sm:space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                    {/* Tech Name */}
                    <div className="space-y-1 sm:space-y-2">
                        <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-500 uppercase">
                            Technology
                        </p>
                        <h3
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                            style={{ color: hoveredTech.color }}
                        >
                            {hoveredTech.name}
                        </h3>
                    </div>

                    {/* Projects with Morphing Animation */}
                    <div className="space-y-2 sm:space-y-3">
                        <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-500 uppercase">
                            Used in
                        </p>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white">
                            <MorphingText
                                words={projectTitles}
                                interval={2000}
                                animationDuration={0.6}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-500">
                            {relatedProjects.length} {relatedProjects.length === 1 ? 'project' : 'projects'}
                        </p>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2 max-w-md">
                        {relatedProjects.slice(0, 3).map((project, idx) => (
                            <div
                                key={project.slug}
                                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800"
                                style={{
                                    animationDelay: `${idx * 100}ms`,
                                }}
                            >
                                <span
                                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                    style={{ backgroundColor: project.color || '#3b82f6' }}
                                />
                                <div>
                                    <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-white">
                                        {project.title}
                                    </p>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {relatedProjects.length > 3 && (
                            <p className="text-xs sm:text-sm text-neutral-500 italic pl-4 sm:pl-5">
                                + {relatedProjects.length - 3} more projects
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="space-y-4 text-center lg:text-left">
                    <p className="text-sm sm:text-base lg:text-lg text-neutral-500 dark:text-neutral-400">
                        Hover over a technology icon to see projects
                    </p>
                </div>
            )}
        </div>
    );
}

function TechGlobeLighting() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <>
            <ambientLight intensity={isDark ? 1.2 : 0.5} />
            <pointLight position={[10, 10, 10]} intensity={isDark ? 2.5 : 1} />
            <pointLight position={[-10, -10, -10]} intensity={isDark ? 1 : 0.5} color={isDark ? "#4f46e5" : "#ffffff"} />
        </>
    );
}

export function TechGlobe() {
    const [hoveredTech, setHoveredTech] = useState<typeof TECH_STACK[number] | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <HoverContext.Provider value={{ hoveredTech, setHoveredTech }}>
            <section id="skills" className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden py-16 lg:py-0">
                {/* Section Header */}
                <div className="relative lg:absolute top-0 lg:top-20 left-0 right-0 z-10 text-center space-y-2 lg:space-y-4 px-4 mb-8 lg:mb-0 pointer-events-none">
                    <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-500 uppercase">Tech Stack</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-neutral-900 dark:text-white drop-shadow-sm">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-gradient-x">Skills</span>
                    </h2>
                </div>

                {isMobile ? (
                    <MobileTechGrid />
                ) : (
                    <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-8 max-w-[1600px] mx-auto">
                        {/* Left Side - Globe */}
                        <div className="w-full lg:w-[45%] h-1/2 lg:h-full relative flex items-center justify-center pt-24 sm:pt-28 lg:pt-0">
                            <div className="w-full h-full max-w-[600px]">
                                <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
                                    <TechGlobeLighting />
                                    <group position={[0, 0, 0]}>
                                        <TechSphere />
                                    </group>
                                    <OrbitControls
                                        enableZoom={false}
                                        enablePan={false}
                                        autoRotate={!hoveredTech}
                                        autoRotateSpeed={0.5}
                                    />
                                </Canvas>
                            </div>
                        </div>

                        {/* Right Side - Project Info */}
                        <div className="w-full lg:w-[55%] h-1/2 lg:h-full flex items-center justify-start">
                            <ProjectDisplay />
                        </div>
                    </div>
                )}
            </section>
        </HoverContext.Provider>
    );
}
