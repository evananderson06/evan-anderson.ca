import Camera from "@components/art/3d/camera";
import { Canvas } from "@react-three/fiber";
import { cn } from "@utils/cn";
import { useState } from "react";

export default function Opening({ nextScene }: { nextScene: () => void }) {
    const [showHint, setShowHint] = useState(false);

    setTimeout(() => {
        setShowHint(true);
    }, 5000);

    return (
        <div className="h-screen w-screen overflow-hidden">
            <Canvas className="isolate">
                <color attach="background" args={["#ebf9ff"]} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.5}
                    penumbra={1}
                    decay={0}
                    intensity={Math.PI * 10}
                />
                <Camera showHint={showHint} onShutter={nextScene} />
            </Canvas>
            <div
                className={cn(
                    "absolute top-20 right-0 left-0 text-center font-[DynaPuff] text-2xl tracking-wider text-gray-600 transition-opacity duration-1000",
                    showHint ? "opacity-40" : "opacity-0"
                )}
            >
                take a picture!
            </div>
        </div>
    );
}
