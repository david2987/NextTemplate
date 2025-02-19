// in src/posts.js
import { RichTextInput } from 'ra-input-rich-text';
import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required } from 'react-admin';

export const CommentsCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <RichTextInput source="body" />
        </SimpleForm>
    </Create>
);
