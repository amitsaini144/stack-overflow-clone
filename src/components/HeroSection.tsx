"use client"
import { Button } from './ui/button'
import Link from 'next/link'
import { useAccountStore } from '@/store/Auth'
import { account } from '@/models/client/config'
import HeroCard from './HeroCard'
import { useEffect, useState } from 'react'

export default function HeroSection() {
    const [reputation, setReputation] = useState<number>(0)
    const { user } = useAccountStore()

    useEffect(() => {
        if (!user) return

        account.get()
            .then((data) => setReputation(data?.prefs?.reputation || 0))
            .catch((error) => console.error("Failed to fetch reputation:", error))
    }, [user])

    return (
        <section className="flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="flex flex-col text-white">
                    <h1 className="text-3xl font-semibold">Welcome, {user?.name}</h1>
                    <p className="text-sm text-[#C8CCD0]">Find answers to your technical questions and help others answer theirs.</p>
                </div>
                <div>
                    <Link href="/questions/ask">
                        <Button className='bg-[#252627] text-white border border-[#494d50]'>Ask Question</Button>
                    </Link>
                </div>
            </div>
            <div className='flex'>
                <HeroCard reputation={reputation} />
            </div>
        </section>
    )
}