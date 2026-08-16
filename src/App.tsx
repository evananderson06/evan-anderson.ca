import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function Box() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    useFrame((state, delta) => {
const t = state.clock.getElapsedTime();
        const mesh = meshRef.current;
        if (!mesh) return;

        // 1. Calculate base trajectory math
        const baseX = 2 * Math.sin(t);
        const baseY = 2 * Math.cos(t);

        // 2. Calculate target offset based on hover state
        // If hovered, target is 0.5 units higher, otherwise 0
        const targetScale = active ? 1.2 : hovered ? 1.1 : 1;

        mesh.userData.scale = THREE.MathUtils.lerp(mesh.scale.x, targetScale, 1 - Math.exp(-10 * delta))

        mesh.scale.set(mesh.userData.scale, mesh.userData.scale, mesh.userData.scale)

        // 4. Apply combined values directly to the native Three.js properties
        mesh.position.set(baseX, baseY, 0);
        mesh.rotation.set(baseX, baseY, 0);

    })
    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={() => setActive((a) => !a)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? "hotpink" : active ? "green" : "#2f74c0"} />
        </mesh>
    );
}

function App() {
    return (
        <div className="w-screen h-screen">
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI}
                />
                <pointLight
                    position={[-10, -10, -10]}
                    decay={0}
                    intensity={Math.PI}
                />
                <Box />
            </Canvas>
        </div>
    );
}

export default App;
