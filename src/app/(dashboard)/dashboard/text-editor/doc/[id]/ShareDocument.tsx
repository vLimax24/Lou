"use client"

import React, { useState, useEffect } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Share2, Clipboard, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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

const ShareDocument = () => {
    const [currentURL, setCurrentURL] = useState("")
    const [copySuccess, setCopySuccess] = useState(false)

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

    return (
        <div>
            <Popover>
                <PopoverTrigger className="flex items-center justify-between px-4 py-2 bg-primaryGray rounded-md text-white hover:bg-primaryHoverGray transition-all ease-linear duration-300">
                    <p className="mr-2">Share</p>
                    <Share2 size={20}/>
                </PopoverTrigger>
                <PopoverContent className="p-4 sm:w-full mx-2 md:w-[30rem] flex flex-col">
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
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ShareDocument
