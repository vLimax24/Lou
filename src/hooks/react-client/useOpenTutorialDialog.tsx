import { useEffect, useState } from "react"
import { useConvexAuth, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

const useOpenTutorialDialog = () => {
  const { isAuthenticated } = useConvexAuth()
  const [openDialog, setOpenDialog] = useState(false)

  const subjects = useQuery(
    api.subjects.getUserSubjects,
    !isAuthenticated ? "skip" : undefined
  )

  useEffect(() => {
    if (subjects && subjects.length === 0) {
      setOpenDialog(true)
    }
  }, [subjects])

  return { openDialog, setOpenDialog }
}

export default useOpenTutorialDialog
