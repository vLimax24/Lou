"use client"

import * as React from "react"
import {
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"


const data: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    color: "#FF5733",
    fromColor: "#FF5733",
    toColor: "#FF5733",
    grades: [
      { id: "1", grade: 5, subject: "Mathematics", date: "2023-09-15", type: "Test", topic: "Algebra" },
      { id: "2", grade: 6, subject: "Mathematics", date: "2023-10-05", type: "Quiz", topic: "Geometry" },
      { id: "3", grade: 4, subject: "Mathematics", date: "2023-10-20", type: "Test", topic: "Trigonometry" },
      { id: "4", grade: 5, subject: "Mathematics", date: "2023-11-10", type: "Quiz", topic: "Calculus" },
      { id: "5", grade: 5, subject: "Mathematics", date: "2023-11-25", type: "Test", topic: "Statistics" },
      { id: "6", grade: 5, subject: "Mathematics", date: "2023-12-10", type: "Quiz", topic: "Probability" },
    ],
    totalAverage: 5,
  },
  {
    id: "2",
    name: "Science",
    color: "#33FF57",
    fromColor: "#33FF57",
    toColor: "#33FF57",
    grades: [
      { id: "1", grade: 5, subject: "Science", date: "2023-09-20", type: "Test", topic: "Biology" },
      { id: "2", grade: 6, subject: "Science", date: "2023-10-10", type: "Quiz", topic: "Chemistry" },
      { id: "3", grade: 4, subject: "Science", date: "2023-10-25", type: "Test", topic: "Physics" },
      { id: "4", grade: 5, subject: "Science", date: "2023-11-15", type: "Quiz", topic: "Geology" },
      { id: "5", grade: 5, subject: "Science", date: "2023-11-30", type: "Test", topic: "Astronomy" },
      { id: "6", grade: 6, subject: "Science", date: "2023-12-20", type: "Quiz", topic: "Meteorology" },
    ],
    totalAverage: 5.166666666666667,
  },
  {
    id: "3",
    name: "History",
    color: "#5733FF",
    fromColor: "#5733FF",
    toColor: "#5733FF",
    grades: [
      { id: "1", grade: 4, subject: "History", date: "2023-09-25", type: "Test", topic: "Ancient Civilizations" },
      { id: "2", grade: 5, subject: "History", date: "2023-10-15", type: "Quiz", topic: "World Wars" },
      { id: "3", grade: 3, subject: "History", date: "2023-10-30", type: "Test", topic: "Renaissance" },
      { id: "4", grade: 4, subject: "History", date: "2023-11-20", type: "Quiz", topic: "Colonialism" },
      { id: "5", grade: 4, subject: "History", date: "2023-12-05", type: "Test", topic: "Industrial Revolution" },
      { id: "6", grade: 3, subject: "History", date: "2023-12-22", type: "Quiz", topic: "World War II" },
    ],
    totalAverage: 4,
  },
];

export type Subject = {
  id: string
  name: string
  color: string,
  fromColor: string,
  toColor: string,
  grades: Array<Grade>
  totalAverage: number
}

export type Grade = {
  id: string
  grade: number
  subject: string
  date: string
  type: string
  topic: string
}

export const columns: ColumnDef<Subject>[] = [
  {
    accessorKey: "name",
    header: "Subject",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "grades",
    header: "Grades",
    cell: ({ row }) => (
      <div className="flex">
        {row.original.grades && row.original.grades.length > 0 ? (
          row.original.grades.map((grade: Grade, index: number) => (
            <div key={grade.id}>
              {grade.grade}
              {index !== row.original.grades.length - 1 && ", "}
            </div>
          ))
        ) : (
          <div>No grades yet</div>
        )}
      </div>
    ),
  },
  {
    accessorKey: "totalAverage",
    header: () => <div className="text-right">Total Average</div>,
    cell: ({ row }) => {
      const totalAverage = parseFloat(row.getValue("totalAverage"));

      return <div className="text-right font-medium">{totalAverage}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const grade = row.original

      return (
        <div className="flex justify-end items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(grade.totalAverage))}
              >
                Copy total Average
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={`/dashboard/grade-sheet/${grade.name}`}>
            <Button variant={'outline'} className="ml-2">
              View All
            </Button>
          </Link>
        </div>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter subjects..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
