import { CKEditor } from '@ckeditor/ckeditor5-react';

import { HtmlTextContainer } from 'components/html-text-container';

import { CheckEditorToolbarItem } from './types';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { StyleProps } from 'types/general';

export interface CheckEditorProps extends StyleProps {
  onBlur?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onFocus?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  onChange?: (args: { event: any; editor: ClassicEditor; data: string }) => void;
  value?: string;
}

export const CheckEditor = ({ onBlur, onChange, onFocus, value, className }: CheckEditorProps) => {
  return (
    <HtmlTextContainer className={ className}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'heading',
              '|',
              'bold',
              'italic',
              '|',
              'link',
              'numberedList',
              'bulletedList',
            ] as Array<CheckEditorToolbarItem>,
            shouldNotGroupWhenFull: true,
          },
        }}
        data={value}
        onChange={(event, editor) => {
          console.log(Array.from(editor.ui.componentFactory.names()));

          const data = editor.getData();
          onChange?.({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          const data = editor.getData();
          onBlur?.({ event, editor, data });
        }}
        onFocus={(event, editor) => {
          const data = editor.getData();
          onFocus?.({ event, editor, data });
        }}
      />
    </HtmlTextContainer>
  );
};
