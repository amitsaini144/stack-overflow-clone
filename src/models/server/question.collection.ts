import { IndexType, Permission } from 'node-appwrite';
import { databases } from './config';
import { db, questionCollection } from '../name';

export default async function createQuestionCollection() {
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.create("users"),
        Permission.delete("users"),
    ]);

    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "tags", 100, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 100, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 100, false),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    await Promise.all([
        databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"], ["ASC"]),
        databases.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"], ["ASC"]),
        databases.createIndex(db, questionCollection, "authorId", IndexType.Fulltext, ["authorId"], ["ASC"]),
    ]);

}