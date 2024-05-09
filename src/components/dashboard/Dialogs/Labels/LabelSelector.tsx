"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { Loader2 } from "lucide-react"
import { useState } from "react"

type Props = {
  entityId: Id<"notes"> | Id<"events"> | Id<"documents">;
};

export const LabelSelector = ({ entityId }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const allLabels = useQuery(api.labels.getLabels)
  const entityLabels = useQuery(api.entityLabels.getLabelsForEntity, {
    entityId,
  })
  const attachLabel = useMutation(api.entityLabels.addLabelToEntity)
  const dettachLabel = useMutation(api.entityLabels.removeLabelFromEntity)

  // Create a set of item label IDs for quick lookup
  const itemLabelIds = new Set(entityLabels?.map(label => label.labelId))

  const handleLabelClick = async (labelId: Id<"labels">) => {
    if (itemLabelIds.has(labelId)) {
      await dettachLabel({entityId, labelId})
    } else {
      await attachLabel({entityId, labelId})
    }
  }

  const filteredLabels = allLabels?.filter(label =>
    label.name.toLowerCase().includes(searchTerm)
  )

  return (
    <div className="flex flex-col items-center justify-center">
      <Input
        placeholder="Label"
        onChange={e => setSearchTerm(e.target.value.toLowerCase())}
      />
      <div className="flex h-full w-full flex-col items-center justify-center">
        {filteredLabels ? (
          filteredLabels.map(label => (
            <Button
              key={label._id}
              onClick={() => handleLabelClick(label._id)}
            >
              {label.name}
              {itemLabelIds.has(label._id) && " ✅"}
            </Button>
          ))
        ) : (
          <Loader2 className="h-10 w-10 animate-spin" />
        )}
      </div>
    </div>
  )
}
