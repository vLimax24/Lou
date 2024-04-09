import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Badge } from "@/components/ui/badge"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import type { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

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
            <Badge key={index} className="size-8 center mx-1 font-semibold" variant={'outline'}>
              {grade.grade}
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
      const totalAverage = parseFloat(row.getValue("totalAverage"));

      return <div className="text-right font-medium">{totalAverage}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const subject = row.original;

      return (
        <div className="flex justify-end items-center">
          <Link href={`/dashboard/subjects/${subject._id}`}>
            <Button variant={'outline'} className="ml-2">
              View All
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const subjectsQuery = useQuery(api.studentSubjects.getUserSubjects);
  const gradesQuery = useQuery(api.grades.getGrades);

  const subjects = subjectsQuery ?? [];
  const grades = gradesQuery ?? [];

  const subjectsWithGrades = useMemo(() => {
    return subjects.map((subject) => {
      const subjectGrades = grades.filter((grade) => grade.subjectId === subject._id);
      const totalAverage = subjectGrades.reduce((total, grade) => total + Number(grade.grade), 0) / subjectGrades.length;

      return {
        ...subject,
        grades: subjectGrades,
        totalAverage: isNaN(totalAverage) ? 0 : totalAverage,
      };
    });
  }, [subjects, grades]);

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
  });

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
                  );
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
  );
}
