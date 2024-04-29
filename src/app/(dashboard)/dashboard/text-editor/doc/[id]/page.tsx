"use client"

import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Editor from "@/components/editor/advanced-editor"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const TextEditor = () => {
    const params = useParams<any>()
    const docId = params.id
    const documentQuery = useQuery(api.documents.getSpecificDocument, { documentId: docId })
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState("")
    const [editorKey, setEditorKey] = useState(0); // Add a state for the key

    useEffect(() => {
        if (documentQuery?.content !== undefined) {
            setContent(documentQuery?.content)
            setEditorKey((prevKey) => prevKey + 1)
            setLoading(false)
        }
    }, [documentQuery?.content])

    return (
        <main className="flex flex-col items-center justify-between pr-10">
            <div className="flex flex-col p-6 max-w-xl w-full gap-6 rounded-md bg-transparent">
                <div className="flex justify-between">
                    <h1 className="text-[3rem] font-semibold">{loading ? (<Skeleton className="w-64 h-12 rounded-md"/>) : documentQuery?.name}</h1>
                </div>
                {loading ? (
                    <div>
                        <Skeleton className="w-72 h-8 rounded-md my-2"/>
                        <Skeleton className="w-48 h-8 rounded-md my-2"/>
                        <Skeleton className="w-96 h-8 rounded-md my-2"/>
                        <Skeleton className="w-56 h-8 rounded-md my-2"/>
                    </div>
                ) : (
                    <Editor textContent={content} docId={docId} key={editorKey}/>
                )}
            </div>
        </main>
    )
}

export default TextEditor
