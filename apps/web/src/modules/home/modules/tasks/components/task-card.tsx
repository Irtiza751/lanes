import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Box, Columns2, Columns3, Columns4, GripVertical } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/shared/lib/cn'
import { Link } from 'react-router'

interface TaskCardProps {
  title: string
  id: string
  status: string
  isDragging: boolean
  children?: React.ReactNode
}

export function TaskCard({ title, id, children, isDragging = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn('border bg-accent shadow-sm p-2 mx-2 mb-2 rounded-md hover:bg-accent/80', {
        'opacity-50': isDragging,
      })}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical size={16} className="text-muted-foreground" />
          </div>
          <span className="text-muted-foreground text-xs font-semibold">{id.toUpperCase()}</span>
        </div>
        <Avatar className="size-5">
          <AvatarImage src="https://github.com/Irtiza751.png" />
          <AvatarFallback className="bg-orange-500 text-xs">MI</AvatarFallback>
        </Avatar>
      </div>
      <h4 className="text-base font-semibold my-2">
        <Link to={`tasks/${id}`} className="hover:underline">
          {title}
        </Link>
      </h4>
      <div className="flex gap-2 items-center">{children}</div>
    </div>
  )
}

const icons = {
  low: <Columns2 />,
  medium: <Columns3 />,
  high: <Columns4 />,
}

interface TaskPrioretyProps {
  priorety: keyof typeof icons
}

export function TaskPriorety({ priorety }: TaskPrioretyProps) {
  return (
    <Button variant="outline" className="bg-transparent text-muted-foreground" size="sicon">
      {icons[priorety]}
    </Button>
  )
}

export function TaskEpic({ epic }: { epic: string }) {
  return (
    <Button variant="outline" size="sm" className="h-6 items-center bg-transparent text-muted-foreground">
      <Box size={5} />
      {epic}
    </Button>
  )
}