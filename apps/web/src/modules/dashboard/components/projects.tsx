import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'

export function Projects() {
  const projects = [
    {
      id: '1',
      name: 'Project Alpha',
      description: 'This is the first project.',
      status: 'In Progress',
    },
    {
      id: '2',
      name: 'Project Beta',
      description: 'This is the second project.',
      status: 'Completed',
    },
    {
      id: '3',
      name: 'Project Gamma',
      description: 'This is the third project.',
      status: 'Not Started',
    },
  ]

  return (
    <div>
      <h2 className="text-lg font-semibold">Projects</h2>
      <Table>
        <TableCaption>List of all you projects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell className="text-right">{project.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
