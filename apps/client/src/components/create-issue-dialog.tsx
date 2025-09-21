"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import {
  ChevronRight,
  Ellipsis,
  Paperclip,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SquareSlash,
  Terminal,
} from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Editor } from "./ui/editor";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useParams } from "next/navigation";
import { useIssue } from "@/hooks/use-issue";

export default function CreateIssueDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { projectId } = useParams();
  const { createIssueMutation } = useIssue();
  // console.log(params);

  const createIssue = async () => {
    // console.log({ title, description });
    try {
      await createIssueMutation.mutateAsync({
        title,
        description,
        projectKey: projectId as string,
        priority: "low",
      });
      setShow(false);
    } catch (error) {}
  };

  useEffect(() => {
    return () => {
      setTitle("");
      setDescription("");
    };
  }, []);

  return (
    <Dialog open={show}>
      <DialogTrigger onClick={() => setShow(true)} asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-15 translate-y-0 bg-card sm:max-w-3xl rounded-md p-0"
      >
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-sm font-medium flex gap-1 items-center">
            <Badge
              variant="secondary"
              className="border border-input rounded-sm h-7"
            >
              <SquareSlash />
              <span className="font-bold">
                {(projectId as string).toUpperCase()}
              </span>
            </Badge>
            <ChevronRight className="size-3 text-muted-foreground" />
            <span className="text-muted-foreground">New issue</span>
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 space-y-2">
          <Input
            autoFocus
            placeholder="Issue title"
            className="bg-transparent dark:bg-transparent border-none lg:text-xl font-semibold focus-visible:ring-0 p-0 h-auto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="relative">
            <Editor
              value={description}
              namespace="issue-description"
              placeholder="Enter some text..."
              onChange={(desc) => setDescription(desc)}
            />
          </div>
        </div>
        <div className="px-4">
          <Priorities />
        </div>
        <DialogFooter className="border-t border-input px-4 py-3">
          <Button size="sm-icon" variant="ghost">
            <Paperclip className="size-4" />
          </Button>
          <div className="flex items-center gap-2 flex-1 justify-end">
            <div className="flex items-center space-x-2">
              <Switch
                className="h-4 w-6"
                thumbClasses="size-3"
                id="create-more"
              />
              <Label
                htmlFor="create-more"
                className="text-xs text-muted-foreground"
              >
                Create more
              </Label>
            </div>
            <Button
              onClick={createIssue}
              className="rounded text-xs h-7"
              size="sm"
              disabled={!title}
            >
              Create issue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const Priorities = () => {
  const options = [
    {
      icon: Ellipsis,
      name: "No Priority",
    },
    {
      icon: SignalLow,
      name: "Low",
    },
    {
      icon: SignalMedium,
      name: "Medium",
    },
    {
      icon: SignalHigh,
      name: "High",
    },
  ];

  const [priority, setPriority] = useState(options[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="text-xs h-6 rounded border"
        >
          <priority.icon /> {priority.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm" align="start">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={() => setPriority(option)}
            className="text-xs"
          >
            <option.icon /> {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
