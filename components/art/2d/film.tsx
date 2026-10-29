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
        // outer stays still so the hover hitbox doesn't move with the card
        <div className={cn("group h-fit w-fit", className)}>
            <div
                className={cn(
                    "relative rounded-xs border border-gray-400/25 bg-white px-5 pt-5 pb-16 shadow-2xl transition-all",
                    hoverEffect && "group-hover:scale-105 group-hover:rotate-3"
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
                        transition={{
                            duration: 5,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                        className="absolute top-5 right-5 bottom-16 left-5 border-2 border-gray-400/20 bg-gray-50"
                    ></motion.div>
                )}
            </div>
        </div>
    );
}
