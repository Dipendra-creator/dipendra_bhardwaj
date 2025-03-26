import type { MDXComponents } from 'mdx/types';
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-3xl font-bold my-4" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold my-3" {...props} />,
    h3: (props) => <h3 className="text-xl font-bold my-2" {...props} />,
    p: (props) => <p className="my-2 text-gray-700" {...props} />,
    code: (props) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props} />
    ),
    pre: (props) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg my-4 overflow-x-auto" {...props} />
    ),
    ul: (props) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
    ol: (props) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
    li: (props) => <li className="text-gray-700" {...props} />,
    blockquote: (props) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-4 italic" {...props} />
    ),
    ...components,
  };
}