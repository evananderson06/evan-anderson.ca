import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Home() {
  return (
    <div className="px-2 h-full w-full flex flex-col justify-center items-center gap-5">
      <Image src={"/images/Evan.jpg"} width={200} height={200} className="rounded-full" alt="Photo of Evan Anderson" />
      <h1 className="text-5xl font-bold">Evan Anderson</h1>
      <p>Computer Engineering Student at UBC</p>
      <div className="flex gap-4">
        <Link href="mailto:me@evan-anderson.ca"><FaEnvelope size={24} className="hover:text-gray-300 transition-colors" /></Link>
        <Link href="https://linkedin.com/in/evan-e-anderson"><FaLinkedin size={24} className="hover:text-gray-300 transition-colors" /></Link>
        <Link href="https://github.com/evananderson06"><FaGithub size={24} className="hover:text-gray-300 transition-colors" /></Link>
        <Link href="https://www.instagram.com/evan_anderson06/"><FaInstagram size={24} className="hover:text-gray-300 transition-colors" /></Link>
      </div>
    </div>
  );
}
