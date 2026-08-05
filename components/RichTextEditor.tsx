// // components/RichTextEditor.tsx
// "use client";

// import dynamic from "next/dynamic";
// import "react-quill-new/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// interface RichTextEditorProps {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, 4, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["code-block", "blockquote"],
//     ["link"],
//     ["clean"],
//   ],
// };

// export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
//   return (
//     <div className="bg-white dark:bg-slate-800/60 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//         modules={modules}
//         placeholder={placeholder || "Write your project story..."}
//         className="text-slate-900 dark:text-slate-100"
//       />
//     </div>
//   );
// }





// "use client";

// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill-new"), {
//   ssr: false,
// });

// type Props = {
//   value: string;
//   onChange: (value: string) => void;
// };

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],

//     ["bold", "italic", "underline", "strike"],

//     [{ color: [] }, { background: [] }],

//     [{ list: "ordered" }, { list: "bullet" }],

//     ["blockquote", "code-block"],

//     ["link", "image"],

//     [{ align: [] }],

//     ["clean"],
//   ],
// };

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "blockquote",
//   "code-block",
//   "link",
//   "image",
//   "align",
// ];

// export default function RichTextEditor({
//   value,
//   onChange,
// }: Props) {
//   return (
//     <div className="bg-white rounded-xl">
//       <ReactQuill
//         theme="snow"
//         value={value}
//         onChange={onChange}
//         modules={modules}
//         formats={formats}
//       />
//     </div>
//   );
// }





// components/RichTextEditor.tsx
"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

type Props = {
  value: string;
  onChange: (value: string) => void;
};

// Rich toolbar modules including header drop-downs, background colors, and code
const modules = {
  toolbar: [
    // Header select-box (H1, H2, H3, Normal text)
    [{ header: [1, 2, 3, false] }],

    // Inline styles
    ["bold", "italic", "underline", "strike"],

    // Text color & background color select options
    [{ color: [] }, { background: [] }],

    // Lists & Indentation
    [{ list: "ordered" }, { list: "bullet" }],
    [{ list: "ordered" }, { list: "bullet" }],

    // Code snippets, Blockquotes, & Links
    ["code-block", "blockquote", "link"],

    // Alignment
    [{ align: [] }],

    // Clear formatting
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "code-block",
  "blockquote",
  "link",
  "align",
];

export default function RichTextEditor({ value, onChange }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}

