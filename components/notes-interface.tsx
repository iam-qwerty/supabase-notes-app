"use client"

import { Button } from "@/components/ui/button"
import { NoteCard } from "@/components/note-card"
import { NoteDialog } from "@/components/note-dialog"
import { useState, useOptimistic, startTransition } from "react"
import { Note } from "@/lib/types"
import { updateNote, createNote } from "@/app/actions"

interface NotesInterfaceProps {
  initialNotes?: Note[]
}

export function NotesInterface({ initialNotes }: NotesInterfaceProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  
  const [notes, setOptimisticNotes] = useOptimistic<Note[], Note>(
    initialNotes ?? [],
    (state, newNote: Note) => [newNote, ...state] // Add to beginning
  )

  const handleCreate = async (data: Pick<Note, "title" | "content">) => {
    // Create optimistic note with temporary values
    const optimisticNote: Note = {
      user_id: "",
      id: "",
      title: data.title ?? "",
      content: data.content ?? "",
      created_at: new Date().toISOString()
    }
    
    // Apply optimistic update
    startTransition(() => {setOptimisticNotes(optimisticNote)})
    
    try {
      const formData = new FormData()
      formData.append('title', data.title ?? "")
      formData.append('content', data.content ?? "")
      
      await createNote(formData)      
    } catch (error) {
      //  useOptimistic will automatically revert on error if server action throws
      console.error('Failed to create note:', error)
    }
  }

  const handleUpdate = async (data: { title: string; content: string }) => {
    if (!editingNote) return
    
    // For updates, you might want to use regular state since
    // useOptimistic is primarily designed for additions
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    
    try {
      await updateNote(editingNote.id, formData)
    } catch (error) {
      console.error('Failed to update note:', error)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Create Note</Button>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            {...note}
            onEdit={() => {
              setEditingNote(note)
              setIsDialogOpen(true)
            }}
          />
        ))}
        {notes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No notes yet. Create one to get started!
          </div>
        )}
      </div>

      <NoteDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false)
          setEditingNote(null)
        }}
        onSave={editingNote ? handleUpdate : handleCreate}
        initialData={editingNote || undefined}
        mode={editingNote ? "edit" : "create"}
      />
    </>
  )
}