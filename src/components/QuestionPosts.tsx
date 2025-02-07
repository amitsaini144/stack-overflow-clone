"use client"

import QuestionSection from "./QuestionSection"

export default function QuestionPosts() {

    return (
        <section className="flex flex-col gap-6">
            <div className="flex">
                <div className="flex flex-col text-white">
                    <h1 className="text-2xl font-semibold">Interesting posts for you</h1>
                    <p className="text-[13px] text-[#C8CCD0]">Based on your viewing history and watched tags.</p>
                </div>
            </div>
            <div className='flex lg:w-[60%]'>
                <QuestionSection />
            </div>
        </section>
    )
}