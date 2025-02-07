import { IndexType, Permission } from 'node-appwrite';
import { databases } from './config';
import { db, voteCollection } from '../name';

export default async function createVoteCollection() {
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.write("users"),
        Permission.create("users"),
        Permission.delete("users"),
    ]);

    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "votedById", 10000, true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvote", "downvote"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 100, true),
    ]);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const index = await Promise.all([
        databases.createIndex(db, voteCollection, "type", IndexType.Fulltext, ["type"], ["ASC"]),
        databases.createIndex(db, voteCollection, "votedByID", IndexType.Fulltext, ["votedById"], ["ASC"]),
        databases.createIndex(db, voteCollection, "voteStatus", IndexType.Fulltext, ["voteStatus"], ["ASC"]),
        databases.createIndex(db, voteCollection, "typeId", IndexType.Fulltext, ["typeId"], ["ASC"]),
    ]);

    console.log("Votes : ", index);
}