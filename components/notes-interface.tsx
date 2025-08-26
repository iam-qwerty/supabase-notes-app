"use client"

import { Button } from "@/components/ui/button"
import { NoteCard } from "@/components/note-card"
import { NoteDialog } from "@/components/note-dialog"
import { useState } from "react"
import { Note } from "@/lib/types"
import { fetchUserNotes, updateNote, deleteNote, createNote } from "@/app/actions"

interface NotesInterfaceProps {
  initialNotes?: Note[]
}

export function NotesInterface({ initialNotes }: NotesInterfaceProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes || [])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  // Add handlers for create and update
  const handleCreate = async (data: { title: string; content: string }) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    await createNote(formData)
  }

  const handleUpdate = async (data: { title: string; content: string }) => {
    if (!editingNote) return
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('content', data.content)
    await updateNote(editingNote.id, formData)
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