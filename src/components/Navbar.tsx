"use client"

import { useAccountStore } from '@/store/Auth'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import stackoverflow from '../../public/logo-stackoverflow.svg'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { logout, session } = useAccountStore();
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className="bg-[#252627] border-b border-[#494d50] sticky top-0 left-0 right-0 z-50 ">
            <div className="flex items-center justify-between h-16 px-5 md:px-20 py-4">
                <Link href="/">
                    <Image src={stackoverflow} alt="logo" width={140} height={140} priority/>
                </Link>

                {session ? (
                    <Button onClick={logout} className='bg-[#252627] text-white border border-[#494d50]'>Logout</Button>
                ) : (
                    <div className='flex items-center gap-4'>
                        {pathname != '/login' && <Button onClick={() => router.push('/login')} className='bg-[#252627] text-white border border-[#494d50]'>Login</Button>}
                        {pathname != '/signup' && <Button onClick={() => router.push('/signup')} className='bg-[#F58025] text-white'>Sign up</Button>}
                    </div>
                )}
            </div>
        </div>
    )
}