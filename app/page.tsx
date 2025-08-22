import { NotesInterface } from "@/components/notes-interface"
import { createNote } from "./actions"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <NotesInterface createNote={createNote}/>
      </div>
    </main>
  )
}
