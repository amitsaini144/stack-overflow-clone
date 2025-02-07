import FormCard from '@/components/FormCard'
import Link from 'next/link'

export default function Signup() {
    return (
        <div className="bg-black flex flex-col items-center justify-center h-screen">
            <div className='bg-black rounded-lg border border-gray-500 flex flex-col items-start'>
                <div className='py-4 pl-6'>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Join Stack Overflow
                    </h1>
                    <p className='text-white text-sm'>If you already have an account,{" "}
                        <Link href="/login" className="font-semibold hover:underline">
                            login
                        </Link>{" "}
                        now</p>
                </div>
                <FormCard mode="signup" />
            </div>
        </div>
    )
}