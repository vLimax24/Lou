import { cn } from "@/lib/utils"
import * as React from "react"

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )

export { Skeleton }
