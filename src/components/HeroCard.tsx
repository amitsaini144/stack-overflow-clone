import Link from "next/link";


export default function HeroCard({ reputation }: { reputation: undefined | number }) {
    return (
        <div className="flex flex-col p-4 text-white border border-[#494d50] rounded-md gap-2">
            <div className="font-bold text-lg">Reputation</div>
            <div className="flex flex-col gap-2">
                <div>
                    <h2 className="text-2xl">{reputation}</h2>
                </div>
                <div className="text-sm">
                    Earn reputation by <Link href="/" className="underline">Asking</Link>, <Link href="/" className="underline">Answering</Link> and <Link href="/" className="underline">Editing</Link>
                </div>
            </div>

        </div>
    )
}