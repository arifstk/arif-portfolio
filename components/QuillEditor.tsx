// // components/QuillEditor.tsx
// "use client";

// import dynamic from "next/dynamic";
// import { forwardRef, useMemo } from "react";
// import "react-quill-new/dist/quill.snow.css";

// const ReactQuillBase = dynamic(() => import("react-quill-new"), { ssr: false });

// interface QuillEditorProps {
//   value: string;
//   onChange: (html: string) => void;
//   placeholder?: string;
// }

// const QuillEditor = forwardRef<any, QuillEditorProps>(function QuillEditor(
//   { value, onChange, placeholder },
//   ref
// ) {
//   const modules = useMemo(
//     () => ({
//       toolbar: [[{ header: [1, 2, 3, 4, false] }], ["bold"], ["code"]],
//     }),
//     []
//   );
//   const formats = ["header", "bold", "code"];

//   return (
//     <ReactQuillBase
//       ref={ref}
//       theme="snow"
//       value={value}
//       onChange={onChange}
//       modules={modules}
//       formats={formats}
//       placeholder={placeholder}
//       className="quill-project-editor"
//     />
//   );
// });

// export default QuillEditor;

