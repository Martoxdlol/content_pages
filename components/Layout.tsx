import { ChevronRightIcon } from "lucide-react"
import SiteHeader from "./SiteHeader"
import { cn } from "~/lib/utils"
import Balancer from "react-wrap-balancer"
import { ScrollArea } from "./ui/scroll-area"
import { DashboardTableOfContents } from "./toc"
import { DocsSidebarNav } from "./sidebar-nav"
import Link from "next/link"
import Title from "./blocks/Title"
import Path from "./blocks/Path"
import Badges from "./blocks/Badges"

export type LayoutProps = {
    children: React.ReactNode
}

function LayoutWrapper({ children }: Pick<LayoutProps, "children">) {
    return (
        <div className="border-b">
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                    <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
                        <DocsSidebarNav items={[
                            {
                                title: "Title",
                                items: [
                                    {
                                        title: "Sub Title",
                                        items: []
                                    }
                                ]
                            }
                        ]} />
                    </ScrollArea>
                </aside>
                {children}
            </div>
        </div>
    )
}


export default function Layout(props: LayoutProps) {
    return <>
        <SiteHeader />
        <LayoutWrapper>
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0">
                    <Path segments={[
                        {
                            title: "Home",
                            destination: { type: 'page', src: '124' },
                        },
                        {
                            title: "Title",
                            destination: { type: 'page', src: '124' },
                        }
                    ]} />
                    <Title
                        title="Title"
                        subtitle="Description"
                    />
                    <Badges badges={[
                        {
                            name: "Badge",
                        },
                        {
                            name: "Badge",
                        }
                    ]} />
                </div>

                <div className="hidden text-sm xl:block">
                    <div className="sticky top-16 -mt-10 pt-4">
                        <ScrollArea className="pb-10">
                            <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                                <DashboardTableOfContents toc={{
                                    items: [
                                        {
                                            title: "Title",
                                            url: "#title",
                                            items: [
                                                {
                                                    title: "Sub Title",
                                                    url: "#sub-title"
                                                }
                                            ]
                                        }
                                    ]
                                }} />
                            </div>
                        </ScrollArea>
                    </div>
                </div>

            </main>
        </LayoutWrapper>
    </>
}

