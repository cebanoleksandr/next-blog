import FeaturePosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-utils";
import { Post } from "@/utils/types";
import Head from "next/head";

type Props = {
  posts: Post[];
}

export default function HomePage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Alex&apos; blog</title>
        <meta name="description" content="I post about programming and web development" />
      </Head>
      <Hero />
      <FeaturePosts posts={posts} />
    </>
  );
}

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts }
  }
}
