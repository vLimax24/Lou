import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { toast } from "sonner"
import { Id } from "@/convex/_generated/dataModel"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Check } from "lucide-react"
import AllowedUsersDataTable from "./AllowedUsersDataTable"

const CollaboratorsTab = ({ project }: { project: any }) => {
    const [invitedUsers, setInvitedUsers] = useState<string[]>([])
    const [username, setUsername] = useState<string>("")


    const invitation = useMutation(api.notifications.createProjectInvitation)
    const myUser = useQuery(api.users.getMyUser)
    const searchUsers = useQuery(api.users.searchUsers, { searchTerm: username })

    const inviteUser = async (userId: Id<"users">) => {
        switch (true) {
            case userId === myUser?._id:
                toast.error("You cannot invite yourself!")
                console.log("You cannot invite yourself.")
                return
            case project.allowedUsers.includes(userId):
                toast.info("User is already in the document!")
                console.log("User is already in the document.")
                return
            case invitedUsers.includes(userId):
                toast.info("User has already been invited!")
                console.log("User has already been invited.")
                return
            default:
                await invitation({
                    projectId: project._id,
                    recieverUserId: userId,
                    senderUserId: myUser?._id,
                    text: `${myUser?.username} invited you to join the team project ${project.name}`,
                    date: new Date().toISOString(),
                    senderImage: myUser?.profileImage
                })
                setInvitedUsers([...invitedUsers, userId])
        }
    }


  return (
    <div>
        <div className="flex flex-col mb-2">
            <Input placeholder="Add People by Username" className="h-12" value={username} onChange={e => setUsername(e.target.value)}/>
            <div className="flex flex-col">
                {searchUsers && username.length > 0 && searchUsers?.length > 0 ? (
                    <div className="mt-2">
                        {searchUsers?.map((user: any) => (
                            <div key={user._id} className="flex my-1 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="size-10 rounded-full flex items-center justify-center">
                                        <Image src={user.profileImage} alt={user.name} width={30} height={30} className="rounded-full" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{user.username}</p>
                                    </div>
                                </div>
                                <div>
                                    <Button className={`font-small h-8 rounded-xl ${invitedUsers.includes(user._id) ? "bg-green-500 hover:bg-green-600" : "bg-primaryGray hover:bg-primaryHoverGray"} hover:cursor-pointer`} onClick={() => inviteUser(user._id)}>
                                        {invitedUsers.includes(user._id) ? <Check className="w-4 h-4 mr-1" /> : null}
                                        {invitedUsers.includes(user._id) ? "Invited" : "Invite"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {username.length > 0 && (
                            <div className="mt-2">
                                <p>No users found!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
        <AllowedUsersDataTable project={project}/>
    </div>
  )
}

export default CollaboratorsTab
