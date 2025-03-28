import React from 'react';
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';

export default function PostEditor({name, control, defaultValue=""}) {
  
 
  return (
    <>
    <div>
        <Controller
          name={name || "content"}
          control={control}
          render={({ field }) => (
            <Editor
              apiKey= {import.meta.env.VITE_RICH_TEXT_EDITOR_API}
            
              initialValue = {defaultValue}
              init={{
                branding: false,
                plugins:
                  ' anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount autosave code',
                toolbar:
                  'blocks undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={(content) => field.onChange(content)}
            />
          )}
        />
      </div>
    </>
  );
}
