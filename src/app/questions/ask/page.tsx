"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import RTE from "@/components/RTE"
import { useState } from "react"
import axios from "axios"
import { useAccountStore } from "@/store/Auth"

export default function AskPage() {
    const [question, setQuestion] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const { user } = useAccountStore()

    async function handleSubmit() {
        try {
            const response = await axios.post("/api/question", {
                title,
                content: question,
                tags,
                authorId: user?.$id,
            })

            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="bg-[#252627] flex flex-col min-h-screen w-full px-5 md:px-20 pt-10">
            <div className="flex flex-col w-full max-w-3xl gap-y-6">

                <h1 className="text-3xl font-bold">Ask a public question</h1>

                <div className="flex flex-col w-full gap-y-2">
                    <div className="flex flex-col">
                        <Label htmlFor="title">
                            Title
                        </Label>
                        <Label
                            htmlFor="subtitle"
                            className="text-xs text-[#C8CCD0]">Be specific and imagine you’re asking a question to another person.</Label>
                    </div>
                    <Input
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        id="title"
                        placeholder="e.g. Is there an R Function for finding the index of an element in a vector?" />
                    <Button type="submit" className="w-[15%]">Next</Button>
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <div className="flex flex-col">
                        <Label htmlFor="title" className="">What are the details of your problem?</Label>
                        <Label htmlFor="subtitle" className="text-xs text-[#C8CCD0]">Introduce the problem and expand on what you put in the title. Minimum 20 characters.</Label>
                    </div>
                    <form className="space-y-2">
                        <RTE
                            value={question}
                            onChange={value => setQuestion(() => value || "")} />
                    </form>
                    <Button type="submit" className="w-[15%]">Next</Button>
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <div className="flex flex-col">
                        <Label htmlFor="title" className="">Tags</Label>
                        <Label htmlFor="subtitle" className="text-xs text-[#C8CCD0]">Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</Label>
                    </div>
                    <Input
                        type="text"
                        id="tags"
                        onChange={(event) => setTags(event.target.value.split(" "))}
                        placeholder="e.g. (swift string spring)" />
                </div>

                <div>
                    <Button type="submit" className="bg-[#90C4F9] text-black" onClick={handleSubmit}>Post your question</Button>
                </div>

            </div>
        </div>
    )
}