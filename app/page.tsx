import { NotesInterface } from "@/components/notes-interface"
import { fetchUserNotes, updateNote, deleteNote } from "./actions"
import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const notes = user ? await fetchUserNotes(user.id) : []

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <NotesInterface
          initialNotes={notes}
        />
      </div>
    </main>
  )
}
