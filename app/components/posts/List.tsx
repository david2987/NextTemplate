import * as React from 'react';
import { List, Datagrid, TextField,TextInput,SearchInput, ImageField } from 'react-admin';
import { TopToolbar, SortButton, CreateButton, ExportButton } from 'react-admin';

const postFilters = [
    <SearchInput source="q" alwaysOn />,
    <TextInput label="Title" source="title" defaultValue="Hello, World!" />,
];

const ListActions = () => (
    <TopToolbar>
        <SortButton fields={['id', 'title']} />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);


const PostList = () => (
    <List resource="posts"  filters={postFilters}>
        <ListActions></ListActions>
        <Datagrid >
            <TextField source="id"   />
            <TextField source="title" />
            <TextField source="body"  />
            <ImageField source="url" title="title"  sx={{ '& img': { maxWidth: 150, maxHeight: 150, objectFit: 'contain' } }}  />
        </Datagrid>
    </List>
);

export default PostList;
