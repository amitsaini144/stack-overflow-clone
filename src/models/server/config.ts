import env from "@/env";
import { Client, Avatars, Databases, Storage, Users } from 'node-appwrite';

const client = new Client();

client
    .setEndpoint(env.appwirte.endpoint)
    .setProject(env.appwirte.projectId)
    .setKey(env.appwirte.apiKey)
    ;

const users = new Users(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export { client, users, databases, avatars, storage };