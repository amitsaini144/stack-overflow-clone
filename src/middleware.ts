import { NextResponse } from 'next/server'
import getOrCreateDatabase from './models/server/db';
import getOrCreateStorage from './models/server/storage';

export async function middleware() {
    await Promise.all([getOrCreateDatabase(), getOrCreateStorage()]);
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/image|favicon.ico).*)'],
}