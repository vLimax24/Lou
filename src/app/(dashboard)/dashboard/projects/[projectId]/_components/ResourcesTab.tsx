import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import AddResourceDialog from "./AddResourceDialog"
import Link from "next/link"

const RessourcesTab = ({ project }: { project: any }) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredRessources, setFilteredRessources] = useState<any[]>([])

    const ressources = project.ressources
    const removeResource = useMutation(api.projects.removeResourceFromProject)
    
    useEffect(() => {
        const filtered = ressources.filter((ressource: any) => {
            return ressource.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredRessources(filtered)
    }, [searchTerm, ressources])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Link Ressources</CardTitle>
                <CardDescription>
                    View and Manage your links and ressources regarding the project
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <Input placeholder="Search for Ressources" className="h-10 mr-4" value={searchTerm} onChange={(e) => {
                      setSearchTerm(e.target.value)
                    }}/>
                    <AddResourceDialog project={project}/>
                </div>
                {filteredRessources && filteredRessources.length === 0 ? (
                    <p>No ressources yet.</p>
                ) : (
                  <Table className="mt-5">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Link</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRessources?.map((ressource: any) => {
                                return (
                                    <TableRow key={ressource}>
                                        <TableCell className="font-medium">
                                            <Link href={ressource} target="_blank">
                                              {ressource}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="text-red-500" onClick={() => {
                                                      removeResource({ projectId: project._id, ressource: ressource })
                                                    }}>Remove</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}

            </CardContent>
        </Card>
    )
}

export default RessourcesTab
