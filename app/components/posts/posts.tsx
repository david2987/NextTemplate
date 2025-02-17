// in src/posts.js
import { RichTextInput } from 'ra-input-rich-text';
import * as React from 'react';
import { Create, SimpleForm, TextInput, DateInput, required } from 'react-admin';

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <RichTextInput source="body" />
        </SimpleForm>
    </Create>
);

// // in src/App.js
// import * as React from 'react';
// import { Admin, Resource } from 'react-admin';
// import jsonServerProvider from 'ra-data-json-server';

// import { PostCreate } from './posts';

// const App = () => (
//     <Admin dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}>
//         <Resource name="posts" create={PostCreate} />
//     </Admin>
// );

// export default App;
