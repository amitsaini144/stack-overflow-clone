import { IndexType, Permission } from 'node-appwrite';
import { databases } from './config';
import { db, commentCollection } from '../name';

export default async function createCommentCollection() {
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.create("users"),
        Permission.delete("users"),
    ]);

    await Promise.all([
        databases.createEnumAttribute(db, commentCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createStringAttribute(db, commentCollection, "authorId", 100, true),
        databases.createStringAttribute(db, commentCollection, "typeId", 100, true),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    const index = await Promise.all([
        databases.createIndex(db, commentCollection, "type", IndexType.Fulltext, ["type"], ["ASC"]),
        databases.createIndex(db, commentCollection, "authorId", IndexType.Fulltext, ["authorId"], ["ASC"]),
        databases.createIndex(db, commentCollection, "typeId", IndexType.Fulltext, ["typeId"], ["ASC"]),
    ]);

    console.log("Comments : ", index);

}