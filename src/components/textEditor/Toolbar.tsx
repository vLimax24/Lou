import { type Editor } from "@tiptap/react"
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2 } from "lucide-react"
import { Toggle } from "../ui/toggle"

type Props = {
    editor: Editor | null
}

const Toolbar = ({ editor }: Props) => {
    if(!editor) {
        return null
    }
  return (
    <div className="border border-input bg-transparent rounded-md">
        <Toggle
            size={"sm"}
            pressed={editor.isActive("heading")}
            onPressedChange={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
        >
            <Heading2 className="size-4"/>
        </Toggle>
        <Toggle
            size={"sm"}
            pressed={editor.isActive("bold")}
            onPressedChange={() =>
                editor.chain().focus().toggleBold().run()
            }
        >
            <Bold className="size-4"/>
        </Toggle>
        <Toggle
            size={"sm"}
            pressed={editor.isActive("italic")}
            onPressedChange={() =>
                editor.chain().focus().toggleItalic().run()
            }
        >
            <Italic className="size-4"/>
        </Toggle>
        <Toggle
            size={"sm"}
            pressed={editor.isActive("strike")}
            onPressedChange={() =>
                editor.chain().focus().toggleStrike().run()
            }
        >
            <Strikethrough className="size-4"/>
        </Toggle>
        <Toggle
            size={"sm"}
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
                editor.chain().focus().toggleBulletList().run()
            }
        >
            <List className="size-4"/>
        </Toggle>
        <Toggle
            size={"sm"}
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
                editor.chain().focus().toggleOrderedList().run()
            }
        >
            <ListOrdered className="size-4"/>
        </Toggle>
    </div>
  )
}

export default Toolbar