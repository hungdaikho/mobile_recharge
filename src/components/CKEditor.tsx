import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorProps {
  value: string;
  onChange: (data: string) => void;
}

export default function CustomCKEditor({ value, onChange }: CKEditorProps) {
  return (
    <CKEditor
      editor={ClassicEditor as any} // Type assertion to fix type error
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'insertTable',
          'undo',
          'redo'
        ]
      }}
    />
  );
} 