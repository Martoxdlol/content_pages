import { Suspense } from "react";
import Layout from "~/components/Layout";
import Title from "~/components/blocks/Title";

import { Skeleton } from "~/components/ui/skeleton";
import { serverSession } from "~/server/auth";
import { getSiteByIdOf, getSitesOf } from "~/services/sites";
import { PageContentEditor } from "./page-content-editor";
import { PageEditorProvider } from "./page-editor-provider";
import { cn } from "~/lib/utils";

export default function SiteWrapper({ params }: { params: { id: string } }) {

    return <Suspense fallback={<PageSkeleton />}>
        <MyPage id={params.id} />
    </Suspense>
}


function PageSkeleton() {
    return <Layout
        title={<span
            className={cn("animate-pulse rounded-md bg-primary/10", "ml-3 w-40 h-7")}
        />}
    >
        <Skeleton className="h-10 w-[260px]" />
    </Layout>
}

async function MyPage(props: { id: string }) {
    const session = (await serverSession())!
    const site = await getSiteByIdOf(session.user.id, props.id)

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