"use client"

import { LineChart, EventProps } from "@tremor/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useEffect, useState } from "react"

interface Grade {
    date: string
    subjectId: string
    subjectName: string
    grade: string
}

interface ChartData {
    month: string
    [key: string]: string
}

const ProgressSection = () => {
    const grades = useQuery(api.grades.getGrades) as Grade[] | undefined
    const [chartData, setChartData] = useState<ChartData[]>([])
    const [value, setValue] = useState<EventProps>(null)

    useEffect(() => {
        if (!grades || grades.length === 0) return

        const aggregatedData: any = {}

        grades.forEach(grade => {
            const date = new Date(grade.date)
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
            const subject = grade.subjectName

            if (!aggregatedData[month]) {
                aggregatedData[month] = {}
            }

            if (!aggregatedData[month][subject]) {
                aggregatedData[month][subject] = []
            }

            aggregatedData[month][subject].push(parseFloat(grade.grade))
        })

        const result: ChartData[] = Object.entries(aggregatedData).map(([month, subjects]:any) => {
            const averages: ChartData = { month }
            for (const [subject, gradesArray] of Object.entries<any>(subjects)) {
                const totalAverage = gradesArray.reduce((acc:any, curr:any) => acc + curr, 0) / gradesArray.length
                averages[`Total Average ${subject}`] = totalAverage.toFixed(2)
            }
            return averages
        })

        setChartData(result)
    }, [grades])


    const removeQuotes = (str: string) => {
        if (typeof str !== "string") {
            return str
        }
        if (str.startsWith('"') && str.endsWith('"')) {
            return str.slice(1, -1)
        }
        return str
    }

    const formatDate = (dateString: string) => {
        if (typeof dateString === "string") {
            const [year, monthStr] = dateString.split("-")
            if (!year || !monthStr) {
                return ""
            }
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
            const monthIndex = parseInt(monthStr, 10) - 1
            if (monthIndex < 0 || monthIndex > 11) {
                return ""
            }
            const monthName = months[monthIndex]
            return `${monthName} ${year}`
        }
        return ""
    }
    
    

    const subjects = grades ? Array.from(new Set(grades.map(grade => grade.subjectName))) : []
    const categories = subjects.map(subject => `Total Average ${subject}`)

    return (
        <div className="w-3/5">
            {chartData.length > 0 && (
                <LineChart
                    data={chartData}
                    index="month"
                    categories={categories}
                    colors={["indigo", "rose", "amber", "slate", "gray", "fuchsia", "zinc", "neutral", "stone", "red", "orange", "yellow", "lime", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "pink", "rose"]}// Ensure the number of colors matches the number of categories
                    yAxisWidth={32}
                    className="mt-6 block h-60"
                    connectNulls={true}
                    onValueChange={(v) => setValue(v)}
                />
            )}
            <div className="flex items-start flex-col justify-between mt-8">
                <h1 className="text-3xl font-bold text-primaryGray">{removeQuotes(JSON.stringify(value?.categoryClicked))}</h1>
                <p>{formatDate(removeQuotes(JSON.stringify(value?.month)))}</p>

            </div>
        </div>
    )
}

export default ProgressSection
