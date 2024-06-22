import { Badge } from "@/components/ui/badge"
import { LabelsArray } from "@/types/label"

const LabelBadge = ({ labels }: { labels: LabelsArray }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {labels.length > 0 &&
        labels.map(
          label =>
            label && (
              <Badge
                style={{ backgroundColor: label.color }}
                className="text-white"
                key={label._id}
              >
                {label.name}
              </Badge>
            )
        )}
    </div>
  )
}

export default LabelBadge
