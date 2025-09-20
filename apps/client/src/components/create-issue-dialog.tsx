"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { SquareSlash, Terminal } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Editor } from "./ui/editor";

export default function CreateIssueDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-[25%] bg-card p-4 sm:max-w-3xl rounded-md"
      >
        <DialogHeader>
          <DialogTitle className="text-sm font-medium flex gap-2 items-center">
            <Badge
              variant="secondary"
              className="border border-input rounded-sm h-7"
            >
              <SquareSlash />
              <span className="font-bold">TAS</span>
            </Badge>
            <span className="text-muted-foreground">New issue</span>
          </DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Issue title"
          className="bg-transparent dark:bg-transparent border-none lg:text-xl font-semibold focus-visible:ring-0 p-0 h-auto"
        />
        {/* <Textarea
          placeholder="Add description..."
          className="bg-transparent dark:bg-transparent border-none lg:text-md focus-visible:ring-0 p-0"
        /> */}
        <div className="relative">
          <Editor
            namespace="issue-description"
            placeholder="Enter some text..."
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
