"use client"

import { Button } from "@/components/ui/button"
import { NoteCard } from "@/components/note-card"
import { NoteDialog } from "@/components/note-dialog"
import { useState } from "react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
}

export function NotesInterface({createNote}: {createNote: (formData: FormData) => Promise<void>}) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const handleCreateNote = ({ title, content }: { title: string; content: string }) => {
    const newNote: Note = {
      id: Math.random().toString(36).substring(7),
      title,
      content,
      createdAt: new Date(),
    }
    setNotes((prev) => [newNote, ...prev])
  }

  const handleEditNote = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId)
    if (note) {
      setEditingNote(note)
      setIsDialogOpen(true)
    }
  }

  const handleUpdateNote = ({ title, content }: { title: string; content: string }) => {
    if (!editingNote) return
    setNotes((prev) =>
      prev.map((note) =>
        note.id === editingNote.id ? { ...note, title, content } : note
      )
    )
    setEditingNote(null)
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId))
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
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
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
        onSave={editingNote ? handleUpdateNote : handleCreateNote}
        initialData={editingNote || undefined}
        mode={editingNote ? "edit" : "create"}
      />
    </>
  )
}