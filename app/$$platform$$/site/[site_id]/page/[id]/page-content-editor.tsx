"use client"

import { PlusCircle } from "lucide-react";
import { useContext } from "react";
import { Button } from "~/components/ui/button";
import { pageEditorContext } from "./page-editor-provider";

export function PageContentEditor(props: { page: any }) {
    const pageEditor = useContext(pageEditorContext)

    return <>
        <div className="w-full flex justify-center">
            <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4" />Add element</Button>
        </div>
    </>
}