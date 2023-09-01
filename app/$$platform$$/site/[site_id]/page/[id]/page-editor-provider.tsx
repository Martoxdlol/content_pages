"use client"

import { createContext, useState } from "react"


type Site = any

type PageEditorContext = {
    update: () => void
    versions: Site[]
    index: number
    stage: Site
    undo: () => void
}

export const pageEditorContext = createContext<PageEditorContext | null>(null)

export function PageEditorProvider(props: { children: React.ReactNode, initialSite: Site }) {
    const [context, setContext] = useState<PageEditorContext>({
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