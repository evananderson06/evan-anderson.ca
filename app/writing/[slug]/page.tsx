import { getPost, getAllSlugs } from "@/lib/posts";

export async function generateStaticParams() {
	return getAllSlugs().map(slug => ({ slug }));
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
