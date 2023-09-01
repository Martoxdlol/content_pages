"use client"

import { useRouter } from "next/navigation"
import Title from "~/components/blocks/Title"
import { ChangeSite } from "./change-site"
import { Site } from "~/types/site"

export function SiteEditor(props: { site: Site }) {
    const site = props.site

    const router = useRouter()

    return <>
        <ChangeSite site={props.site} />
        <Title title={site.name} />
    </>
}
