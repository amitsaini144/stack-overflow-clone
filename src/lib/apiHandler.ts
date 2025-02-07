import { NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";

export async function apiHandler(handler: () => Promise<NextResponse>): Promise<NextResponse> {
    try {
        return await handler();
    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred";
        let statusCode = 500;
        console.log(error);

        if (error instanceof Error) errorMessage = error.message;
        if (error instanceof AppwriteException) {
            errorMessage = error.message;
            statusCode = error.code;
        }
        if (typeof error === "object" && error !== null && "status" in error && typeof error.status === "number") {
            statusCode = error.status;
        }

        return NextResponse.json({
            status: statusCode,
            message: errorMessage,
        });
    }
}