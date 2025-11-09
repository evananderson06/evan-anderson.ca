import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

import html from "remark-html";

const postsDir = path.join(process.cwd(), "content");

export function getAllSlugs() {
	return fs.readdirSync(postsDir).map(file =>
		file.replace(/\.md$/, "")
	);
}

export async function getPost(slug: string) {
	const filePath = path.join(postsDir, slug + ".md");
	const fileContent = fs.readFileSync(filePath, "utf8");

	const { data, content } = matter(fileContent);

	const processedContent = await remark()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypePrettyCode, {
			theme: "github-dark", // can switch to "github-light" or anything Shiki supports
			keepBackground: false
		})
		.use(rehypeStringify)
		.process(content);

	const htmlContent = processedContent.toString();

	console.log(htmlContent)

	return {
		metadata: data,
		htmlContent
	};
}

export function getAllPosts() {
	return getAllSlugs().map(slug => {
		const file = fs.readFileSync(path.join(postsDir, slug + ".md"), "utf8");
		const { data } = matter(file);
		return { slug, metadata: data };
	});
}
