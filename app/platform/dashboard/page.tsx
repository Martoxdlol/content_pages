import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Layout from "~/components/Layout";
import Title from "~/components/blocks/Title";

import { Skeleton } from "~/components/ui/skeleton";
import { serverSession } from "~/server/auth";
import { getSitesOf } from "~/services/sites";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { CreateSite } from "./create-site";
import { env } from "~/env.mjs";
import { Button } from "~/components/ui/button";

export default function Dashboard() {
    return <Layout>
        <Title
            title="Mis sitios"
        />
        <Suspense fallback={<MySitesSkeleton />}>
            <MySites />
        </Suspense>
    </Layout>
}


async function MySites() {
    const session = (await serverSession())!

    const sites = await getSitesOf(session.user.id)

    return <>
        <div className="max-w-[600px] mt-5">
            <CreateSite isFirst={sites.length == 0} />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
            {sites.map(site => <Link key={site.id} href={`/site/${site.id}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>{site.name}</CardTitle>
                        <CardDescription>{site.slug}.{env.NEXT_PUBLIC_DOMAIN}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button className="ml-auto" variant="outline">Acceder</Button>
                    </CardFooter>
                </Card>
            </Link>)}
        </div>
    </>
}

function MySitesSkeleton() {
    const skeleton = <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
    </div>

    return <>
        <div className="max-w-[600px] mt-5">
            <CreateSite isFirst={false} />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
            {skeleton}
            {skeleton}
            {skeleton}
            {skeleton}
        </div>
    </>
}