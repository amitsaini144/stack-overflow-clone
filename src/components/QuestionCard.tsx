import { Question } from "@/store/Question";

export default function QuestionCard({ title, content, tags }: Question) {

    

    return (
        <div className="flex p-4 gap-6 border-b border-[#494d50]">
            <div className="flex flex-col gap-y-2 items-end">
                <div className="flex gap-x-2">
                    <p>0</p>
                    <p>votes</p>
                </div>
                <div className="flex gap-x-2">
                    <p>0</p>
                    <p>answers</p>
                </div>
                <div className="flex gap-x-2">
                    <p>3</p>
                    <p>views</p>
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-[#90C4F9]">{title}</h1>
                <p >{content}</p>
                <div>{tags.join(" | ")}</div>
            </div>
        </div>
    )

}