import FormCard from '@/components/FormCard'
import Link from 'next/link'
export default function Login() {

    return (
        <div className="bg-black/90 flex flex-col items-center justify-center h-screen">
            <div className='bg-black rounded-lg border border-gray-500 flex flex-col items-start'>
                <div className='py-4 pl-6'>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Welcome Back
                    </h1>
                    <p className='text-white text-sm'>If you don&apos;t have an account,{" "}
                        <Link href="/signup" className="font-semibold hover:underline">
                            signup
                        </Link>{" "}
                        now</p>
                </div>

                <FormCard mode="login" />
            </div>
        </div>
    )
}