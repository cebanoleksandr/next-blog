import { Post } from "@/utils/types";
import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

type Props = {
  posts: Post[];
}

export default function AllPosts({ posts }: Props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>

      <PostsGrid posts={posts} />
    </section>
  );
}
