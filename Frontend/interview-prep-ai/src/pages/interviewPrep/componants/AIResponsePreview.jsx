import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {

  if (!content) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              const isInline = !className;

              return !isInline ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              ) : (
                <code
                  className="px-1 py-0.5 bg-gray-100 rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p: ({ children }) => {
              return <p className="md-4 leading-5">{children}</p>;
            },
            strong: ({ children }) => {
              return <strong>{children}</strong>;
            },
            em: ({ children }) => {
              return <em>{children}</em>;
            },
            ul: ({ children }) => {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
              );
            },
            ol: ({ children }) => {
              return (
                <ol className="list-decimal pl-6 space-y-2">{children}</ol>
              );
            },
            li: ({ children }) => {
              return <li className="mb-1">{children}</li>;
            },
            blockquote: ({ children }) => {
              return (
                <blockquote className="border-l-4 border-gray-200 pl-4 italic my-4">
                  {children}
                </blockquote>
              );
            },
            h1: ({ children }) => {
              return (
                <h1 className="text-2xl font-bold mt-6 mb-3">{children}</h1>
              );
            },
            h2: ({ children }) => {
              return (
                <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
              );
            },
            h3: ({ children }) => {
              return (
                <h3 className="text-lg font-bold mt-6 mb-3">{children}</h3>
              );
            },
            h4: ({ children }) => {
              return (
                <h4 className="text-base font-bold mt-6 mb-3">{children}</h4>
              );
            },
            a: ({ children, href }) => {
              return (
                <a href={href} className="text-blue-600 hover:underline">
                  {children}
                </a>
              );
            },
            table: ({ children }) => {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                    {children}
                  </table>
                </div>
              );
            },
            thead: ({ children }) => {
              return <thead className="bg-gray-50 ">{children}</thead>;
            },
            tbody: ({ children }) => {
              return (
                <tbody className="divide-y divide-gray-200">{children}</tbody>
              );
            },
            tr: ({ children }) => {
              return <tr>{children}</tr>;
            },
            th: ({ children }) => {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                  {children}
                </th>
              );
            },
            td: ({ children }) => {
              return (
                <td className="px-3 py-2 whitespace-nowrap text-sm">
                  {children}
                </td>
              );
            },
            hr: () => {
              return <hr className="my-6 border-gray-200" />;
            },
            img: ({ src, alt }) => {
              return (
                <img src={src} alt={alt} className="my-4 max-w-full rouded" />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rouded-lg overflow-hidden bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between px-4 py- bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-500" />
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {language || "Code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="text-gray-500 hover:text-gray-700 focus:outline-none relative group"
          aria-label="Copy code"
        >
          {copied ? (
            <LuCheck size={16} className="text-green-600" />
          ) : (
            <LuCopy size={16} />
          )}
          {copied && (
            <span className="absolute top-8 right-0 bg-black text-white text-xs rounded-md px-1 py-1 opacity-80 group-hover:opacity-100 transition">
              Copied!
            </span>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: 12,
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
export default AIResponsePreview;


// import React, { useState } from "react";
// import { Copy, Check, Code } from "lucide-react";

// const AIResponsePreview = ({ content }) => {
//   if (!content) return null;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="prose prose-slate dark:prose-invert max-w-none text-sm leading-relaxed">
//         <ReactMarkdown
//           components={{
//             code({ className, children, ...props }) {
//               const match = /language-(\w+)/.exec(className || "");
//               const language = match ? match[1] : "";
//               const isInline = !className;

//               return !isInline ? (
//                 <CodeBlock
//                   code={String(children).replace(/\n$/, "")}
//                   language={language}
//                 />
//               ) : (
//                 <code
//                   className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-sm font-mono text-slate-800 dark:text-slate-200"
//                   {...props}
//                 >
//                   {children}
//                 </code>
//               );
//             },
//             p: ({ children }) => {
//               return <p className="mb-4 leading-7 text-slate-700 dark:text-slate-300">{children}</p>;
//             },
//             strong: ({ children }) => {
//               return <strong className="font-semibold text-slate-900 dark:text-slate-100">{children}</strong>;
//             },
//             em: ({ children }) => {
//               return <em className="italic text-slate-700 dark:text-slate-300">{children}</em>;
//             },
//             ul: ({ children }) => {
//               return (
//                 <ul className="list-disc pl-6 space-y-2 my-4 text-slate-700 dark:text-slate-300">{children}</ul>
//               );
//             },
//             ol: ({ children }) => {
//               return (
//                 <ol className="list-decimal pl-6 space-y-2 my-4 text-slate-700 dark:text-slate-300">{children}</ol>
//               );
//             },
//             li: ({ children }) => {
//               return <li className="mb-1 leading-7">{children}</li>;
//             },
//             blockquote: ({ children }) => {
//               return (
//                 <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 pl-4 py-3 my-6 italic text-slate-700 dark:text-slate-300 rounded-r-lg">
//                   {children}
//                 </blockquote>
//               );
//             },
//             h1: ({ children }) => {
//               return (
//                 <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">{children}</h1>
//               );
//             },
//             h2: ({ children }) => {
//               return (
//                 <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-900 dark:text-slate-100">{children}</h2>
//               );
//             },
//             h3: ({ children }) => {
//               return (
//                 <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-900 dark:text-slate-100">{children}</h3>
//               );
//             },
//             h4: ({ children }) => {
//               return (
//                 <h4 className="text-lg font-medium mt-6 mb-3 text-slate-900 dark:text-slate-100">{children}</h4>
//               );
//             },
//             a: ({ children, href }) => {
//               return (
//                 <a 
//                   href={href} 
//                   className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-300 transition-colors"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {children}
//                 </a>
//               );
//             },
//             table: ({ children }) => {
//               return (
//                 <div className="overflow-x-auto my-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
//                   <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
//                     {children}
//                   </table>
//                 </div>
//               );
//             },
//             thead: ({ children }) => {
//               return <thead className="bg-slate-50 dark:bg-slate-800">{children}</thead>;
//             },
//             tbody: ({ children }) => {
//               return (
//                 <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">{children}</tbody>
//               );
//             },
//             tr: ({ children }) => {
//               return <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">{children}</tr>;
//             },
//             th: ({ children }) => {
//               return (
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
//                   {children}
//                 </th>
//               );
//             },
//             td: ({ children }) => {
//               return (
//                 <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
//                   {children}
//                 </td>
//               );
//             },
//             hr: () => {
//               return <hr className="my-8 border-slate-200 dark:border-slate-700" />;
//             },
//             img: ({ src, alt }) => {
//               return (
//                 <div className="my-6">
//                   <img 
//                     src={src} 
//                     alt={alt} 
//                     className="max-w-full h-auto rounded-lg shadow-md border border-slate-200 dark:border-slate-700" 
//                   />
//                 </div>
//               );
//             },
//           }}
//         >
//           {content}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// function CodeBlock({ code, language }) {
//   const [copied, setCopied] = useState(false);

//   const copyCode = async () => {
//     try {
//       await navigator.clipboard.writeText(code);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error('Failed to copy code:', err);
//     }
//   };

//   return (
//     <div className="relative my-6 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
//       <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
//         <div className="flex items-center space-x-2">
//           <Code size={16} className="text-slate-500 dark:text-slate-400" />
//           <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
//             {language || "Code"}
//           </span>
//         </div>
//         <button
//           onClick={copyCode}
//           className="relative flex items-center justify-center w-8 h-8 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
//           aria-label={copied ? "Code copied!" : "Copy code"}
//         >
//           {copied ? (
//             <Check size={16} className="text-green-600 dark:text-green-400" />
//           ) : (
//             <Copy size={16} />
//           )}
//           {copied && (
//             <div className="absolute -top-10 right-0 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg px-2 py-1 opacity-90 animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
//               Copied!
//               <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100"></div>
//             </div>
//           )}
//         </button>
//       </div>
//       <div className="relative">
//         <pre className="p-4 overflow-x-auto text-sm bg-slate-50 dark:bg-slate-900">
//           <code className="font-mono text-slate-800 dark:text-slate-200 leading-6">
//             {code}
//           </code>
//         </pre>
//       </div>
//     </div>
//   );
// }

// // Mock ReactMarkdown component since it's not available in this environment
// const ReactMarkdown = ({ children, components }) => {
//   // This is a simplified version - in real usage, you'd use the actual react-markdown
//   const parseMarkdown = (text) => {
//     // Basic markdown parsing for demo purposes
//     const lines = text.split('\n');
//     let result = [];
//     let inCodeBlock = false;
//     let codeLanguage = '';
//     let codeContent = '';
    
//     for (let i = 0; i < lines.length; i++) {
//       const line = lines[i];
      
//       if (line.startsWith('```')) {
//         if (inCodeBlock) {
//           // End code block
//           result.push(components.code({ 
//             className: `language-${codeLanguage}`, 
//             children: codeContent 
//           }));
//           inCodeBlock = false;
//           codeContent = '';
//           codeLanguage = '';
//         } else {
//           // Start code block
//           inCodeBlock = true;
//           codeLanguage = line.slice(3).trim();
//         }
//       } else if (inCodeBlock) {
//         codeContent += (codeContent ? '\n' : '') + line;
//       } else if (line.startsWith('# ')) {
//         result.push(components.h1({ children: line.slice(2) }));
//       } else if (line.startsWith('## ')) {
//         result.push(components.h2({ children: line.slice(3) }));
//       } else if (line.startsWith('### ')) {
//         result.push(components.h3({ children: line.slice(4) }));
//       } else if (line.trim() === '') {
//         continue;
//       } else {
//         result.push(components.p({ children: line }));
//       }
//     }
    
//     return result.map((element, index) => (
//       <React.Fragment key={index}>{element}</React.Fragment>
//     ));
//   };
  
//   return <div>{parseMarkdown(children)}</div>;
// };

// // Demo content for testing
// const demoContent = `# AI Response Preview Demo

// This is a **modern** and *beautiful* React component for rendering AI responses with proper markdown support.

// ## Features

// - Syntax highlighted code blocks
// - Dark mode support
// - Modern design with smooth animations
// - Copy functionality for code blocks
// - Proper typography and spacing

// ### Code Example

// \`\`\`javascript
// function greet(name) {
//   return \`Hello, \${name}!\`;
// }

// console.log(greet('World'));
// \`\`\`

// ### Inline Code

// Use \`console.log()\` to output messages to the console.

// ### Blockquote

// > This is a beautiful blockquote with modern styling and proper color theming.

// ### Lists

// 1. First item
// 2. Second item
// 3. Third item

// - Bullet point one
// - Bullet point two
// - Bullet point three

// ### Links

// Visit [OpenAI](https://openai.com) for more information.

// ---

// This component is fully responsive and includes proper accessibility features.`;

// export default function App() {
//   return (
//     <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
//       <div className="container mx-auto py-8">
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
//             AI Response Preview
//           </h1>
//           <p className="text-slate-600 dark:text-slate-400">
//             Modern, beautiful markdown renderer for AI responses
//           </p>
//         </div>
        
//         <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
//           <AIResponsePreview content={demoContent} />
//         </div>
//       </div>
//     </div>
//   );
// }
