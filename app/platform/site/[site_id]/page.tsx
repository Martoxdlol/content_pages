import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Layout from "~/components/Layout";
import Title from "~/components/blocks/Title";

import { Skeleton } from "~/components/ui/skeleton";
import { serverSession } from "~/server/auth";
import { getSiteByIdOf, getSitesOf } from "~/services/sites";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { env } from "~/env.mjs";
import { Button } from "~/components/ui/button";
import { useParams } from 'next/navigation'
import { SiteEditor } from "./site-editor";


export default function SiteWrapper({ params }: { params: { site_id: string } }) {

    return <Suspense fallback={<PageSkeleton />}>
        <MySite id={params.site_id} />
    </Suspense>
}


export function PageSkeleton() {
    return <Layout
        title={<Skeleton className="ml-3 w-40 h-7" />}
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

    </Layout>
}