"use client"

import { PlusCircle } from "lucide-react";
import { useContext } from "react";
import { Button } from "~/components/ui/button";
import { pageEditorContext } from "./page-editor-provider";
import { Page } from "~/services/pages";
import { AddElement } from "./add-element";

export function PageContentEditor(props: { page: Page }) {
    const pageEditor = useContext(pageEditorContext)!

    return <>
        <AddElement
            pageEditor={pageEditor}
        />
    </>
}