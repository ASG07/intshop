// import React, { FC } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// // import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import arabic from '@ckeditor/ckeditor5-language/build/translations/ar';


// const CustomCKEditor: FC<CKEditorProps> = ({ value, setData }) => {
//     return (
//       <div className="w-full">
//         <CKEditor
//           editor={ClassicEditor}
//           data={value}
//           onChange={(_, editor) => {
//             const data = editor.getData();
//             setData('content',data);
//           }}
//           config={{
//             language: 'ar',
//             toolbar: [
//               'heading', '|', 'bold', 'italic', 'link', 'alignment', '|',
//               'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'
//             ],
//             alignment: {
//               options: ['left', 'center', 'right', 'justify'], // Alignment options
//             },
//           }}
//         />
//       </div>
//     );
//   };
  
//   export default CustomCKEditor;


// resources/js/components/CKEditorComponent.tsx

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ar';
import '@ckeditor/ckeditor5-style/theme/style.css';


interface Props {
    setData: (key: string, value: any) => void;
    value: string;
}

const CKEditorComponent: React.FC<Props> = ({value, setData}) => {
    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        console.log('Editor data:', data);
        setData('description', data);
        // Handle the data as needed
    };

    return (
        <div className="ckeditor">
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    language: 'ar',
                    // Add any additional configuration here
                }}
                onReady={(editor: any) => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={handleEditorChange}
            />
        </div>
    );
};

export default CKEditorComponent;


