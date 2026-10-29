import Film from "@components/art/2d/film";
import Home from "@components/scenes/home";
import Opening from "@components/scenes/opening";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";

const SCENE = {
    Opening: 0,
    Home: 1,
};

function App() {
    const [scene, setScene] = useState(SCENE.Opening);

    const nextScene = useCallback(() => {
        setScene((prev) => prev + 1);
    }, []);

    return (
        <div className="h-screen w-screen bg-[#ebf9ff]">
            {scene === SCENE.Opening && <Opening nextScene={nextScene} />}
            {scene === SCENE.Home && <Home />}
        </div>
    );
}

export default App;
