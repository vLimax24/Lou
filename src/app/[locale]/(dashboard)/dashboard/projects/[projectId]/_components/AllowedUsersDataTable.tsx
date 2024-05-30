import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/convex/_generated/api"
import { useQuery, useMutation } from "convex/react"

const AllowedUsersDataTable = ({ project }: { project: any }) => {

    const allowedUsers = useQuery(api.projects.getAllowedUsers, { projectId: project._id })
    const removePersonFromProject = useMutation(api.projects.removePersonFromProject)
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                    View and Manage your collaborators of this project
                </CardDescription>
            </CardHeader>
            <CardContent>
                {allowedUsers?.length === 0 ? (
                    <p>No collaborators yet.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Email</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Last Seen
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allowedUsers?.map((user: any) => {
                                const convertLastSeen = new Date(user?.last_seen).toLocaleString()
                                return (
                                    <TableRow key={user._id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <Image
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={user?.profileImage}
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user?.username}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="default" className="bg-primaryGray hover:bg-primaryHoverGray">Collaborant</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{user?.email}</TableCell>
                                        <TableCell className="hidden md:table-cell">{convertLastSeen}</TableCell>
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
                                                    <DropdownMenuItem className="text-red-500" onClick={() => removePersonFromProject({ projectId: project._id, userId: user._id })}>Remove</DropdownMenuItem>
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

export default AllowedUsersDataTable
