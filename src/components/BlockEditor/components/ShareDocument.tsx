"use client"

import React, { useState, useEffect } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Share2, Link, Check, ChevronDown, Globe, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share"
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
} from "react-share"
import Image from "next/image"
import { toast } from "sonner"
import { Doc } from "@/convex/_generated/dataModel"

const ShareDocument = ({ document }: { document: any }) => {
  const [currentURL, setCurrentURL] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)
  const [accessDropdownOpen, setAccessDropdownOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [username, setUsername] = useState<string>("")
  const [invitedUsers, setInvitedUsers] = useState<string[]>([])

  const params = useParams<any>()
  const docId = params.id

  const updateAccess = useMutation(api.documents.updateAccessType)
  const searchUsers = useQuery(api.users.searchUsers, { searchTerm: username })
  const invitation = useMutation(api.notifications.createDocumentInvitation)
  const myUser = useQuery(api.users.getMyUser)

  const databaseDocument = document

  useEffect(() => {
    setCurrentURL(window.location.href)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentURL).then(() => {
      setCopySuccess(true)
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000)
    })
  }

  const capitalizeFirstLetter = (string: any) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const updateAccessType = (accessType: string) => {
    updateAccess({ documentId: docId, newAccessType: accessType })
  }

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen)
  }

  const inviteUser = async (userId: Id<"users">) => {
    if (
      !myUser ||
      !myUser._id ||
      !myUser.username ||
      !databaseDocument.name ||
      !databaseDocument.allowedUsers
    ) {
      toast.error("Required data is missing!")
      return
    }

    if (userId === myUser._id) {
      toast.error("You cannot invite yourself!")
      console.log("You cannot invite yourself.")
      return
    }

    if (databaseDocument.allowedUsers.includes(userId)) {
      toast.info("User is already in the document!")
      console.log("User is already in the document.")
      return
    }

    if (invitedUsers.includes(userId)) {
      toast.info("User has already been invited!")
      console.log("User has already been invited.")
      return
    }

    await invitation({
      documentId: docId,
      recieverUserId: userId,
      senderUserId: myUser._id,
      text: `${myUser.username} invited you to join the document ${databaseDocument.name}`,
      date: new Date().toISOString(),
      senderImage: myUser.profileImage,
    })
    setInvitedUsers([...invitedUsers, userId])
  }

  return (
    <div>
      <Popover open={popoverOpen} onOpenChange={togglePopover}>
        <PopoverTrigger
          onClick={togglePopover}
          className="flex items-center justify-between rounded-md border border-neutral-500/50 p-2 text-neutral-500 transition-all duration-300 ease-linear"
        >
          <Share2 size={20} />
        </PopoverTrigger>
        <PopoverContent className="mx-2 flex flex-col p-4 sm:w-full md:w-[35rem]">
          <h1 className="mb-2 text-xl font-semibold">
            Share &quot;{databaseDocument?.name || "Document"}&quot;
          </h1>
          <div className="mb-2 flex flex-col">
            <Input
              placeholder="Add People by Username"
              className="h-12"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <div className="flex flex-col">
              {searchUsers && username.length > 0 && searchUsers?.length > 0 ? (
                <div className="mt-2">
                  {searchUsers?.map((user: any) => (
                    <div
                      key={user._id}
                      className="my-1 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="flex size-10 items-center justify-center rounded-full">
                          <Image
                            src={user.profileImage}
                            alt={user.name || "User"}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{user.username}</p>
                        </div>
                      </div>
                      <div>
                        <Button
                          className={`font-small h-8 rounded-xl ${invitedUsers.includes(user._id) ? "bg-green-500 hover:bg-green-600" : "bg-primaryGray hover:bg-primaryHoverGray"} hover:cursor-pointer`}
                          onClick={() => inviteUser(user._id)}
                        >
                          {invitedUsers.includes(user._id) ? (
                            <Check className="mr-1 h-4 w-4" />
                          ) : null}
                          {invitedUsers.includes(user._id)
                            ? "Invited"
                            : "Invite"}
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
          <div className="flex items-center justify-between">
            <div className="my-4 flex flex-col items-start justify-between">
              <p className="mb-2">General Access</p>
              <DropdownMenu
                onOpenChange={() => setAccessDropdownOpen(!accessDropdownOpen)}
              >
                <DropdownMenuTrigger className="flex w-fit rounded-xl bg-primaryGray px-3 py-2 text-white transition-all duration-300 ease-linear">
                  Select{" "}
                  <ChevronDown
                    className={`ml-2 size-6 ${accessDropdownOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Access Type</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center"
                    onClick={() => updateAccessType("RESTRICTED")}
                  >
                    <div className="mr-2 rounded-full p-2">
                      <Lock className="size-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <h1 className="font-semibold">Restricted</h1>
                      <p className="text-sm">
                        Only Users you invite can see the document
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center"
                    onClick={() => updateAccessType("EVERYONE")}
                  >
                    <div className="mr-2 rounded-full p-2">
                      <Globe className="size-5" />
                    </div>
                    <div className="flex flex-col items-start">
                      <h1 className="font-semibold">Everyone</h1>
                      <p className="text-sm">
                        Everyone in the internet with the link can view it
                      </p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <h1 className="text-sm font-semibold">
                  {capitalizeFirstLetter(databaseDocument.accessType)}
                </h1>
                <p className="text-[0.7rem]">
                  {databaseDocument.accessType === "EVERYONE"
                    ? "Everyone in the internet with the link can view it"
                    : "Only Users you invite can see the document"}
                </p>
              </div>
              {databaseDocument.accessType === "EVERYONE" ? (
                <Globe className="ml-2 size-5" />
              ) : (
                <Lock className="ml-2 size-5" />
              )}
            </div>
          </div>
          {databaseDocument.accessType === "EVERYONE" && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  className="rounded-2xl bg-primaryGray hover:bg-primaryHoverGray"
                  onClick={copyToClipboard}
                >
                  {copySuccess ? (
                    <div className="flex py-4">
                      <p>Copied</p> <Check className="ml-2 size-5" />
                    </div>
                  ) : (
                    <div className="flex py-4">
                      <p>Copy Link</p> <Link className="ml-2 size-5" />
                    </div>
                  )}
                </Button>
              </div>
              <div className="mt-2">
                <EmailShareButton url={currentURL} className="mx-1">
                  <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <FacebookShareButton url={currentURL} className="mx-1">
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
                <LinkedinShareButton url={currentURL} className="mx-1">
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <RedditShareButton url={currentURL} className="mx-1">
                  <RedditIcon size={32} round={true} />
                </RedditShareButton>
                <TelegramShareButton url={currentURL} className="mx-1">
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
                <TwitterShareButton url={currentURL} className="mx-1">
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ShareDocument
