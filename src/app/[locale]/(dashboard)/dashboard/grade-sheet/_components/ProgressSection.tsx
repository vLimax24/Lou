"use client"

import { LineChart, EventProps } from "@tremor/react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useEffect, useState } from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslations } from "next-intl"
import {
  convertGPAToLetter,
  convertGPAToNumber,
  convertGPAToPercentage,
} from "@/utils/gpaCalculation"
import { Doc } from "@/convex/_generated/dataModel"

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

const ProgressSection = ({ user }: { user: Doc<"users"> }) => {
  const grades = useQuery(api.grades.getGrades) as Grade[] | undefined
  const gradingSystem = useQuery(api.countries.getGradingSystem, {
    countryId: user?.country,
  })

  const [chartData, setChartData] = useState<ChartData[]>([])
  const [uniqueBadges, setUniqueBadges] = useState<string[]>([])
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [chartValue, setChartValue] = useState<EventProps>(null)

  const t = useTranslations()

  useEffect(() => {
    if (!grades || grades.length === 0 || !gradingSystem) return

    const { aggregatedData, badgesSet } = aggregateGrades(
      grades,
      selectedBadges
    )
    const formattedChartData = formatChartData(aggregatedData, gradingSystem)

    setChartData(formattedChartData)
    setUniqueBadges(Array.from(badgesSet))
  }, [grades, selectedBadges, gradingSystem])

  const aggregateGrades = (grades: Grade[], selectedBadges: string[]) => {
    const aggregatedData: any = {}
    const cumulativeGrades: any = {}
    const badgesSet = new Set<string>()

    grades.forEach(grade => {
      const date = new Date(grade.date)
      const month = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`
      const subjectName = grade.subjectName

      grade.badges.forEach(badge => badgesSet.add(badge))

      if (
        selectedBadges.length === 0 ||
        grade.badges.some(badge => selectedBadges.includes(badge))
      ) {
        if (!cumulativeGrades[subjectName]) {
          cumulativeGrades[subjectName] = []
        }
        cumulativeGrades[subjectName].push(parseFloat(grade.grade))

        if (!aggregatedData[month]) {
          aggregatedData[month] = {}
        }

        for (const [subject, gradesArray] of Object.entries<any>(
          cumulativeGrades
        )) {
          if (!aggregatedData[month][subject]) {
            aggregatedData[month][subject] = []
          }
          aggregatedData[month][subject] = [...gradesArray]
        }
      }
    })

    return { aggregatedData, badgesSet }
  }

  const formatChartData = (aggregatedData: any, gradingSystem: string) => {
    return Object.entries(aggregatedData).map(([month, subjects]: any) => {
      const averages: ChartData = { month }
      for (const [subjectName, gradesArray] of Object.entries<any>(subjects)) {
        const totalAverage =
          gradesArray.reduce((acc: any, curr: any) => acc + curr, 0) /
            gradesArray.length || 0

        let convertedAverage
        switch (gradingSystem) {
          case "percentage":
            convertedAverage = convertGPAToPercentage(totalAverage)
            break
          case "numeric":
            convertedAverage = convertGPAToNumber(totalAverage, 4, 0.8)
            break
          case "letter":
            convertedAverage = totalAverage.toFixed(2)
            break
          default:
            convertedAverage = totalAverage
        }

        if (typeof convertedAverage === "number" && !isNaN(convertedAverage)) {
          averages[`Total Average ${subjectName}`] = convertedAverage.toFixed(2)
        } else {
          averages[`Total Average ${subjectName}`] = convertedAverage
        }
      }
      return averages
    })
  }

  const handleBadgeClick = (badge: string) => {
    setSelectedBadges(prevSelectedBadges =>
      prevSelectedBadges.includes(badge)
        ? prevSelectedBadges.filter(selectedBadge => selectedBadge !== badge)
        : [...prevSelectedBadges, badge]
    )
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
      return `${t(`Dashboard.grades.statistics.months.${monthName}`)} ${year}`
    }
    return ""
  }

  const subjects = grades
    ? Array.from(new Set(grades.map(grade => grade.subjectName)))
    : []
  const categories = subjects.map(subject => `Total Average ${subject}`)

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5 w-full md:col-span-3">
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
            onValueChange={setChartValue}
            showAnimation={true}
          />
        )}
        {gradingSystem === "letter" && (
          <p className="text-sm text-black">
            {t("Dashboard.grades.statistics.letterGradeMessage")}
          </p>
        )}
        {!chartValue && (
          <p className="text-sm text-gray-500">
            {t("Dashboard.grades.statistics.clickTip")}
          </p>
        )}
      </div>
      <BadgeFilterCard
        uniqueBadges={uniqueBadges}
        selectedBadges={selectedBadges}
        handleBadgeClick={handleBadgeClick}
        filterTitle={t("Dashboard.grades.statistics.filterTitle")}
      />
      <GradeStatistics
        chartValue={chartValue}
        chartData={chartData}
        t={t}
        formatDate={formatDate}
        removeQuotes={removeQuotes}
      />
    </div>
  )
}

const BadgeFilterCard = ({
  uniqueBadges,
  selectedBadges,
  handleBadgeClick,
  filterTitle,
}: {
  uniqueBadges: string[]
  selectedBadges: string[]
  handleBadgeClick: (badge: string) => void
  filterTitle: string
}) => (
  <Card className="col-span-5 ml-0 flex h-fit w-full flex-col border-none bg-transparent p-5 pl-0 shadow-none md:col-span-2 md:ml-5 md:pl-5">
    <CardTitle className="mb-2">{filterTitle}</CardTitle>
    <div className="flex flex-col">
      <div className="mt-3 grid grid-cols-3 gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {uniqueBadges.map(badge => (
          <div
            key={badge}
            className="flex items-center rounded-3xl border border-primaryGray py-1.5 pl-2 pr-4 hover:cursor-pointer"
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
)

const GradeStatistics = ({
  chartValue,
  chartData,
  t,
  formatDate,
  removeQuotes,
}: {
  chartValue: EventProps
  chartData: ChartData[]
  t: any
  formatDate: (dateString: string) => string
  removeQuotes: (str: string) => string
}) => (
  <div className="col-span-5 mt-5 flex w-full flex-col items-start justify-between">
    <h1 className="text-3xl font-bold text-primaryGray">
      {chartValue?.categoryClicked && (
        <>
          {JSON.stringify(chartValue?.categoryClicked)
            .replace(/"/g, "")
            .replace("Total Average ", "")}
        </>
      )}
    </h1>
    <p>{formatDate(removeQuotes(JSON.stringify(chartValue?.month)))}</p>
    {chartValue && chartValue.categoryClicked && (
      <div className="mt-2">
        {chartData.length > 0 && (
          <>
            <p>
              {t("Dashboard.grades.statistics.stats.grade", {
                grade:
                  chartData.find(
                    (data: any) =>
                      data.month ===
                      removeQuotes(JSON.stringify(chartValue?.month))
                  )?.[chartValue.categoryClicked] || "0",
              })}
            </p>
            {chartData.length > 1 && (
              <>
                {chartData.findIndex(
                  (data: any) =>
                    data.month ===
                    removeQuotes(JSON.stringify(chartValue?.month))
                ) > 0 &&
                chartData.find(
                  (data: any) =>
                    data.month ===
                    removeQuotes(JSON.stringify(chartValue?.month))
                ) &&
                chartData[
                  chartData.findIndex(
                    (data: any) =>
                      data.month ===
                      removeQuotes(JSON.stringify(chartValue?.month))
                  ) - 1
                ] &&
                parseFloat(
                  chartData.find(
                    (data: any) =>
                      data.month ===
                      removeQuotes(JSON.stringify(chartValue?.month))
                  )?.[chartValue.categoryClicked] || "0"
                ) >
                  parseFloat(
                    chartData[
                      chartData.findIndex(
                        (data: any) =>
                          data.month ===
                          removeQuotes(JSON.stringify(chartValue?.month))
                      ) - 1
                    ]?.[chartValue.categoryClicked] || "0"
                  ) ? (
                  <>
                    {t("Dashboard.grades.statistics.stats.gradeImprovement", {
                      gradeImprovement: parseFloat(
                        chartData.find(
                          (data: any) =>
                            data.month ===
                            removeQuotes(JSON.stringify(chartValue?.month))
                        )?.[chartValue.categoryClicked] || "0"
                      ),
                    })}
                  </>
                ) : (
                  <>
                    {t(
                      "Dashboard.grades.statistics.stats.gradeDisimprovement",
                      {
                        gradeDisimprovement:
                          parseFloat(
                            chartData[
                              chartData.findIndex(
                                (data: any) =>
                                  data.month ===
                                  removeQuotes(
                                    JSON.stringify(chartValue?.month)
                                  )
                              ) - 1
                            ]?.[chartValue.categoryClicked] || "0"
                          ) -
                          parseFloat(
                            chartData.find(
                              (data: any) =>
                                data.month ===
                                removeQuotes(JSON.stringify(chartValue?.month))
                            )?.[chartValue.categoryClicked] || "0"
                          ),
                      }
                    )}
                  </>
                )}
                <p>
                  {chartData.find(
                    (data: any) =>
                      data.month ===
                      removeQuotes(JSON.stringify(chartValue?.month))
                  ) &&
                  chartData[
                    chartData.findIndex(
                      (data: any) =>
                        data.month ===
                        removeQuotes(JSON.stringify(chartValue?.month))
                    ) - 1
                  ] &&
                  parseFloat(
                    chartData.find(
                      (data: any) =>
                        data.month ===
                        removeQuotes(JSON.stringify(chartValue?.month))
                    )?.[chartValue.categoryClicked] || "0"
                  ) ===
                    Math.max(
                      ...chartData.map((data: any) =>
                        parseFloat(data[chartValue.categoryClicked] || "0")
                      )
                    ) ? (
                    <>
                      {t("Dashboard.grades.statistics.stats.bestMonth", {
                        subject: removeQuotes(chartValue.categoryClicked),
                      })}
                    </>
                  ) : parseFloat(
                      chartData.find(
                        (data: any) =>
                          data.month ===
                          removeQuotes(JSON.stringify(chartValue?.month))
                      )?.[chartValue.categoryClicked] || "0"
                    ) ===
                    Math.min(
                      ...chartData.map((data: any) =>
                        parseFloat(data[chartValue.categoryClicked] || "0")
                      )
                    ) ? (
                    <>
                      {t("Dashboard.grades.statistics.stats.worstMonth", {
                        subject: removeQuotes(chartValue.categoryClicked),
                      })}
                    </>
                  ) : (
                    <>
                      {t("Dashboard.grades.statistics.stats.averageMonth", {
                        subject: removeQuotes(chartValue.categoryClicked),
                      })}
                    </>
                  )}
                </p>
                <p>
                  {t("Dashboard.grades.statistics.stats.gradeMonthCount", {
                    monthCount: chartData.length,
                    subject: removeQuotes(chartValue.categoryClicked),
                  })}
                </p>
                <p>
                  {t("Dashboard.grades.statistics.stats.averageGrade", {
                    subject: removeQuotes(chartValue.categoryClicked),
                    averageGrade: (
                      chartData.reduce(
                        (acc: any, data: any) =>
                          acc +
                          parseFloat(data[chartValue.categoryClicked] || "0"),
                        0
                      ) / chartData.length
                    ).toFixed(2),
                  })}
                </p>
              </>
            )}
          </>
        )}
      </div>
    )}
  </div>
)

const removeQuotes = (str: string) => {
  if (typeof str !== "string") {
    return str
  }
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1)
  }
  return str
}

export default ProgressSection
