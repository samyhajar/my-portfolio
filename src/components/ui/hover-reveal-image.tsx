"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Vertex Shader
const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uHover;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Subtle wave effect
  pos.y += sin(uv.x * 10.0 + uTime) * 0.02 * uHover;
  pos.z += cos(uv.y * 10.0 + uTime) * 0.02 * uHover;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Liquid distortion effect
  float noise = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime) * 0.02;
  uv += noise * uHover;
  
  vec4 color = texture2D(uTexture, uv);
  
  // Fade out based on texture alpha if needed, but here we just use the image
  // Add a slight RGB shift on hover
  float r = texture2D(uTexture, uv + vec2(0.01, 0.0) * uHover).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(0.01, 0.0) * uHover).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

interface ImagePlaneProps {
    texturePath: string;
    isActive: boolean;
}

function ImagePlane({ texturePath, isActive }: ImagePlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(texturePath);
    const { viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uHover: { value: 0 },
            uTime: { value: 0 },
        }),
        [texture]
    );

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime;
            // Lerp hover value
            material.uniforms.uHover.value = THREE.MathUtils.lerp(
                material.uniforms.uHover.value,
                isActive ? 1 : 0,
                0.1
            );
            material.uniforms.uTexture.value = texture;
        }
    });

    // Scale plane to cover viewport while maintaining aspect ratio (cover usually requires more logic, keeping simple fill for now or strictly scaled)
    // For full screen background, we might want plane to fill viewport

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}

interface HoverRevealImageProps {
    activeImage: string | null;
}

export function HoverRevealImage({ activeImage }: HoverRevealImageProps) {
    if (!activeImage) return null;

    return (
        <div className="absolute inset-0 -z-10 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-500">
            {/* Fallback or base color */}
            <div className="w-full h-full opacity-50">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <Suspense fallback={null}>
                        <ImagePlane texturePath={activeImage} isActive={true} />
                    </Suspense>
                </Canvas>
            </div>
            {/* Overlay to dim the image so text pops */}
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-[2px]" />
        </div>
    );
}
