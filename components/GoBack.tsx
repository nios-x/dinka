import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function GoBack() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors group mb-2"
    >
      <div className="p-2 bg-white/50 dark:bg-zinc-800/50 rounded-full group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 transition-all shadow-sm">
        <ChevronLeft size={20} />
      </div>
      <span className="text-sm font-medium">Back</span>
    </button>
  )
}
