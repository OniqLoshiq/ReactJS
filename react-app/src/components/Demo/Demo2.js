import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';


const Demo2 = () => {
    const [content, setContent] = useState('');

    const handleEditorChange = (content, editor) => {
        setContent(content);
    }

    return (
        <Styles>
            <Editor
                apiKey="3ru051la3ygpszi787gxznred27xo7l4dwb1wojv9qn01k9w"
                initialValue=""
                init={{
                    height: 500,
                    selector: 'textarea',
                    menubar: 'edit view format tools table insert',
                    plugins: [
                        'advlist autolink lists link image imagetools hr table charmap print preview anchor',
                        'searchreplace visualblocks code quickbars paste media',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        `undo redo | formatselect | bold italic backcolor hr | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | image imagetools media help | \
                        table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol`,
                    image_caption: true,
                    image_advtab: true,
                    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
                }}
                onEditorChange={handleEditorChange}
            />
        </Styles>
    );
}

const Styles = styled.div`
    background-color: white;
`;

export default Demo2;