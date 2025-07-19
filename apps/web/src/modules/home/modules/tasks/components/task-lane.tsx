import { Badge } from '@/shared/components/ui/badge'
import { Circle } from 'lucide-react'
import { useDroppable } from '@dnd-kit/core'

interface TaskLaneProps {
  children: React.ReactNode
  count?: number
  lane: {
    name: string
    color: string
    key: string
  }
}

export function TaskLane({ children, lane, count }: TaskLaneProps) {
  const { setNodeRef } = useDroppable({
    id: lane.key,
  })

  return (
    <div
      ref={setNodeRef}
      key={lane.name}
      className={`bg-secondary/10 shrink-0 max-w-sm min-w-xs w-full rounded-md`}
    >
      <header className="flex gap-2 items-center justify-between px-4 pb-2 pt-3 text-md font-bold">
        <div className="flex gap-2 items-center">
          <Circle size={12} fill={lane.color} color={lane.color} />
          <h4>{lane.name}</h4>
        </div>
        <Badge size="count" variant="secondary">
          {count || 0}
        </Badge>
      </header>
      <div className="px-2">{children}</div>
    </div>
  )
}
