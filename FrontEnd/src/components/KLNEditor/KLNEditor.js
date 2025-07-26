import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const KLNEditor = ({
  value,
  onChange,
  apiKey,
  height = 500,
  init = {},
  ...props
}) => {
  return (
    <Editor
      apiKey={apiKey}
      value={value}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
          'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount',
        ],
        toolbar:
          'undo redo | formatselect blocks fontsize fontfamily | bold italic underline forecolor backcolor | ' +
          'link image | ' +
          'align lineheight bullist numlist | ' +
          'outdent indent | removeformat | help | preview',
        ...init,
      }}
      onEditorChange={onChange}
      {...props}
    />
  );
};

export default KLNEditor; 