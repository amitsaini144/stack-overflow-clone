import { answerCollection, db, questionCollection, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { apiHandler } from "@/lib/apiHandler";

export async function POST(req: NextRequest) {
    return apiHandler(async () => {
        const { voteStatus, votedById, type, typeId } = await req.json();

        const existingVoteResponse = await databases.listDocuments(db, voteCollection, [
            Query.equal("type", type),
            Query.equal("typeId", typeId),
            Query.equal("votedById", votedById),
        ])

        const existingVote = existingVoteResponse.documents[0] || null;
        const questionOrAnswer = await databases.getDocument(db, type === "question" ? questionCollection : answerCollection, typeId);
        const authorPrefs = await users.getPrefs<UserPrefs>(questionOrAnswer.authorId);

        let reputationChange = 0;

        if (existingVote) {
            // Case 1: Removing the same vote
            if (existingVote.voteStatus === voteStatus) {
                await databases.deleteDocument(db, voteCollection, existingVote.$id);
                reputationChange = voteStatus === "upvote" ? -1 : 1;
            }
            // Case 2: Changing vote from upvote <-> downvote
            else {
                await databases.updateDocument(db, voteCollection, existingVote.$id, { voteStatus })
                reputationChange = voteStatus === "upvote" ? 2 : -2;

            }
        }
        // Case 3: New Vote
        else {
            await databases.createDocument(db, voteCollection, ID.unique(), {
                type,
                typeId,
                votedById,
                voteStatus,
            });

            reputationChange = voteStatus === "upvote" ? 1 : -1;
        }

        await users.updatePrefs(questionOrAnswer.authorId, { reputation: Number(authorPrefs.reputation) + reputationChange });

        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "upvote"),
            ]),
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "downvote"),
            ]),
        ]);

        return NextResponse.json({
            status: 200,
            data: {
                upvotes: upvotes.total,
                downvotes: downvotes.total,
            }
        });
    })

}
