import ReactMarkdown from "react-markdown";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import { Post } from "@/utils/types";

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

type Props = {
  post: Post;
}

export default function PostContent({ post }: Props) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return <div className={classes.image}>
          <Image 
            src={`/images/posts/${post.slug}/${image.properties.src}`}
            alt={image.alt}
            width={600}
            height={300}
          />
        </div>
      }

      return <p>{paragraph.children}</p>;
    },
    code(code: any) {
      const { className, children } = code;
      const language = className.split('-')[1];
      
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
        >{children}</SyntaxHighlighter>
      );
    }
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
