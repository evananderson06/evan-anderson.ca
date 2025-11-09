import Link from "next/link";

export default function Resume() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<Link target="_blank" href="/EvanAndersonResume.pdf" className="underline">Download Resume</Link>
		</div>
	)
}