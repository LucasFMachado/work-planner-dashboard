import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchTasks } from '@/lib/actions/task.actions'

export default async function ProductsPage() {
  const { tasks } = await fetchTasks(1, 30)

  return (
    <section className="main-section">
      <h1 className="mb-4">Tasks:</h1>
      <Link href="/dashboard/tasks/create">Create</Link>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Important</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task._id}>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.important}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}
