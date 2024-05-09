import { Badge } from "@/components/ui/badge"
import { LabelsArray } from "@/types/label"



const LabelBadge = ({ labels }: { labels: LabelsArray }) => {
  return (
    labels.length > 0 &&
    labels.map(
      label =>
        label && (
          <Badge
            style={{ backgroundColor: label.color }}
            className="m-2 text-white"
            key={label._id}
          >
            {label.name}
          </Badge>
        )
    )
  )
}

export default LabelBadge
