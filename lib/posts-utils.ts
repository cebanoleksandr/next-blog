import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export const getPostFiles = () => {
  return fs.readdirSync(postsDirectory);
}

export const getPostData = (postIdentifier: string): any => {
  const postSlug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  const postData = {
    ...data,
    slug: postSlug,
    content
  };

  return postData;
}

export const getAllPosts = () => {
  const postFiles = getPostFiles();
  const allPosts = postFiles.map(postFile => getPostData(postFile));
  return allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
}

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.isFeatured);
}
