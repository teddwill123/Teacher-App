'use client';

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { FileDown, FileText } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface LessonEditorProps {
  initialContent?: string;
}

export function LessonEditor({ initialContent = "" }: LessonEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
          className="h-[450px]"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean']
            ]
          }}
        />
      </div>
    </div>
  );
}
