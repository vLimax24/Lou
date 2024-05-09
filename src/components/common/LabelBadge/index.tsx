import { Badge } from "@/components/ui/badge"
import { LabelsArray } from "@/types/label"



const LabelBadge = ({ labels }: { labels: LabelsArray }) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {
        labels.length > 0 &&
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
        )
      
      }
    </div>
  )
}

export default LabelBadge
