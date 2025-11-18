import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
	const posts = getAllPosts();

	return (
		<main className="prose prose-invert mx-auto py-10 px-2">
			<h1>Blog</h1>
			<ul className="flex flex-col font-bold">
				{posts.map(({ slug, metadata }) => (
					<li key={slug}>
						<Link href={`/blog/${slug}`}>{metadata.title}</Link>
					</li>
				))}
			</ul>
		</main>
	);
}