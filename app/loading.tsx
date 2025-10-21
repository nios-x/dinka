import { Loader2 } from 'lucide-react'
import React from 'react'


export default function loading() {
  return (
      <div className="flex items-center justify-center h-screen text-zinc-600">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading...
      </div>
  )
}
