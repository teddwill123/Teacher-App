'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FileDown, FileText } from "lucide-react";
import 'react-quill/dist/quill.snow.css';

// Import ReactQuill only on client side with specific settings
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    // @ts-ignore
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

interface LessonEditorProps {
  initialContent?: string;
}

export function LessonEditor({ initialContent = "" }: LessonEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (!isMounted) {
    return <div className="min-h-[500px] border rounded-lg p-4">Loading editor...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lesson Content</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button size="sm">
            <FileDown className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <div className="min-h-[500px] border rounded-lg">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          className="h-[450px]"
        />
      </div>
    </div>
  );
}
