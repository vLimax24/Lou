"use client"

import React, { useState, useEffect } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Share2, Clipboard, Check, ChevronDown, Globe, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
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

const ShareDocument = ({ document } : { document: any }) => {
    const [currentURL, setCurrentURL] = useState("")
    const [copySuccess, setCopySuccess] = useState(false)
    const [accessDropdownOpen, setAccessDropdownOpen] = useState(false)
    const [popoverOpen, setPopoverOpen] = useState(false) // New state for managing popover open/close
    const [username, setUsername] = useState<string>("")
    
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
        return string.charAt(0).toUpperCase() +
            string.slice(1).toLowerCase()
    }

    const updateAccessType = (accessType: string) => {
        updateAccess({ documentId: docId, newAccessType: accessType })
    }

    const togglePopover = () => {
        setPopoverOpen(!popoverOpen)
    }

    return (
        <div>
            <Popover open={popoverOpen} onOpenChange={togglePopover}>
                <PopoverTrigger onClick={togglePopover} className="flex items-center justify-between px-4 py-2 bg-primaryGray rounded-md text-white hover:bg-primaryHoverGray transition-all ease-linear duration-300">
                    <p className="mr-2">Share</p>
                    <Share2 size={20}/>
                </PopoverTrigger>
                <PopoverContent className="p-4 sm:w-full mx-2 md:w-[30rem] flex flex-col">
                    <h1 className="text-xl font-semibold mb-2">Share &quot;{databaseDocument.name}&quot;</h1>
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
                                            <Button className="font-small h-8 rounded-xl bg-primaryGray hover:bg-primaryHoverGray hover:cursor-pointer" onClick={async () => await invitation({ documentId: docId, recieverUserId: user._id, senderUserId: myUser?._id, text: `${myUser?.username} invited you to join the document ${databaseDocument.name}`, date: new Date().toISOString(), senderImage: user.profileImage })}>Invite</Button>
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
                    <div className="flex items-center justify-between my-4">                        
                        <p>General Access</p>
                        <DropdownMenu onOpenChange={() => setAccessDropdownOpen(!accessDropdownOpen)}>
                            <DropdownMenuTrigger  className="flex bg-primaryGray text-white w-fit p-3 rounded-xl transition-all ease-linear duration-300">{capitalizeFirstLetter(databaseDocument.accessType)} <ChevronDown className={`size-6 ${accessDropdownOpen ? "rotate-180" : "rotate-0"}`}/></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Access Type</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex items-center" onClick={() => updateAccessType("RESTRICTED")}>
                                    <div className="p-2 rounded-full mr-2">
                                        
                                        <Lock className="size-5"/>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h1 className="font-semibold">Restricted</h1>
                                        <p className="text-sm">Only Users you invite can see the document</p>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center" onClick={() => updateAccessType("EVERYONE")}>
                                    <div className="p-2 rounded-full mr-2">
                                        <Globe className="size-5"/>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h1 className="font-semibold">Everyone</h1>
                                        <p className="text-sm">Everyone in the internet with the link can view it</p>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {databaseDocument.accessType === "EVERYONE" && (
                        <>
                            <div className="flex items-center">
                                <Input value={currentURL} contentEditable="false" className="rounded-r-none focus:outline-none"/>
                                <Button className="size-10 p-3 bg-primaryGray hover:bg-primaryHoverGray rounded-l-none" onClick={copyToClipboard}>
                                    {copySuccess ? <Check /> : <Clipboard />}
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
                                    <LinkedinIcon size={32} round={true}/>
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
                        </>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ShareDocument


