"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ChevronRight, SquareSlash, Terminal } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Editor } from "./ui/editor";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

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
        className="top-15 translate-y-0 bg-card sm:max-w-3xl rounded-md p-0"
      >
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-sm font-medium flex gap-1 items-center">
            <Badge
              variant="secondary"
              className="border border-input rounded-sm h-7"
            >
              <SquareSlash />
              <span className="font-bold">TAS</span>
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
          />
          <div className="relative">
            <Editor
              namespace="issue-description"
              placeholder="Enter some text..."
            />
          </div>
        </div>

        <DialogFooter className="border-t border-input px-4 py-3">
          <div className="flex items-center gap-2">
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
            <Button className="rounded text-xs h-7" size="sm">
              Create issue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
