import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import { Button } from './ui/button'

interface CreateTaskProps {
  children: React.ReactNode
}

export function CreateTask({ children }: CreateTaskProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-3xl sm:max-w-3xl w-full">
        <DialogHeader className="flex-row items-center gap-2">
          <DialogTitle>New task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input className="text-xl outline-none font-semibold" placeholder="Task title" />
          <TextEditor />
        </div>
        <DialogFooter className="justify-start">
          <Button>Create task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Add description...',
      }),
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-50 py-2',
      },
    },
  })

  if (editor) {
    return <EditorContent editor={editor} />
  }
  return null
}
