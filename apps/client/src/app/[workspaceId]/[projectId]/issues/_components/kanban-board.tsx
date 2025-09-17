"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
} from "@/components/ui/kanban";
import { Button } from "@/components/ui/button";
import { Plus, UserCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  priority: "low" | "medium" | "high";
  description?: string;
  assignee?: string;
  assigneeAvatar?: string;
  dueDate?: string;
}

const COLUMN_TITLES: Record<string, string> = {
  backlog: "Backlog",
  inProgress: "In Progress",
  testing: "Testing",
  review: "Review",
  done: "Done",
};

interface TaskCardProps
  extends Omit<React.ComponentProps<typeof KanbanItem>, "value" | "children"> {
  task: Task;
  asHandle?: boolean;
}

function TaskCard({ task, asHandle, ...props }: TaskCardProps) {
  const router = useRouter();
  const { workspaceId, projectId } = useParams();

  const cardContent = (
    <div
      onClick={() =>
        router.push(`/${workspaceId}/${projectId}/issues/${task.id}`)
      }
      className="rounded-sm border-input/20 border bg-kanban-card p-3 shadow-xs"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-muted-foreground uppercase">{task.id}</span>
        {task.assignee && (
          <div className="flex items-center gap-1">
            <Avatar className="size-5">
              <AvatarImage src={task.assigneeAvatar} />
              <AvatarFallback>
                <UserCircle className="text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="line-clamp-1 font-medium text-sm">{task.title}</span>
        </div>
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          {task.dueDate && (
            <time className="text-[10px] whitespace-nowrap">
              {task.dueDate}
            </time>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <KanbanItem value={task.id} {...props}>
      {asHandle ? (
        <KanbanItemHandle cursor={false}>{cardContent}</KanbanItemHandle>
      ) : (
        cardContent
      )}
    </KanbanItem>
  );
}

interface TaskColumnProps
  extends Omit<React.ComponentProps<typeof KanbanColumn>, "children"> {
  tasks: Task[];
  isOverlay?: boolean;
}

function TaskColumn({ value, tasks, isOverlay, ...props }: TaskColumnProps) {
  return (
    <KanbanColumn
      value={value}
      {...props}
      className="group rounded-sm bg-kanban-column p-2.5 min-w-[350px]"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold">{COLUMN_TITLES[value]}</span>
          <span>{tasks.length}</span>
        </div>
      </div>
      <KanbanColumnContent
        value={value}
        className="flex flex-col gap-2.5 p-0.5"
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} asHandle={!isOverlay} />
        ))}
        <Button
          className="rounded opacity-0 group-hover:opacity-100 shadow-none bg-transparent transition"
          size="sm"
          variant="outline"
        >
          <Plus />
        </Button>
      </KanbanColumnContent>
    </KanbanColumn>
  );
}

export default function Component() {
  const [columns, setColumns] = React.useState<Record<string, Task[]>>({
    backlog: [
      {
        id: "TAS-1",
        title: "Add authentication",
        priority: "high",
        assignee: "John Doe",
        assigneeAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
        // dueDate: "Jan 10, 2025",
      },
      {
        id: "TAS-2",
        title: "Create API endpoints",
        priority: "medium",
        assignee: "Jane Smith",
        assigneeAvatar: "https://randomuser.me/api/portraits/women/2.jpg-12",
        // dueDate: "Jan 15, 2025",
      },
      {
        id: "TAS-3",
        title: "Write documentation",
        priority: "low",
        assignee: "Bob Johnson",
        assigneeAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
        // dueDate: "Jan 20, 2025",
      },
    ],
    inProgress: [
      {
        id: "TAS-4",
        title: "Design system updates",
        priority: "high",
        assignee: "Alice Brown",
        assigneeAvatar: "https://randomuser.me/api/portraits/women/4.jpg-12",
        dueDate: "Aug 25, 2025",
      },
    ],
    testing: [
      {
        id: "TAS-5",
        title: "Implement dark mode",
        priority: "medium",
        assignee: "Charlie Wilson",
        assigneeAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
        dueDate: "Aug 25, 2025",
      },
    ],
    done: [
      {
        id: "TAS-7",
        title: "Setup project",
        priority: "high",
        assignee: "Eve Davis",
        assigneeAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
        dueDate: "Sep 25, 2025",
      },
      {
        id: "TAS-8",
        title: "Initial commit",
        priority: "low",
        assignee: "Frank White",
        assigneeAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
        dueDate: "Sep 20, 2025",
      },
    ],
  });

  return (
    <Kanban
      value={columns}
      onValueChange={setColumns}
      getItemValue={(item) => item.id}
      className="h-full"
    >
      <KanbanBoard className="h-full">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <TaskColumn key={columnValue} value={columnValue} tasks={tasks} />
        ))}
      </KanbanBoard>
      <KanbanOverlay>
        <div className="rounded-md bg-muted/60 size-full" />
      </KanbanOverlay>
    </Kanban>
  );
}
