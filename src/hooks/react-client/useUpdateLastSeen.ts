import { useEffect } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

const useUpdateLastSeenOnline = () => {
  const userQuery = useQuery(api.users.getMyUser)
  const updateLastSeenOnline = useMutation(api.users.updateLastSeenOnline)

  useEffect(() => {
    if (userQuery) {
      const intervalId = setInterval(() => {
        updateLastSeenOnline({ id: userQuery?._id })
      }, 30000)

      return () => clearInterval(intervalId)
    }
  }, [userQuery, updateLastSeenOnline])

  return userQuery
}

export default useUpdateLastSeenOnline
