import { cn } from "@utils/cn";
import { motion } from "framer-motion";

export default function Film({
    src,
    caption,
    fadeIn,
    className,
    hoverEffect,
}: {
    src: string;
    caption: string;
    fadeIn: boolean;
    className?: string;
    hoverEffect?: boolean;
}) {
    return (
        <div
            className={cn(
                "group relative h-fit w-fit rounded-xs border border-gray-400/25 bg-white px-5 pt-5 pb-16 shadow-2xl transition-all",
                className,
                hoverEffect && "hover:scale-105 hover:rotate-6"
            )}
        >
            <div className="bg-black">
                <img
                    src={src}
                    className="h-72 border border-gray-400 opacity-90 transition-opacity group-hover:opacity-100"
                ></img>
            </div>
            <div className="absolute top-80 right-0 left-0 text-center font-[DynaPuff] text-lg">
                {caption}
            </div>
            {fadeIn && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 5, ease: "easeInOut", delay: 2 }}
                    className="absolute top-5 right-5 bottom-16 left-5 border-2 border-gray-400/20 bg-gray-50"
                ></motion.div>
            )}
        </div>
    );
}
