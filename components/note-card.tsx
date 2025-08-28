import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { updateNote, deleteNote } from "@/app/actions"
import { Note } from "@/lib/types"
import { useRouter } from "next/navigation"

interface NoteCardProps extends Note {
  onEdit: () => void
}

export function NoteCard({ id, title, content, created_at, onEdit }: NoteCardProps) {
  
  const router = useRouter()

  const handleDelete = async () => {
    await deleteNote(id)
    router.refresh()
  }
  
  return (
    <Card className="w-full card-hover note-card">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="text-xl font-semibold">{title}</span>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(created_at, { addSuffix: true })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 whitespace-pre-wrap dark:text-gray-300">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onEdit} className="button-hover">
          Edit
        </Button>
        <Button 
          variant="destructive" 
          // onClick={async () => await deleteNote(id)} 
          onClick={handleDelete} 
          className="button-hover"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
