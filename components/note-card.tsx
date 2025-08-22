import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

interface NoteCardProps {
  id: string
  title: string
  content: string
  createdAt: Date
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function NoteCard({ id, title, content, createdAt, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card className="w-full card-hover note-card">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="text-xl font-semibold">{title}</span>
          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 whitespace-pre-wrap dark:text-gray-300">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(id)} className="button-hover">
          Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(id)} className="button-hover">
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
