import React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownProps {
  value: string;
  setValue: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ setValue }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Change</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setValue("ASSIGNMENT")}>
            Assignment
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setValue("EXAM")}>
            Exam
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setValue("OTHER")}>
            Other
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
