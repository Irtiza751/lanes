"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from "@/components/ui/kanban";
import { useState } from "react";

type KanbanBoardProps = {
  issues: {
    id: string;
    name: string;
    column: string;
    owner?: {
      image: string;
      name: string;
    };
  }[];
  columns: { id: string; name: string; color: string }[];
};

export function IssuesBoard({ issues, columns }: KanbanBoardProps) {
  return (
    <KanbanProvider
      className="min-w-[1800]"
      columns={columns}
      data={issues}
      onDataChange={console.log}
    >
      {(column) => (
        <KanbanBoard
          className="bg-kanban-column"
          id={column.id}
          key={column.id}
        >
          <KanbanHeader>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span>{column.name}</span>
            </div>
          </KanbanHeader>
          <KanbanCards id={column.id}>
            {(feature: (typeof issues)[number]) => (
              <KanbanCard
                className="bg-kanban-card"
                column={column.id}
                id={feature.id}
                key={feature.id}
                name={feature.name}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="m-0 flex-1 font-medium text-sm">
                      {feature.name}
                    </p>
                  </div>
                  {feature.owner && (
                    <Avatar className="h-4 w-4 shrink-0">
                      <AvatarImage src={feature.owner.image} />
                      <AvatarFallback>
                        {feature.owner.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
}
