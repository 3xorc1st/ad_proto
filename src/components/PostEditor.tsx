import React from 'react';
import { Editor } from './editor/Editor';

const PostEditor: React.FC<{ content: string, onChange: (content: string) => void }> = ({ content, onChange }) => {
    const handleChange = (newContent: string) => {
        onChange(newContent);
    };

    return (
        <div>
            <h3>Customize Post Details</h3>
            <Editor content={content} onChange={handleChange} />
        </div>
    );
};

export default PostEditor;