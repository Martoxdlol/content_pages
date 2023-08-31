import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Layout from "~/components/Layout";
import Title from "~/components/blocks/Title";

import { Skeleton } from "~/components/ui/skeleton";
import { serverSession } from "~/server/auth";
import { getSiteBySlugOf, getSitesOf } from "~/services/sites";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { env } from "~/env.mjs";
import { Button } from "~/components/ui/button";
import { useParams } from 'next/navigation'
import { PageContentEditor } from "./page-content-editor";
import { PageEditorProvider } from "./page-editor-provider";

export default function SiteWrapper({ params }: { params: { slug: string } }) {

    return <Suspense fallback={<PageSkeleton />}>
        <MyPage slug={params.slug} />
    </Suspense>
}


export function PageSkeleton() {
    return <Layout
        title={<Skeleton className="ml-3 w-40 h-7" />}
    >
        <Skeleton className="h-10 w-[260px]" />
    </Layout>
}

async function MyPage(props: { slug: string }) {
    const session = (await serverSession())!
    const site = await getSiteBySlugOf(session.user.id, props.slug)

    if (!site) return <Layout
        showMobileNavMenuOnDesktop
    >
        <Title title={"Site not found"} />
    </Layout>

    return <PageEditorProvider
        initialSite={{}}
    >
        <Layout
            showMobileNavMenuOnDesktop
            title={site.name}
        >
            <PageContentEditor page={site} />
        </Layout>
    </PageEditorProvider>
}