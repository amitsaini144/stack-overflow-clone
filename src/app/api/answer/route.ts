import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";
import { apiHandler } from "@/lib/apiHandler";

export async function POST(req: NextRequest) {
    return apiHandler(async () => {
        const { authorId, questionId, content } = await req.json();

        const response = await databases.createDocument(db, answerCollection, ID.unique(), {
            content,
            authorId,
            questionId,
        });

        const userPrefs = await users.getPrefs<UserPrefs>(authorId);
        await users.updatePrefs(authorId, { reputation: Number(userPrefs.reputation) + 1 });

        return NextResponse.json({
            status: 200,
            data: response,
        });
    })
}

export async function DELETE(req: NextRequest) {
    return apiHandler(async () => {
        const { answerId } = await req.json();

        const answer = await databases.getDocument(db, answerCollection, answerId);
        await databases.deleteDocument(db, answerCollection, answerId);
        const userPrefs = await users.getPrefs<UserPrefs>(answer.authorId);
        await users.updatePrefs(answer.authorId, { reputation: Number(userPrefs.reputation) - 1 });

        return NextResponse.json({
            status: 200,
            data: "Answer deleted",
        });
    })
}

export async function GET(req: NextRequest) {
    return apiHandler(async () => {
        const { searchParams } = new URL(req.url);
        const answerId  = searchParams.get("answerId");

        const answer = await databases.getDocument(db, answerCollection, answerId!);

        return NextResponse.json({
            status: 200,
            data: answer,
        });
    })
}