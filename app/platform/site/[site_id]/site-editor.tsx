"use client"

import { useRouter } from "next/navigation"
import Title from "~/components/blocks/Title"
import { Button } from "~/components/ui/button"
import { AsyncReturnType } from "~/lib/utils"
import type { getSiteBySlugOf } from "~/services/sites"
import { ChangeSite } from "./change-site"
import { Site } from "~/types/site"

export async function SiteEditor(props: { site: Site }) {
    const site = props.site

    const router = useRouter()


    return <>
        <ChangeSite site={props.site} />
        <Title title={site.name} />
    </>
}

function changeName() {

}