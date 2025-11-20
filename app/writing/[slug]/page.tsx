import { getPost, getAllSlugs } from "@/lib/posts";
import { Metadata } from "next";

export async function generateStaticParams() {
	return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}) {
	const post = await getPost(params.slug);
	return {
		title: post.metadata.title,
		description: post.metadata.desc || "",
		openGraph: {
			title: post.metadata.title,
			description: post.metadata.desc || "",
			images: post.metadata.image ? [post.metadata.image] : undefined,
		},
	}
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params;
	const post = await getPost(slug);

	return (
		<article className="prose prose-invert mx-auto py-10 px-2">
			<div>
				<h1>{post.metadata.title}</h1>
				<p>{post.metadata.date}</p>
			</div>
			<div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
		</article>
	);
}
