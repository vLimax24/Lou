"use client"

import { LineChart, EventProps } from "@tremor/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useEffect, useState } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Grade {
  date: string
  subjectId: string
  subjectName: string
  grade: string
  badges: string[]
}

interface ChartData {
  month: string
  [key: string]: string
}

const ProgressSection = () => {
  const grades = useQuery(api.grades.getGrades) as Grade[] | undefined
  const [chartData, setChartData] = useState<any>([])
  const [uniqueBadges, setUniqueBadges] = useState<string[]>([])
  const [value, setValue] = useState<EventProps>(null)
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])

  useEffect(() => {
    if (!grades || grades.length === 0) return

    const aggregatedData: any = {}
    const badgesSet = new Set<string>()

    grades.forEach(grade => {
      const date = new Date(grade.date)
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
      const subject = grade.subjectName

      grade.badges.forEach(badge => badgesSet.add(badge))

      if (
        selectedBadges.length === 0 ||
        grade.badges.some(badge => selectedBadges.includes(badge))
      ) {
        if (!aggregatedData[month]) {
          aggregatedData[month] = {}
        }

        if (!aggregatedData[month][subject]) {
          aggregatedData[month][subject] = []
        }

        aggregatedData[month][subject].push(parseFloat(grade.grade))
      }
    })

    const result: ChartData[] = Object.entries(aggregatedData).map(
      ([month, subjects]: any) => {
        const averages: ChartData = { month }
        for (const [subject, gradesArray] of Object.entries<any>(subjects)) {
          const totalAverage =
            gradesArray.reduce((acc: any, curr: any) => acc + curr, 0) /
              gradesArray.length || 0
          averages[`Total Average ${subject}`] = totalAverage.toFixed(2)
        }
        return averages
      }
    )

    setChartData(result)
    setUniqueBadges(Array.from(badgesSet))
  }, [grades, selectedBadges])

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
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
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

  const subjects = grades
    ? Array.from(new Set(grades.map(grade => grade.subjectName)))
    : []
  const categories = subjects.map(subject => `Total Average ${subject}`)

  const handleBadgeClick = (badge: string) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(
        selectedBadges.filter(selectedBadge => selectedBadge !== badge)
      )
      setUniqueBadges([...uniqueBadges, badge])
    } else {
      setSelectedBadges([...selectedBadges, badge])
      setUniqueBadges(uniqueBadges.filter(uniqueBadge => uniqueBadge !== badge))
    }
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-4/5 md:w-3/5">
        {chartData.length > 0 && (
          <LineChart
            data={chartData}
            index="month"
            categories={categories}
            colors={[
              "indigo",
              "rose",
              "amber",
              "slate",
              "gray",
              "fuchsia",
              "zinc",
              "neutral",
              "stone",
              "red",
              "orange",
              "yellow",
              "lime",
              "emerald",
              "teal",
              "cyan",
              "sky",
              "blue",
              "indigo",
              "violet",
              "purple",
              "pink",
              "rose",
            ]}
            yAxisWidth={32}
            className="mt-6 block h-60"
            connectNulls={true}
            onValueChange={v => setValue(v)}
            showAnimation={true}
          />
        )}
        <div className="mt-8 flex flex-col items-start justify-between">
          <h1 className="text-3xl font-bold text-primaryGray">
            {removeQuotes(JSON.stringify(value?.categoryClicked))}
          </h1>
          <p>{formatDate(removeQuotes(JSON.stringify(value?.month)))}</p>
          {value && value.categoryClicked && (
            <div className="mt-4">
              {chartData.length > 0 && (
                <>
                  <p>
                    🎓 Grade:{" "}
                    {chartData.find(
                      (data: any) =>
                        data.month ===
                        removeQuotes(JSON.stringify(value?.month))
                    )?.[value.categoryClicked] || 0}
                  </p>
                  {chartData.length > 1 && (
                    <>
                      {chartData.findIndex(
                        (data: any) =>
                          data.month ===
                          removeQuotes(JSON.stringify(value?.month))
                      ) > 0 && (
                        <>
                          <p>
                            ⬅️ Previous Grade:{" "}
                            {chartData[
                              chartData.findIndex(
                                (data: any) =>
                                  data.month ===
                                  removeQuotes(JSON.stringify(value?.month))
                              ) - 1
                            ][value.categoryClicked] || 0}
                          </p>
                          <p>
                            {chartData.find(
                              (data: any) =>
                                data.month ===
                                removeQuotes(JSON.stringify(value?.month))
                            ) &&
                            chartData[
                              chartData.findIndex(
                                (data: any) =>
                                  data.month ===
                                  removeQuotes(JSON.stringify(value?.month))
                              ) - 1
                            ] &&
                            parseFloat(
                              chartData.find(
                                (data: any) =>
                                  data.month ===
                                  removeQuotes(JSON.stringify(value?.month))
                              )?.[value.categoryClicked] || 0
                            ) >
                              parseFloat(
                                chartData[
                                  chartData.findIndex(
                                    (data: any) =>
                                      data.month ===
                                      removeQuotes(JSON.stringify(value?.month))
                                  ) - 1
                                ][value.categoryClicked] || 0
                              )
                              ? `📈 You got better by ${parseFloat(chartData.find((data: any) => data.month === removeQuotes(JSON.stringify(value?.month)))?.[value.categoryClicked] || 0) - parseFloat(chartData[chartData.findIndex((data: any) => data.month === removeQuotes(JSON.stringify(value?.month))) - 1][value.categoryClicked] || 0)} GPA points than the previous month.`
                              : `📉 You got worse by ${parseFloat(chartData[chartData.findIndex((data: any) => data.month === removeQuotes(JSON.stringify(value?.month))) - 1][value.categoryClicked] || 0) - parseFloat(chartData.find((data: any) => data.month === removeQuotes(JSON.stringify(value?.month)))?.[value.categoryClicked] || 0)} GPA points than the previous month.`}
                          </p>
                          <p>
                            {chartData.find(
                              (data: any) =>
                                data.month ===
                                removeQuotes(JSON.stringify(value?.month))
                            ) &&
                            chartData[
                              chartData.findIndex(
                                (data: any) =>
                                  data.month ===
                                  removeQuotes(JSON.stringify(value?.month))
                              ) - 1
                            ] &&
                            parseFloat(
                              chartData.find(
                                (data: any) =>
                                  data.month ===
                                  removeQuotes(JSON.stringify(value?.month))
                              )?.[value.categoryClicked] || 0
                            ) ===
                              Math.max(
                                ...chartData.map((data: any) =>
                                  parseFloat(data[value.categoryClicked] || 0)
                                )
                              )
                              ? `🔥 Congratulations! This is the best month for ${removeQuotes(value.categoryClicked)} so far.`
                              : parseFloat(
                                    chartData.find(
                                      (data: any) =>
                                        data.month ===
                                        removeQuotes(
                                          JSON.stringify(value?.month)
                                        )
                                    )?.[value.categoryClicked] || 0
                                  ) ===
                                  Math.min(
                                    ...chartData.map((data: any) =>
                                      parseFloat(
                                        data[value.categoryClicked] || 0
                                      )
                                    )
                                  )
                                ? `⛔ Unfortunately, this is the worst month for ${removeQuotes(value.categoryClicked)} so far.`
                                : `👍 This month's performance for ${removeQuotes(value.categoryClicked)} is within the range of previous months.`}
                          </p>
                          <p>
                            ➡️ You have received grades for {chartData.length}{" "}
                            months for {removeQuotes(value.categoryClicked)} so
                            far.
                          </p>
                          <p>
                            ⚖️ The average grade for{" "}
                            {removeQuotes(value.categoryClicked)} over the
                            available months is{" "}
                            {(
                              chartData.reduce(
                                (acc: any, data: any) =>
                                  acc +
                                  parseFloat(data[value.categoryClicked] || 0),
                                0
                              ) / chartData.length
                            ).toFixed(2)}{" "}
                            GPA.
                          </p>
                          <p>
                            📊 The standard deviation of grades for{" "}
                            {removeQuotes(value.categoryClicked)} is{" "}
                            {Math.sqrt(
                              chartData.reduce(
                                (acc: any, data: any) =>
                                  acc +
                                  Math.pow(
                                    parseFloat(
                                      data[value.categoryClicked] || 0
                                    ) -
                                      chartData.reduce(
                                        (acc: any, data: any) =>
                                          acc +
                                          parseFloat(
                                            data[value.categoryClicked] || 0
                                          ),
                                        0
                                      ) /
                                        chartData.length,
                                    2
                                  ),
                                0
                              ) / chartData.length
                            ).toFixed(2)}
                            .
                          </p>
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Card className="ml-5 flex w-2/5 flex-col border-none bg-transparent p-5 shadow-none">
        <CardTitle className="mb-2">Filter graph by badges</CardTitle>
        <div className="flex flex-col">
          <div className="mt-3 flex">
            {uniqueBadges.map(badge => (
              <div
                key={badge}
                className="mr-3 flex items-center rounded-3xl border border-primaryGray py-1.5 pl-2 pr-4 hover:cursor-pointer"
                onClick={() => handleBadgeClick(badge)}
              >
                <Checkbox
                  id={badge}
                  className="mr-2 size-5 rounded-full"
                  checked={selectedBadges.includes(badge)}
                />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProgressSection
