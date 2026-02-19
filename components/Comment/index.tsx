import React, { useState } from 'react'
import Chats from "@/components/Chats"
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import useLongPress from '@/app/hooks/useLongPress'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

export default function index({ comments, id, postAuthorId }: any) {
  const [commentState, setComment] = useState(comments)
  const [selectedComment, setSelectedComment] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { data: session }: any = useSession()

  const addComment = (comment: any) => {
    setComment([comment, ...commentState])
  }

  const handleDeleteComment = async () => {
    if (!selectedComment) return

    try {
      const res = await fetch("/api/v1/comment/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId: selectedComment.commentId }),
      })

      if (res.ok) {
        setComment(commentState.filter((c: any) => c.commentId !== selectedComment.commentId))
        toast.success("Comment deleted")
      } else {
        const error = await res.json()
        toast.error(error.error || "Failed to delete comment")
      }
    } catch (err) {
      toast.error("An error occurred")
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedComment(null)
    }
  }

  return (
    <div className='p-2 sm:p-4'>
      <div className='flex flex-col space-y-4'>
        {commentState.length === 0 ? (
          <p className="text-center text-zinc-400 py-10 italic text-sm">
            No comments yet. Share your thoughts!
          </p>
        ) : (
          commentState.map((e: any) => (
            <CommentItem
              key={e.commentId || e.createdAt}
              comment={e}
              onLongPress={() => {
                if (session?.user?.id === e.userId || session?.user?.id === postAuthorId) {
                  setSelectedComment(e)
                  setIsDeleteDialogOpen(true)
                }
              }}
            />
          ))
        )}
      </div>
      <Chats id={id} addComment={addComment} />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your comment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteComment} className="bg-red-500 hover:bg-red-600 font-extrabold text-white rounded-full">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function CommentItem({ comment, onLongPress }: { comment: any; onLongPress: () => void }) {
  const longPressProps = useLongPress({
    onLongPress,
    delay: 500,
  })

  return (
    <div
      {...longPressProps}
      className='group relative flex gap-3 p-3 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-xl border border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer select-none active:scale-[0.98]'
    >
      <div className='w-9 h-9 rounded-full relative overflow-hidden border border-zinc-200 dark:border-zinc-800 flex-shrink-0'>
        <Image src={comment.user.image || comment.user.pic || "https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder"} fill={true} className="object-cover" alt='' />
      </div>
      <div className='flex-1 min-w-0 space-y-0.5'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-[13.5px] font-bold text-zinc-900 dark:text-zinc-100 truncate'>
            {comment.user.name}
          </span>
          <span className='text-[10px] text-zinc-400 font-medium whitespace-nowrap'>
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className='text-sm text-zinc-700 dark:text-zinc-400 leading-relaxed break-words'>
          {comment.content}
        </p>
      </div>
    </div>
  )
}
