import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';

const TextareaTinyMce = ({id, name, handleChange}) => {
    return (
        <Styles>
            <Editor
                id={id}
                name={name}
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
                onEditorChange={e => {
                    handleChange({target: {name: 'body', value: e}})
                }}
            />
        </Styles>
    );
}

const Styles = styled.div`
    background-color: white;
`;

export default TextareaTinyMce;