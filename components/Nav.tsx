import Link from "next/link";

export default function Nav() {
	return (
		<nav className="w-full flex justify-center items-center gap-10 py-4">
			<Link href="/">home</Link>
			<Link href="/writing">writing</Link>
			<Link href="/resume">resume</Link>
		</nav>
	)
}