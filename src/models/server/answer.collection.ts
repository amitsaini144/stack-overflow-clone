import { IndexType, Permission } from 'node-appwrite';
import { databases } from './config';
import { db, answerCollection } from '../name';

export default async function createAnswerCollection() {
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.create("users"),
        Permission.delete("users"),
    ]);

    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 100, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 100, true),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    const index = await Promise.all([
        databases.createIndex(db, answerCollection, "authorId", IndexType.Fulltext, ["authorId"], ["ASC"]),
        databases.createIndex(db, answerCollection, "questionId", IndexType.Fulltext, ["questionId"], ["ASC"]),
    ]);

    console.log("Answers : ", index);

}