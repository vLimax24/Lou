import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { subjectColors } from '@/utils/subjectColors'
import Link from "next/link"
import { GradeBarChart } from '@/components/dashboard/home/GradeSheet/BarChart'


type CardProps = React.ComponentProps<typeof Card>;

export default function GradeSheetCard({ className, ...props }: CardProps) {

  return (
    <GradeBarChart />
  )
}