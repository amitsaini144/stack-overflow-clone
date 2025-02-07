import { db, questionCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { apiHandler } from "@/lib/apiHandler";

export async function POST(req: NextRequest) {

    return apiHandler(async () => {
        const { title, content, tags, authorId, attachmentId } = await req.json();

        const response = await databases.createDocument(db, questionCollection, ID.unique(), {
            title,
            content,
            tags,
            authorId,
            attachmentId,
        })

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
        const { searchParams } = new URL(req.url);
        const questionId  = searchParams.get("questionId");

        const question = await databases.getDocument(db, questionCollection, questionId!);
        await databases.deleteDocument(db, questionCollection, questionId!);
        const userPrefs = await users.getPrefs<UserPrefs>(question.authorId);
        await users.updatePrefs(question.authorId, { reputation: Number(userPrefs.reputation) - 1 });

        return NextResponse.json({
            status: 200,
            data: "Question deleted",
        });
    })
}

export async function GET(req: NextRequest) {

    return apiHandler(async () => {
        const { searchParams } = new URL(req.url);
        const questionId  = searchParams.get("questionId");

        const question = await databases.getDocument(db, questionCollection, questionId!);

        return NextResponse.json({
            status: 200,
            data: question,
        });
    })
}

