import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Badge } from "@/components/ui/badge"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { convertGPAToLetter, convertGPAToNumber, convertGPAToPercentage, calculateGPAStatistics } from "@/utils/gpaCalculation"

export const columns: ColumnDef<any>[] = [
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
          row.original.grades.map((grade: any, index: number) => (
            <Badge key={index} className="size-8 center mx-1 font-semibold" variant={"outline"}>
              {grade.convertedGrade}
            </Badge>
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
      const totalAverage:any = row.getValue("totalAverage")

      return <div className="text-right font-medium">{totalAverage || ""}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const subject = row.original

      return (
        <div className="flex justify-end items-center">
          <Link href={`/dashboard/subjects/${subject._id}`}>
            <Button variant={"outline"} className="ml-2">
              View All
            </Button>
          </Link>
        </div>
      )
    },
  },
]

export function DataTable() {
  const [sorting] = useState<SortingState>([])
  const [columnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const subjectsQuery = useQuery(api.studentSubjects.getUserSubjects)
  const gradesQuery = useQuery(api.grades.getGrades)

  const addTotalAverage = useMutation(api.studentSubjects.addTotalAverage)
  const studentSubjects = useQuery(api.studentSubjects.getStudentSubjects)

  const user = useQuery(api.users.getMyUser)
  const countryId:any = user?.country
  const country:any = useQuery(api.countries.getSpecificCountry, { countryId })

  const subjectsWithGrades = useMemo(() => {
    const subjects = subjectsQuery ?? []
    const grades = gradesQuery ?? []

    const convertedGrades = grades.map((grade) => {
      let convertedGrade: any
      const baseGPA = 4
      const gpaIncrement = baseGPA / (country?.possibleGrades?.length - 1)
      
      if (country?.system === "Number") {
        convertedGrade = convertGPAToNumber(Number(grade.grade), baseGPA, gpaIncrement, country.possibleGrades)
      } else if (country?.system === "Letter") {
        convertedGrade = convertGPAToLetter(Number(grade.grade), baseGPA, gpaIncrement, country.possibleGrades)
      } else if (country?.system === "Percentage") {
        convertedGrade = convertGPAToPercentage(Number(grade.grade))
      }
    
      return {
        topic: grade.topic,
        date: grade.date,
        subjectId: grade.subjectId,
        userId: grade.userId,
        convertedGrade: convertedGrade
      }
    })    

    const addTotalAverageToDB = async (totalAverage: string, subjectId: any) => {
      let studentSubjectId: any
      studentSubjects?.map((studentSubject) => {
        if (subjectId === studentSubject.subjectId) {
          studentSubjectId = studentSubject._id
        }
      })
      await addTotalAverage({
        totalAverage: totalAverage,
        studentSubjectId: studentSubjectId,
      })
    }

    return subjects.map((subject) => {
      const subjectGrades = convertedGrades.filter((grade) => grade.subjectId === subject._id)
      const unconvertedSubjectGrades = grades.filter((grade) => grade.subjectId === subject._id)
      const gradeFiltered = unconvertedSubjectGrades.map((grade) => {
        return Number(Number(grade.grade).toFixed(2))
      })
      const totalAverage = calculateGPAStatistics(gradeFiltered)
      let finalAverage:any = totalAverage
      const baseGPA = 4
      const gpaIncrement = baseGPA / (country?.possibleGrades?.length - 1)
      if (country?.system === "Number") {
        finalAverage = convertGPAToNumber(totalAverage, baseGPA, gpaIncrement, country.possibleGrades)
        
      } else if (country?.system === "Letter") {
        finalAverage = convertGPAToLetter(totalAverage, baseGPA, gpaIncrement, country.possibleGrades)
      } else if (country?.system === "Percentage") {
        finalAverage = convertGPAToPercentage(totalAverage)
      }
      const dbAverage = finalAverage?.toString()
      addTotalAverageToDB(dbAverage, subject._id)

      return {
        ...subject,
        grades: subjectGrades,
        totalAverage: finalAverage,
      }
    })
  }, [subjectsQuery, gradesQuery, addTotalAverage, studentSubjects, country?.possibleGrades, country?.system])

  const table = useReactTable({
    data: subjectsWithGrades,
    columns,
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
