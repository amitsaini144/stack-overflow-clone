"use client";

import React from 'react'
import { useAccountStore } from '@/store/Auth'
import { useRouter } from 'next/navigation'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { session } = useAccountStore()
    const router = useRouter()

    React.useEffect(() => {
        if (session) {
            router.replace('/')
        }
    }, [session, router])

    return (
        <div>{children}</div>
    )
}

export default AuthLayout;