import MDEditor from "@uiw/react-md-editor";
import "./markdown.css";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="markdown-content">
      <MDEditor.Markdown
        className="markdown bg-background"
        source={content}
        components={{
          a: ({ children, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {children}
            </a>
          ),
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mb-6 mt-8 first:mt-0" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-semibold mb-4 mt-6" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold mb-3 mt-5" {...props}>
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-4 leading-7 text-foreground" {...props}>
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="leading-7" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground" {...props}>
              {children}
            </blockquote>
          ),
          code: ({ children, ...props }) => (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
              {children}
            </code>
          ),
          pre: ({ children, ...props }) => (
            <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm" {...props}>
              {children}
            </pre>
          ),
        }}
      />
    </div>
  );
}
