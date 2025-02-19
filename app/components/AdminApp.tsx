// in src/components/AdminApp.tsx
import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, fetchUtils, Authenticated } from 'react-admin';
import { MyLoginPage } from "./auth/Login";
import postgrestRestProvider, {
    IDataProviderConfig,
    defaultPrimaryKeys,
    defaultSchema
} from '@raphiniert/ra-data-postgrest';
import { PostCreate } from "./posts/Create";
import PostList from "./posts/List";
import { authProvider } from "../../utils/authProvider";
import { i18nProvider } from "@/utils/i18nProvider";



const config: IDataProviderConfig = {
    apiUrl: '/api/admin',
    httpClient: fetchUtils.fetchJson,
    defaultListOp: 'eq',
    primaryKeys: defaultPrimaryKeys,
    schema: defaultSchema,
};


const dataProvider = postgrestRestProvider(config);
const AdminApp = () => (
    <>
        <Admin i18nProvider={i18nProvider} ready={MyLoginPage} loginPage={false} dataProvider={dataProvider} authProvider={authProvider}>
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
