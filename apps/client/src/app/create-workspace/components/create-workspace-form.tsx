"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { motion } from "motion/react";

const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

type CreateWorkspaceForm = z.infer<typeof createWorkspaceSchema>;

export default function CreateWorkspaceForm() {
  const form = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = (data: CreateWorkspaceForm) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-md"
      >
        <motion.div
          initial={{
            opacity: 0,
            y: -50,
            // scale: 0,
            // transform: "translateY(-100px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            // scale: 1,
            // transform: "translateY(0)",
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-none bg-sidebar shadow-none">
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace name</FormLabel>
                    <FormControl>
                      <Input className="h-12" placeholder="Achme" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace URL</FormLabel>
                    <FormControl>
                      <div
                        className={cn(
                          "selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex items-center h-12 w-full min-w-0 rounded border bg-accent px-3 py-1 text-little transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                        )}
                      >
                        <span className="text-muted-foreground">
                          lanes.com/
                        </span>
                        <input {...field} className="flex-1 outline-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground">
                This is a mandatory step, before joining the system user must
                need to create or join a workspace.
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Button size="lg" className="w-full max-w-xs mx-auto block">
            Create workspace
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
