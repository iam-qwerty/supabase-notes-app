import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Note } from "@/lib/types"

interface NoteDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { title: string; content: string }) => void
  initialData?: Note
  mode: "create" | "edit"
}

export function NoteDialog({ isOpen, onClose, onSave, initialData, mode }: NoteDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Update state when initialData changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setTitle(initialData?.title || "")
      setContent(initialData?.content || "")
    }
  }, [isOpen, initialData])

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setTitle("")
      setContent("")
    }
  }, [isOpen])

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return
    onSave({ title, content })
    setTitle("")
    setContent("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create New Note" : "Edit Note"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Textarea
              placeholder="Write your note here..."
              className="h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}