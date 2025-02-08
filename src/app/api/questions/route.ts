import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextResponse } from "next/server";
import { apiHandler } from "@/lib/apiHandler";

export async function GET() {

    return apiHandler(async () => {

        const questions = await databases.listDocuments(db, questionCollection);

        return NextResponse.json({
            status: 200,
            data: questions,
        });
    })
}