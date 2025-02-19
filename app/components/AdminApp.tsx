// in src/components/AdminApp.tsx
import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, fetchUtils, Authenticated, Login } from 'react-admin';

import postgrestRestProvider, {
    IDataProviderConfig,
    defaultPrimaryKeys,
    defaultSchema
} from '@raphiniert/ra-data-postgrest';
import { PostCreate } from "./posts/Create";
import PostList from "./posts/List";
import { authProvider } from "../../utils/authProvider";



const config: IDataProviderConfig = {
    apiUrl: '/api/admin',
    httpClient: fetchUtils.fetchJson,
    defaultListOp: 'eq',
    primaryKeys: defaultPrimaryKeys,
    schema: defaultSchema,
};

const MyLoginPage = () => (
    <Login backgroundImage="https://acme.com/img/background.png" />
);

const Ready = () => (
    <div>
        <h1>Admin ready</h1>
        <p>You can now add resources</p>
    </div>
)

const dataProvider = postgrestRestProvider(config);

const AdminApp = () => (
    <>
        <Admin ready={MyLoginPage} loginPage={false} dataProvider={dataProvider} authProvider={authProvider}>
            <Authenticated>
                <Resource name="users" list={ListGuesser} edit={EditGuesser} recordRepresentation="name" />
                <Resource name="posts" create={PostCreate} list={PostList} edit={EditGuesser} recordRepresentation="title" />
                <Resource name="comments" list={ListGuesser} edit={EditGuesser} />
            </Authenticated>
        </Admin>
    </>
    // <Admin dataProvider={dataProvider}>
    //     <Resource name="users" list={ListGuesser} edit={EditGuesser} recordRepresentation="name" />
    //     <Resource name="posts" create={PostCreate} list={PostList} edit={EditGuesser} recordRepresentation="title" />
    //     <Resource name="comments" list={ListGuesser} edit={EditGuesser} />
    // </Admin>
);

export default AdminApp;
