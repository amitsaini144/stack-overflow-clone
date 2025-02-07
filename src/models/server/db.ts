import { db } from "../name";
import { databases } from "./config";

import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDatabase() {
    try {
        await databases.get(db);
    } catch (error) {
        console.log(error);
        try {
            await databases.create(db, db);

            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ]);

        } catch (error) {
            console.log("Error creating database : ", error);
        }
    }

    return databases;
}