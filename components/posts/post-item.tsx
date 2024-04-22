import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";
import { Post } from "@/utils/types";

type Props = {
  post: Post;
}

export default function PostItem({ post }: Props) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <li className={classes.post}>
      <Link href={`/posts/${post.slug}`}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={post.title}
            width={300}
            height={200}
            layout="responsive"
          />
        </div>

        <div className={classes.content}>
          <h3>{post.title}</h3>

          <time>{formattedDate}</time>

          <p>{post.excerpt}</p>
        </div>
      </Link>
    </li>
  );
}