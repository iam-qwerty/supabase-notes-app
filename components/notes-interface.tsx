"use client"

import { Button } from "@/components/ui/button"
import { NoteCard } from "@/components/note-card"
import { NoteDialog } from "@/components/note-dialog"
import { useState, useOptimistic, startTransition } from "react"
import { Note } from "@/lib/types"
import { updateNote, createNote, deleteNote } from "@/app/actions"

interface NotesInterfaceProps {
  initialNotes?: Note[]
}

// The first pipe "|" is just a formatting convention some devs use to make the list of union members more readable (especially when they’re multi-line).
// It doesn’t change how the code works — it’s like putting a bullet point before the first line in a list just for symmetry.
type OptimisticAction = 
  | { type: 'add'; note: Note }
  | { type: 'update'; id: string; updates: Partial<Note> }
  | { type: 'delete'; id: string }

function notesReducer(state: Note[], action: OptimisticAction): Note[] {
  switch (action.type) {
    case 'add':
      return [action.note, ...state]
    case 'update':
      return state.map(note => 
        note.id === action.id 
          ? { ...note, ...action.updates }
          : note
      )
    case 'delete':
      return state.filter(note => note.id !== action.id)
    default:
      return state
  }
}

export function NotesInterface({ initialNotes }: NotesInterfaceProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  
  const [notes, setOptimisticNotes] = useOptimistic<Note[], OptimisticAction>(
    initialNotes ?? [],
    notesReducer
  )

  const handleCreate = async (data: Pick<Note, "title" | "content">) => {
    // Create optimistic note with temporary values
    const optimisticNote: Note = {
      user_id: "",
      id: `temp-${Date.now()}`, // Temporary ID for optimistic update
      title: data.title ?? "",
      content: data.content ?? "",
      created_at: new Date().toISOString()
    }
    
    // Apply optimistic update
    startTransition(() => {
      setOptimisticNotes({ type: 'add', note: optimisticNote })
    })
    
    try {
      const formData = new FormData()
      formData.append('title', data.title ?? "")
      formData.append('content', data.content ?? "")
      
      await createNote(formData)      
    } catch (error) {
      // useOptimistic will automatically revert on error if server action throws
      console.error('Failed to create note:', error)
    }
  }

  const handleUpdate = async (data: { title: string; content: string }) => {
    if (!editingNote) return
    
    // Apply optimistic update
    startTransition(() => {
      setOptimisticNotes({ 
        type: 'update', 
        id: editingNote.id, 
        updates: { 
          title: data.title, 
          content: data.content 
        } 
      })
    })
    
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      
      await updateNote(editingNote.id, formData)
    } catch (error) {
      console.error('Failed to update note:', error)
      // Note: useOptimistic will revert automatically if the server action throws
    }
  }

  const handleDelete = async (id: string) => {
    // Apply optimistic update
    startTransition(() => {
      setOptimisticNotes({ type: 'delete', id })
    })
    
    try {
      await deleteNote(id)
    } catch (error) {
      console.error('Failed to delete note:', error)
      // Note: useOptimistic will revert automatically if the server action throws
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
            onDelete={() => handleDelete(note.id)}
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