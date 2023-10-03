"use client"

import { useRouter } from "next/navigation"
import Title from "~/components/blocks/Title"
import { ChangeSite } from "./change-site"
import { Site } from "~/types/site"
import { Button } from "~/components/ui/button"
import { PlusIcon } from "lucide-react"
import { CreatePage } from "./create-page"

export function SiteEditor(props: { site: Site }) {
    const site = props.site

    const router = useRouter()

    return <div className="flex flex-col gap-5 md:grid md:grid-cols-[1fr_180px]">
        <div>
            <ChangeSite site={props.site} />
            <Title title={site.name} />
        </div>
        <div>
            <CreatePage siteId={props.site.id} />
        </div>
    </div>
}
