import Link from "next/link";

export default function Nav() {
	return (
		<nav className="w-full flex justify-center items-center gap-10 py-4">
			<Link href="/">Home</Link>
			<Link href="/blog">Blog</Link>
			<Link href="/resume">Resume</Link>
		</nav>
	)
}