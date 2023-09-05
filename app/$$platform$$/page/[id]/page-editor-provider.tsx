"use client"

import { createContext, useState } from "react"
import type { Page } from "~/services/pages"


type Site = any

export type PageEditor = {
    update: () => void
    versions: Site[]
    index: number
    stage: Page
    undo: () => void
}

export const pageEditorContext = createContext<PageEditor | null>(null)

export function PageEditorProvider(props: { children: React.ReactNode, initialSite: Site }) {
    const [context, setContext] = useState<PageEditor>({
        update,
        stage: props.initialSite,
        versions: [],
        index: 0,
        undo,
    })

    function update() {
        setContext(ctx => {
            ctx.index++
            ctx.versions[ctx.index] = ctx.stage

            ctx.versions.splice(ctx.index + 1)

            return {
                ...ctx,
                versions: ctx.versions ?? [],
                update,
            }
        })
    }

    function undo() {
        setContext(ctx => {
            ctx.index--

            return {
                ...ctx,
                stage: ctx.versions[ctx.index] ?? props.initialSite,
                versions: ctx.versions ?? [],
                update,
            }
        })
    }

    return <pageEditorContext.Provider value={context}>
        {props.children}
    </pageEditorContext.Provider>
}