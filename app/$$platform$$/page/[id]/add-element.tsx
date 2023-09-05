import { PlusCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { PageEditor } from "./page-editor-provider";

export function AddElement(props: { pageEditor: PageEditor }) {


    return <div className="w-full flex justify-center">
        <Button variant="outline"
            onClick={() => {
                props.pageEditor.stage.content.push({
                    type: "text",
                })

                props.pageEditor.update()
            }}

        ><PlusCircle className="mr-2 h-4 w-4" />Add element</Button>
    </div>
}