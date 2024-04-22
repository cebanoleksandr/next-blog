import { Post } from "@/utils/types";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

type Props = {
  posts: Post[];
}

export default function FeaturePosts({ posts }: Props) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}