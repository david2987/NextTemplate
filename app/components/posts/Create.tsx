// in src/posts.js
import { RichTextInput } from 'ra-input-rich-text';
import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required ,FileField,UrlField  } from 'react-admin';

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <RichTextInput source="body" />
            <FileField source="url" src="url" title="desc" />

        </SimpleForm>
    </Create>
);
