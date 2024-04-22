import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-utils";
import { Post } from "@/utils/types";
import Head from "next/head";

type Props = {
  posts: Post[];
}

export default function AllPostsPage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of programming-related tutorials and posts!" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export const getStaticProps = () => {
  const posts = getAllPosts();

  return {
    props: { posts }
  }
}
