import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "@/lib/posts-utils";
import { Post } from "@/utils/types";
import Head from "next/head";

type Props = {
  post: Post;
}

export default function PostDetailPage({ post }: Props) {
  return <>
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
    </Head>
    <PostContent post={post} />
  </>;
}

export const getStaticProps = (context: any) => {
  const { params } = context;
  const { slug } = params;
  const post = getPostData(slug);

  return {
    props: { post },
    revalidate: 600
  };
}

export const getStaticPaths = () => {
  const postFilenames = getPostFiles();
  const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  };
}
