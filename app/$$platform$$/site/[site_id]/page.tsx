import { Suspense } from "react";
import Layout from "~/components/Layout";
import Title from "~/components/blocks/Title";

import { Skeleton } from "~/components/ui/skeleton";
import { serverSession } from "~/server/auth";
import { getSiteByIdOf, getSitesOf } from "~/services/sites";
import { SiteEditor } from "./site-editor";
import { DataTableDemo } from "./pages-table";


export default function SiteWrapper({ params }: { params: { site_id: string } }) {

    return <Suspense fallback={<SiteSkeleton />}>
        <MySite id={params.site_id} />
    </Suspense>
}


function SiteSkeleton() {
    return <Layout
        title={<span className="ml-3 w-40 h-7 animate-pulse rounded-md bg-primary/10 block" />}
    >
        <Skeleton className="h-10 w-[260px]" />
    </Layout>
}

async function MySite(props: { id: string }) {
    const session = (await serverSession())!
    const site = await getSiteByIdOf(session.user.id, props.id)

    if (!site) return <Layout
        showMobileNavMenuOnDesktop
    >
        <Title title={"Site not found"} />
    </Layout>

    return <Layout
        showMobileNavMenuOnDesktop
        title={site.name}
    >
        <SiteEditor site={site} />
        <SitePages />
    </Layout>
}

async function SitePages() {
    // get pages

    return <DataTableDemo />
}

