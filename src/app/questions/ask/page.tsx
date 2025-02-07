import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"

export default function AskPage() {
    return (
        <div className="bg-[#252627] flex flex-col h-screen w-full px-20 pt-10">
            <div className="flex flex-col w-full max-w-xl gap-y-4">
                <div className="flex flex-col w-full gap-y-2">
                    <div className="flex flex-col">
                        <Label htmlFor="title" className="">Title</Label>
                        <Label htmlFor="subtitle" className="text-xs text-[#C8CCD0]">Be specific and imagine you’re asking a question to another person.</Label>
                    </div>
                    <Input type="text" id="title" placeholder="e.g. Is there an R Function for finding the index of an element in a vector?" />
                    <Button type="submit" className="w-[15%]">Next</Button>
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <Label htmlFor="email" className="">What are the details of your problem?</Label>
                    <Input type="email" id="email" placeholder="" />
                    <Button type="submit" className="w-[15%]">Next</Button>
                </div> <div className="flex flex-col w-full gap-y-2">
                    <Label htmlFor="email" className="">Tags</Label>
                    <Input type="email" id="email" placeholder="" />
                    <Button type="submit" className="w-[15%]">Next</Button>
                </div>
            </div>

        </div>
    )
}