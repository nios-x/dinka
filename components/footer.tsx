"use client"
import React from 'react'
import Link from 'next/link'
import { UsersRound } from 'lucide-react'
import { MessageCircleIcon } from 'lucide-react'
import CreatePost from './Posts/CreatePost'
import { usePathname } from 'next/navigation'

import app from '@/dinka-config'
import { useSession } from 'next-auth/react'
export default function footer({ addpost, setIsLoading }: any) {
    const path = usePathname()
    const session: any = useSession()
    if (session.data === null) return <></>
    if (!app.footer.includes(path || "/")) return <></>
    return (
        <footer className="w-full fixed bottom-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md backdrop-saturate-[1.8] z-30 pb-3 pt-1 border-t border-gray-200 dark:border-zinc-700">
            <div className="flex w-full items-center justify-center surface-nav-element pointer-events-auto">
                <div className="flex h-[3.375rem] cursor-pointer items-center gap-[10px] rounded-full px-[10px] sm:gap-[2vw]">
                    <Link className={`relative flex  ${path === '/' ? "opacity-100" : "opacity-50"} h-full items-center gap-1.5 rounded-full px-4 hover:opacity-100 tablet:pl-3 text-gray-700 dark:text-gray-300`} href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 28 28" className="h-7 w-7">
                            <path fill="currentColor" d="M11.778 17.507V12.66a.903.903 0 0 1 1.391-.764l3.75 2.423a.91.91 0 0 1 0 1.528l-3.75 2.424a.903.903 0 0 1-1.391-.764">
                            </path>
                            <path stroke="currentColor" strokeWidth="2.33" d="M24 15.676v-1.992c0-1.683 0-2.526-.239-3.285a5.2 5.2 0 0 0-1.016-1.827c-.519-.603-1.234-1.047-2.665-1.936l-1.704-1.058c-1.588-.986-2.382-1.479-3.233-1.671a5.2 5.2 0 0 0-2.286 0c-.851.192-1.645.685-3.233 1.671L7.92 6.636c-1.43.889-2.146 1.333-2.665 1.936a5.2 5.2 0 0 0-1.016 1.827C4 11.16 4 12.001 4 13.685v1.991c0 2.904 0 4.356.565 5.465a5.2 5.2 0 0 0 2.266 2.266c1.11.565 2.561.565 5.465.565h3.408c2.904 0 4.356 0 5.465-.565a5.2 5.2 0 0 0 2.266-2.266C24 20.031 24 18.58 24 15.676Z">
                            </path>
                        </svg>
                        <span className="sr-only">Explore</span></Link>

                    <Link className={`relative text-2xl flex h-full items-center gap-1.5 rounded-full px-4 ${path === '/people' ? "opacity-100" : "opacity-50"} hover:opacity-100 tablet:pl-3 text-gray-700 dark:text-gray-300`} href="/people">
                        <UsersRound strokeWidth={2.5} /><span className="sr-only">People</span></Link>
                    <div className="relative flex h-full items-center gap-1.5 rounded-full opacity-50 hover:opacity-100 tablet:pl-3 px-1.5 py-2 text-gray-700 dark:text-gray-300">
                        <CreatePost addpost={addpost} setIsLoading={setIsLoading} />
                    </div>

                    <Link className={`relative text-2xl flex h-full items-center gap-1.5 rounded-full px-4 ${path === '/chats' ? "opacity-100" : "opacity-50"} hover:opacity-100 tablet:pl-3 text-gray-700 dark:text-gray-300`} href="/chats">
                        <MessageCircleIcon strokeWidth={2.5} /><span className="sr-only">Chats</span></Link>
                    <Link href={`/profile?id=${session.data?.user?.id}`}>
                        <button className="relative flex h-full items-center gap-1.5 rounded-full px-4 hover:opacity-100 tablet:pl-3 opacity-100">
                            <div className={`${path === '/profile' ? "opacity-100" : "opacity-50"} text-gray-700 dark:text-gray-300`} >
                                <div className="flex items-center" id="radix-:r9g:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                                    <img src={session.data?.user?.image || "https://imgs.search.brave.com/XLM6WQZOOjg4USteTMmA56CbGwKhBGOcLHTpbDno-xU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjE3/MTM4MjYzMy92ZWN0/b3IvdXNlci1wcm9m/aWxlLWljb24tYW5v/bnltb3VzLXBlcnNv/bi1zeW1ib2wtYmxh/bmstYXZhdGFyLWdy/YXBoaWMtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9WndPRjZOZk9S/MHpoWUM0NHhPWDA2/cnlJUEFVaER2QWFq/clBzYVo2djEtdz0"} alt="" className="rounded-full h-6 w-6 ring-2 ring-transparent dark:ring-zinc-600 scale-[1.2]" /></div>
                            </div></button>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
