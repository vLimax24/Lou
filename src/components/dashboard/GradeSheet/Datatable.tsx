import { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Badge } from "@/components/ui/badge"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { calculateGPAStatistics } from "@/utils/gpaCalculation"
import { useTranslations } from "next-intl"
import { Doc } from "@/convex/_generated/dataModel"

export const DataTable = ({ user } : { user: Doc<"users"> }) => {
  const t = useTranslations()
  const [sorting] = useState<SortingState>([])
  const [columnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const subjectsQuery = useQuery(api.studentSubjects.getUserSubjects)
  const gradesQuery = useQuery(api.grades.getGrades)

  const addTotalAverage = useMutation(api.studentSubjects.addTotalAverage)
  const studentSubjects = useQuery(api.studentSubjects.getStudentSubjects)
  const countryId = user?.country
  const country = useQuery(api.countries.getSpecificCountry, { countryId })

  const subjectsWithGrades = useMemo(() => {
    const subjects = subjectsQuery ?? []
    const grades = gradesQuery ?? []

    const convertedGrades = grades.map(grade => {
      let convertedGrade: string | number = grade.grade

      if (country?.gradingSystem === "numeric") {
        const numericGradingRules = country.gradingRules?.numeric ?? []
        const gradeObject = numericGradingRules.find(
          scale => Number(grade.grade) === scale.gpa
        )
        if (gradeObject) {
          convertedGrade = gradeObject.grade.toString()
        }
      } else if (country?.gradingSystem === "letter") {
        const letterGradingRules = country.gradingRules?.letter ?? []
        const gradeObject = letterGradingRules.find(
          scale => grade.grade === scale.gpa.toString()
        )
        if (gradeObject) {
          convertedGrade = gradeObject.grade
        }
      } else if (country?.gradingSystem === "percentage") {
        convertedGrade = ((Number(grade.grade) * 100) / 4).toFixed(2)
      }

      return {
        ...grade,
        convertedGrade,
      }
    })

    return subjects.map(subject => {
      const subjectGrades = convertedGrades.filter(
        grade => grade.subjectId === subject._id
      )
      const totalAverage = calculateGPAStatistics(
        subjectGrades.map(g => Number(g.convertedGrade))
      )

      return {
        ...subject,
        grades: subjectGrades,
        totalAverage,
      }
    })
  }, [
    subjectsQuery,
    gradesQuery,
    country?.gradingSystem,
    country?.gradingRules,
  ])

  useEffect(() => {
    const updateTotalAverages = async () => {
      for (const subject of subjectsWithGrades) {
        if (subject.totalAverage !== undefined) {
          const studentSubject = studentSubjects?.find(
            ss => ss.subjectId === subject._id
          )
          if (studentSubject) {
            await addTotalAverage({
              totalAverage: subject.totalAverage.toString(),
              studentSubjectId: studentSubject._id,
            })
          }
        }
      }
    }

    updateTotalAverages()
  }, [subjectsWithGrades, studentSubjects, addTotalAverage])

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: () => (
        <div className="text-left">
          {t("Dashboard.grades.progress.dataTable.tableHeadSubjects")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "grades",
      header: () => (
        <div className="text-left">
          {t("Dashboard.grades.progress.dataTable.tableHeadGrades")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="grid w-fit grid-cols-3 gap-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {row.original.grades && row.original.grades.length > 0 ? (
            row.original.grades.map((grade: any, index: number) => (
              <Badge
                key={index}
                className="center size-6 text-[0.7rem] font-semibold md:size-8 md:text-[0.9rem]"
                variant={"outline"}
              >
                {grade.convertedGrade}
              </Badge>
            ))
          ) : (
            <div>{t("Dashboard.grades.progress.noGrades")}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "totalAverage",
      header: () => (
        <div className="text-left">
          {t("Dashboard.grades.progress.dataTable.tableHeadTotalAverage")}
        </div>
      ),
      cell: ({ row }) => {
        const totalAverage: string = row.getValue("totalAverage")

        return (
          <div className="w-fit text-right font-medium">
            {totalAverage || ""}
          </div>
        )
      },
    },
  ]

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
    <div className="max-w-[100vw]">
      <div className="rounded-md border">
        <Table className="max-w-[100vw]">
          <TableHeader className="max-w-[100vw]">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
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
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
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
