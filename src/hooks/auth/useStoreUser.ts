import { useConvexAuth } from "convex/react"
import { useEffect, useState } from "react"
import { type Id } from "@/convex/_generated/dataModel"

const useStoreUser = () => {
  const { isAuthenticated } = useConvexAuth()
  // When this state is set we know the server
  // has stored the user.
  const [userId, setUserId] = useState<Id<"users"> | null>(null)
  // Call the `storeUser` mutation function to store
  // the current user in the `users` table and return the `Id` value.
  useEffect(() => {
    // If the user is not logged in don't do anything
    if (!isAuthenticated) {
      return
    }
    // Store the user in the database.
    // Recall that `storeUser` gets the user infor∏mation via the `auth`
    // object on the server. You don't need to pass anything manually here.
    return () => setUserId(null)
    // Make sure the effect reruns if the user logs in with
    // a different identity
  }, [isAuthenticated])
  return userId
}

export default useStoreUser