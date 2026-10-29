import { Html, useCursor, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@utils/cn";
import { FaArrowDown } from "react-icons/fa";

const INTRO_DURATION = 1.5;

export default function Camera({
    showHint,
    onShutter,
}: {
    showHint: boolean;
    onShutter: () => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const introRef = useRef<THREE.Group>(null);
    const introElapsed = useRef(0);

    const { scene } = useGLTF("/camera.glb");

    const [hovered, setHovered] = useState(false);

    const hotspot = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }) // visible while you position it
    );
    hotspot.position.set(0.5, 1.2, 0.3); // local coords, relative to the object
    hotspot.name = "hotspot";

    useFrame(({ clock }, delta) => {
        if (!meshRef.current || !introRef.current) return;
        const t = clock.getElapsedTime();

        // fly in from far below; clamp delta so first-frame hitches (texture
        // upload, shader compile) pause the intro instead of skipping it
        introElapsed.current += Math.min(delta, 1 / 30);
        const p = Math.min(introElapsed.current / INTRO_DURATION, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        introRef.current.position.set(0, -6 * (1 - eased), -20 * (1 - eased));
        introRef.current.rotation.z = -0.5 * (1 - eased);

        meshRef.current.position.y = Math.sin(t * 1.5) * 0.1 - 3;
        meshRef.current.rotation.z = Math.sin(t * 0.75) * 0.05;
    });

    useCursor(hovered);

    return (
        <group ref={introRef} position={[0, -6, -20]} rotation={[0, 0, -0.5]}>
            <group ref={meshRef}>
                <mesh
                    ref={meshRef}
                    position={[0, 0, -5]}
                    scale={0.5}
                    rotation={[Math.PI / 6, Math.PI, 0]}
                >
                    <primitive object={scene}></primitive>
                </mesh>
                <mesh
                    scale={0.4}
                    position={[1.9, 3.5, -2.9]}
                    onPointerOver={() => {
                        setHovered(true);
                    }}
                    onPointerOut={() => {
                        setHovered(false);
                    }}
                    onClick={onShutter}
                >
                    <sphereGeometry></sphereGeometry>
                    <meshStandardMaterial
                        transparent
                        opacity={0}
                    ></meshStandardMaterial>
                    <Html className="pointer-events-none">
                        <div
                            className={cn(
                                "-translate-x-1/2 -translate-y-full p-6 text-gray-600 transition-opacity duration-1000",
                                showHint ? "opacity-40" : "opacity-0"
                            )}
                        >
                            <FaArrowDown className="animate-bounce" />
                        </div>
                    </Html>
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload("/camera.glb");
