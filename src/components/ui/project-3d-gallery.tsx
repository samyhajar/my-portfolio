"use client";

import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float, Text, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "@/data/projects";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

function ProjectCard3D({
    project,
    position,
    index,
    isDark,
    cameraZ,
    isLeft,
    isMobile
}: {
    project: Project;
    position: [number, number, number];
    index: number;
    isDark: boolean;
    cameraZ: number;
    isLeft: boolean;
    isMobile: boolean;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const router = useRouter();
    const texture = useTexture(project.image);

    // Calculate distance to camera for title fade
    const distanceToCamera = Math.abs(position[2] - cameraZ);
    // Smooth fade: visible between 5 and 20 units away
    const titleOpacity = Math.max(0, Math.min(1, (20 - distanceToCamera) / 10));
    const isVisible = distanceToCamera < 35; // Increased visibility range for smoother exit

    // Uniforms for a subtle liquid distortion shader on the cards
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uHover: { value: 0 },
        uTexture: { value: texture }
    }), [texture]);

    useFrame((state) => {
        if (meshRef.current) {
            // Very subtle rotation only on hover
            // On mobile, keep it simpler/straighter
            const targetRotation = hovered ? (isLeft ? 0.05 : -0.05) : 0;
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation, 0.1);

            // Shader animation
            const targetHover = hovered ? 1 : 0;
            uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, targetHover, 0.1);
            uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    if (!isVisible) return null;

    // Mobile adjustments
    const scale = isMobile ? 0.65 : 1;

    return (
        <group position={position} scale={[scale, scale, 1]}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => router.push(`/projects/${project.slug}`)}
            >
                <planeGeometry args={[8, 4.5]} />
                <shaderMaterial
                    transparent
                    uniforms={uniforms}
                    vertexShader={`
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `}
                    fragmentShader={`
                        uniform sampler2D uTexture;
                        uniform float uHover;
                        uniform float uTime;
                        varying vec2 vUv;

                        float roundedBox(vec2 p, vec2 b, float r) {
                            vec2 d = abs(p) - b + vec2(r);
                            return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
                        }

                        void main() {
                            vec2 uv = vUv;
                            // Subtler distortion for "cinema" feel
                            float distortion = sin(uv.y * 5.0 + uTime) * 0.005 * uHover;
                            uv.x += distortion;
                            
                            // Map UV to [-1, 1] for rounded corners
                            vec2 p = (uv * 2.0 - 1.0) * vec2(1.77, 1.0);
                            float d = roundedBox(p, vec2(1.7, 0.95), 0.08);
                            
                            vec4 color = texture2D(uTexture, uv);
                            gl_FragColor = vec4(color.rgb, 1.0);
                            gl_FragColor.a = 1.0 - smoothstep(0.0, 0.01, d);
                            
                            if (uHover > 0.1) {
                                gl_FragColor.rgb += vec3(0.05) * uHover;
                            }

                            if (gl_FragColor.a < 0.1) discard;
                        }
                    `}
                />
            </mesh>

            {/* Typography overlay for each card - positioned on top */}
            <Text
                position={[0, 0, 0.5]}
                fontSize={maxTitleSize}
                color="white"
                anchorX="center"
                anchorY="middle"
                fillOpacity={(hovered ? 1 : 0) * titleOpacity}
            >
                {project.title.toUpperCase()}
            </Text>

            {/* Side label for context */}
            <Text
                position={isMobile
                    ? [0, -3.2, 0.1] // Mobile: Bottom center
                    : [isLeft ? -4.5 : 4.5, -2.8, 0.1] // Desktop: Side
                }
                fontSize={isMobile ? 0.3 : 0.2}
                color={isDark ? "white" : "#171717"}
                anchorX={isMobile ? "center" : (isLeft ? "left" : "right")}
                anchorY="middle"
                fillOpacity={0.8 * titleOpacity} // Increased opacity for better mobile visibility
            >
                {project.title.toUpperCase()}
            </Text>
        </group>
    );
}

const maxTitleSize = 0.4;

function Scene({ projects, isDark }: { projects: Project[]; isDark: boolean }) {
    const scrollRef = useRef(0);
    const { camera, viewport } = useThree();
    const [cameraZ, setCameraZ] = useState(10);

    const isMobile = viewport.width < 10; // Threshold for mobile layout in 3D units

    // Handle scroll to move camera along Z-axis
    useFrame(() => {
        const scrollY = window.scrollY;

        if (isMobile) {
            // Mobile: Vertical scroll (Y-axis), Fixed Z
            // Move camera down (negative Y) to see items stacked downwards
            // Rate of 0.02 means 1000px scroll moves 20 units down
            const targetY = -(scrollY * 0.025);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1);

            // Keep Z fixed and stable
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, 10, 0.1);
            setCameraZ(10); // Maintain constant visibility calculation for children
        } else {
            // Desktop: Tunnel scroll (Z-axis), Fixed Y
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 0.1);

            const targetZ = 10 - (scrollY * 0.08);
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
            setCameraZ(camera.position.z);
        }
    });

    return (
        <>
            <ambientLight intensity={isDark ? 0.5 : 1} />
            <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 0.5} />
            <fog attach="fog" args={[isDark ? "#000" : "#fff", 20, 100]} />

            {projects.map((project, i) => {
                const pairIndex = Math.floor(i / 2);
                const isLeft = i % 2 === 0;

                // Responsive positioning logic
                let position: [number, number, number];

                if (isMobile) {
                    // Mobile: Vertical Stack (Y-axis)
                    // No Z-depth, simple vertical list
                    position = [
                        0,
                        -3.5 - (i * 5.5), // Start lower to clear the HTML title
                        0
                    ];
                } else {
                    // Desktop: Dual column "Precision Lanes" (Z-axis)
                    position = [
                        isLeft ? -6 : 6,
                        0,
                        -pairIndex * 60
                    ];
                }

                return (
                    <ProjectCard3D
                        key={project.slug}
                        project={project}
                        index={i}
                        isDark={isDark}
                        cameraZ={cameraZ}
                        isLeft={isLeft}
                        isMobile={isMobile}
                        position={position}
                    />
                );
            })}

            {/* Background elements */}
            <mesh rotation={[0, 0, 0]} position={[0, 0, -600]}>
                <sphereGeometry args={[600, 32, 32]} />
                <meshBasicMaterial color={isDark ? "#050505" : "#f5f5f5"} side={THREE.BackSide} />
            </mesh>
        </>
    );
}

export function Project3DGallery({ projects }: { projects: Project[] }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return (
        <div className="fixed inset-0 z-0 bg-white dark:bg-neutral-950 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 z-0 bg-white dark:bg-neutral-950 transition-colors duration-500">
            <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <Suspense fallback={null}>
                    <Scene projects={projects} isDark={isDark} />
                </Suspense>
            </Canvas>

            {/* Instruction Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-10 z-10 pointer-events-none"
            >
                <div className="flex flex-col gap-2">
                    <div className="w-12 h-1 bg-black/10 dark:bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-neutral-900 dark:bg-white"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                    </div>
                    <p className="text-xs font-mono uppercase tracking-tighter text-neutral-500 dark:text-white/50">
                        Scroll to traverse archive
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
