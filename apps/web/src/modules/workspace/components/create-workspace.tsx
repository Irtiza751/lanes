import { api } from '@/api'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { slugify } from '@/shared/lib/slugify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

const workspaceSchema = z.object({
  name: z.string().max(20).min(1),
  description: z.string().max(255).optional(),
  slug: z.string().max(20).optional().default(''),
  logoUrl: z.string().optional().default(''),
  color: z.string().optional().default('#522fefff'),
})
type WorkspaceForm = z.infer<typeof workspaceSchema>

export function CreateWorkspace() {
  const navigate = useNavigate()

  const url = new URL(window.location.href)

  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: { name: '', description: '', slug: '' },
  })

  const onSubmit = (formData: WorkspaceForm) => {
    console.log(formData)
    creatWorkSpaceMutation.mutate(formData)
  }

  const creatWorkSpaceMutation = useMutation({
    mutationKey: ['create-workspace'],
    mutationFn: (data: WorkspaceForm) => api.post('/workspace', data),
    onSuccess: (response) => {
      console.log('Workspace created successfully:', response.data)
      navigate(`/home`)
    },
    onError: (error) => {
      console.error('Error creating workspace:', error)
    },
  })

  useEffect(() => {
    if (form.watch('name').length > 0) {
      form.setValue('slug', slugify(form.watch('name')))
    }
  }, [form.watch('name')])

  return (
    <main className="p-6">
      <header className="flex justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ChevronLeft /> Back to home
        </Button>
        <Button variant="ghost" className="flex-col items-start gap-0 py-3 h-13" size="lg">
          <small className="text-muted-foreground">Logged in as</small>
          <span className="text-md">irtiza@user.com</span>
        </Button>
      </header>
      <div className="w-lg mx-auto">
        <h3 className="text-center font-semibold text-3xl mt-4 mb-5">
          Create or join a new workspace
        </h3>
        <p className="text-center text-muted-foreground text-lg mt-2 mb-6">
          Start a new workspace for your projects or join an existing team to manage tasks together.
        </p>
        <Form {...form}>
          <form
            className="flex flex-col items-center gap-6"
            onSubmit={form.handleSubmit(onSubmit, console.log)}
          >
            <Card className="w-full">
              <CardContent className="flex flex-col gap-7">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Workspace name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Achme org" className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Add description..." className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-sm flex gap-2 items-center">
                  <span>Workspace URL:</span>
                  <span className="bg-secondary px-2 py-1 rounded">
                    {url.hostname}/{form.watch('slug')}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Button className="max-w-90 w-full h-12" size="lg">
              Create workspace
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
