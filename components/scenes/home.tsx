import Film from "@components/art/2d/film";
import { cn } from "@utils/cn";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const CONTACTS = [
    {
        href: "mailto:me@evan-anderson.ca",
        label: "Email",
        Icon: FaEnvelope,
        hover: "hover:text-black",
    },
    {
        href: "https://linkedin.com/in/evan-e-anderson",
        label: "LinkedIn",
        Icon: FaLinkedin,
        hover: "hover:text-[#0072b1]",
    },
    {
        href: "https://github.com/evananderson06",
        label: "GitHub",
        Icon: FaGithub,
        hover: "hover:text-black",
    },
    {
        href: "https://www.instagram.com/evan_anderson06/",
        label: "Instagram",
        Icon: FaInstagram,
        hover: "hover:text-[#e1306c]",
    },
];

// per-letter hover poses, cycled for words longer than the list
const WIGGLES = [
    "group-hover:-translate-y-1 group-hover:rotate-12",
    "group-hover:translate-y-0.5 group-hover:-rotate-12",
    "group-hover:-translate-y-0.5 group-hover:rotate-6",
    "group-hover:-rotate-12",
    "group-hover:translate-y-1.5 group-hover:rotate-12",
    "group-hover:-rotate-6",
    "group-hover:-translate-y-1 group-hover:rotate-12",
    "group-hover:rotate-12",
];

function WiggleText({ text, className }: { text: string; className: string }) {
    return (
        <div
            className={cn(
                "group mb-2 flex text-2xl font-semibold transition-colors hover:cursor-pointer",
                className
            )}
        >
            {[...text].map((letter, i) => (
                <div
                    key={i}
                    className={cn(
                        "transition-all group-hover:mr-1",
                        WIGGLES[i % WIGGLES.length]
                    )}
                >
                    {letter}
                </div>
            ))}
        </div>
    );
}

export default function Home() {
    return (
        <div className="flex h-screen w-screen items-center justify-center gap-20 overflow-hidden">
            <div>
                <div className="text-5xl font-semibold">Evan Anderson</div>
                <div className="mb-5">Computer Engineering Student @ UBC</div>
                <WiggleText text="Projects" className="hover:text-blue-800" />
                <a href="https://evananderson06.substack.com/">
                    <WiggleText
                        text="Writing"
                        className="hover:text-emerald-700"
                    />
                </a>
                <WiggleText
                    text="Photography"
                    className="hover:text-rose-700"
                />
                <div className="mt-5 flex gap-4 text-gray-600">
                    {CONTACTS.map(({ href, label, Icon, hover }, i) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            target={
                                href.startsWith("http") ? "_blank" : undefined
                            }
                            rel="noreferrer"
                            className={cn(
                                "transition-all hover:-translate-y-1",
                                i % 2 ? "hover:rotate-12" : "hover:-rotate-12",
                                hover
                            )}
                        >
                            <Icon size={24} />
                        </a>
                    ))}
                </div>
            </div>
            <div className="relative">
                <Film
                    src="/evanubchunt.JPG"
                    caption="Evan @ UBC Hunt 2025"
                    className="absolute -rotate-15"
                    fadeIn
                />
                <Film
                    src="/evanubchunt.JPG"
                    caption="Evan @ UBC Hunt 2025"
                    className="absolute rotate-[-9deg]"
                    fadeIn
                />
                <Film
                    src="/evanubchunt.JPG"
                    caption="Evan @ UBC Hunt 2025"
                    className="absolute -rotate-3"
                    fadeIn
                />
                <Film
                    src="/evanubchunt.JPG"
                    caption="Evan @ UBC Hunt 2025"
                    className="rotate-3"
                    fadeIn
                    hoverEffect
                />
            </div>
            <motion.div
                className="pointer-events-none absolute inset-0 z-50 bg-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />
        </div>
    );
}
