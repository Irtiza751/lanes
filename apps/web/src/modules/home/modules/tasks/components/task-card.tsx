import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { Columns2, Columns3, Columns4 } from 'lucide-react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/shared/lib/cn';

interface TaskCardProps {
  title: string
  id: string
  status: string
  isDraging: boolean
  children?: React.ReactNode
}

export function TaskCard({ title, id, children, isDraging = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={cn("border bg-accent shadow-sm p-2 mx-2 mb-2 rounded-md", {
      'opacity-50 rotate-2 scale-105': isDraging
    })}
      {...attributes}
      {...listeners}
      >
      <div className="flex justify-between">
        <span className="text-muted-foreground text-xs font-semibold">{id.toUpperCase()}</span>
        <Avatar className="size-5">
          <AvatarImage src="https://github.com/Irtiza751.png" />
          <AvatarFallback className="bg-orange-500 text-xs">MI</AvatarFallback>
        </Avatar>
      </div>
      <h4 className="text-base font-semibold mb-2">{title}</h4>
      {children}
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
