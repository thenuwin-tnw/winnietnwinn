import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Tailwind's reset strips all default styles, so we style each Markdown element here.
const components: Components = {
  h2: (props) => <h2 className="mt-10 mb-4 text-2xl font-black" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3 text-xl font-bold" {...props} />,
  p: (props) => <p className="my-4 leading-relaxed" {...props} />,
  a: (props) => (
    <a className="font-bold underline decoration-2 hover:bg-sun" {...props} />
  ),
  ul: (props) => <ul className="my-4 list-disc space-y-1 pl-6" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-1 pl-6" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-ink bg-sun/40 px-4 py-2 italic" {...props} />
  ),
  // Inline `code`; code blocks get their look from the `pre` below.
  code: (props) => (
    <code className="border border-ink bg-white px-1 font-mono text-sm" {...props} />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto border-4 border-ink bg-ink p-4 text-sm text-paper [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  img: ({ alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element -- Markdown images have no known size, so next/image can't be used
    <img alt={alt ?? ""} loading="lazy" className="my-6 w-full border-4 border-ink" {...props} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse border-2 border-ink" {...props} />
    </div>
  ),
  th: (props) => <th className="border-2 border-ink bg-sun px-3 py-2 text-left" {...props} />,
  td: (props) => <td className="border-2 border-ink px-3 py-2" {...props} />,
  hr: () => <hr className="my-10 border-t-4 border-ink" />,
};

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
