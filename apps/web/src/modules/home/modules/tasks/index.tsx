import { useState } from 'react'
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { TaskCard, TaskEpic, TaskPriorety } from './components/task-card'
import { TaskLane } from './components/task-lane'

const workflow = [
  { key: 'todo', name: 'Todo', color: 'white' },
  { key: 'in-progress', name: 'In-Progress', color: 'yellow' },
  { key: 'code-review', name: 'Code Review', color: 'purple' },
  { key: 'testing', name: 'Testing', color: 'orange' },
]

const initialTasks = [
  {
    id: 'TAS-1',
    title: 'Some task title',
    status: 'todo',
    priorety: 'low',
  },
  {
    id: 'TAS-2',
    title: 'Some task title that is in progress',
    status: 'in-progress',
    priorety: 'high',
  },
  {
    id: 'TAS-3',
    title: 'Some task title 3 in progress',
    status: 'in-progress',
    priorety: 'medium',
  },
  {
    id: 'TAS-4',
    title: 'Some task title',
    status: 'todo',
    priorety: 'low',
  },
  {
    id: 'TAS-5',
    title: 'Some task title 5 code review',
    status: 'code-review',
    priorety: 'low',
  },
  {
    id: 'TAS-6',
    title: 'Some task title',
    status: 'testing',
    priorety: 'low',
  },
  {
    id: 'TAS-7',
    title: 'Some task title',
    status: 'todo',
    priorety: 'high',
  },
]

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeId, setActiveId] = useState<string | null>(null)

  const getTaskByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    setActiveId(null) // Reset activeId when drag ends

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Find the task being dragged
    const activeTask = tasks.find((task) => task.id === activeId)
    if (!activeTask) return

    // Check if dropped over a lane
    const targetLane = workflow.find((lane) => lane.key === overId)
    if (targetLane) {
      // Move task to new lane
      setTasks((prev) =>
        prev.map((task) =>
          task.id === activeId ? { ...task, status: targetLane.key } : task
        )
      )
      return
    }

    // Check if dropped over another task
    const overTask = tasks.find((task) => task.id === overId)
    if (overTask) {
      // Ensure tasks are in the same lane for reordering
      if (activeTask.status === overTask.status) {
        const oldIndex = tasks.findIndex((task) => task.id === activeId)
        const newIndex = tasks.findIndex((task) => task.id === overId)
        setTasks((prev) => arrayMove(prev, oldIndex, newIndex))
      } else {
        // Move to new lane and place at the end
        setTasks((prev) =>
          prev.map((task) =>
            task.id === activeId ? { ...task, status: overTask.status } : task
          )
        )
      }
    }
  }

  const activeTask = tasks.find((task) => task.id === activeId)

  return (
    <div className="p-4 h-[calc(100vh-60px)]">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-2 h-full w-[calc(100vw-350px)] overflow-x-auto">
          {workflow.map((lane) => (
            <SortableContext
              key={lane.key}
              items={getTaskByStatus(lane.key).map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <TaskLane lane={lane} count={getTaskByStatus(lane.key).length}>
                {getTaskByStatus(lane.key).map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    status={task.status}
                    isDragging={activeId === task.id}
                  >
                    <TaskPriorety priorety={task.priorety as any} />
                    <TaskEpic epic='User authentication' />
                  </TaskCard>
                ))}
              </TaskLane>
            </SortableContext>
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <TaskCard
              id={activeTask.id}
              title={activeTask.title}
              status={activeTask.status}
              isDragging={true}
            >
              <TaskPriorety priorety={activeTask.priorety as any} />
              <TaskEpic epic='Test 123' />
            </TaskCard>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}