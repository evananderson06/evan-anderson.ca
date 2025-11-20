import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
	const posts = getAllPosts();
	posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

	return (
		<main className="prose prose-invert mx-auto py-10 px-2">
			{posts.map(({ slug, metadata }) => (
				<div key={slug} className="font-bold underline">
					<Link href={`/writing/${slug}`}>{metadata.title}</Link>
				</div>
			))}
		</main>
	);
}