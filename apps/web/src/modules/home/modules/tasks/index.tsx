import { TaskCard, TaskPriorety } from './components/task-card'
import { TaskLane } from './components/task-lane'

const workflow = [
  { key: 'todo', name: 'Todo', color: 'white' },
  { key: 'in-progress', name: 'In-Progress', color: 'yellow' },
  { key: 'code-review', name: 'Code Review', color: 'purple' },
  { key: 'testing', name: 'Testing', color: 'orange' },
]

const tasks = [
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
] as const

export default function Tasks() {
  const getTaskByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="p-4 h-[calc(100vh-60px)]">
      {/* board */}
      <div className="flex gap-2 h-full w-[calc(100vw-350px)] overflow-x-auto">
        {workflow.map((lane) => (
          <TaskLane key={lane.key} lane={lane} count={getTaskByStatus(lane.key).length}>
            {getTaskByStatus(lane.key).map((task) => (
              <TaskCard isDraging={false} key={task.id} id={task.id} title={task.title} status={task.status}>
                <TaskPriorety priorety={task.priorety} />
              </TaskCard>
            ))}
          </TaskLane>
        ))}
      </div>
    </div>
  )
}
