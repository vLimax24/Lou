import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import * as React from "react"

type SectionProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  addDialog?: any
};

const SubjectSection = ({
  children,
  title,
  description,
  addDialog
}: SectionProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          {addDialog && addDialog}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default SubjectSection
