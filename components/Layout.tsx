import { ChevronRightIcon } from "lucide-react"
import SiteHeader from "./site-header"
import { cn } from "~/lib/utils"
import Balancer from "react-wrap-balancer"
import { ScrollArea } from "./ui/scroll-area"
import { TableOfContents } from "./toc"
import { SidebarNav } from "./sidebar-nav"
import Link from "next/link"
import Title from "./blocks/Title"
import Path from "./blocks/Path"
import Badges from "./blocks/Badges"
import { SiteFooter } from "./site-footer"

export type LayoutProps = {
    children: React.ReactNode
    title?: React.ReactNode
    sideNav?: React.ReactNode
    tableOfContents?: React.ReactNode
    showMobileNavMenuOnDesktop?: boolean
}

function LayoutWrapper({ children, sideNav }: Pick<LayoutProps, "children" | "sideNav">) {
    return (
        <div className="border-b">
            <div className={cn("container flex-1 items-start md:gap-6 lg:gap-10", {
                "md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]": !!sideNav,
                "md:grid md:grid-cols-[0px_minmax(0,1fr)]": !sideNav,
            })}>
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                    {sideNav && <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
                        {sideNav}
                    </ScrollArea>}
                </aside>
                {children}
            </div>
        </div>
    )
}


export default function Layout(props: LayoutProps) {
    return <>
        <SiteHeader title={props.title} showOnDesktop={props.showMobileNavMenuOnDesktop}/>
        <LayoutWrapper
            {...props}
        >
            <main className={cn("relative py-6 lg:gap-10 lg:py-8 xl:grid min-h-[calc(100vh-130px)]", {
                "xl:grid-cols-[1fr_300px]": !!props.tableOfContents,
            })}>
                <div className="mx-auto w-full min-w-0">
                    {props.children}
                </div>

                {props.tableOfContents && <div className="hidden text-sm xl:block">
                    <div className="sticky top-16 -mt-10 pt-4">
                        <ScrollArea className="pb-10">
                            <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                                {props.tableOfContents}
                            </div>
                        </ScrollArea>
                    </div>
                </div>}

            </main>
        </LayoutWrapper>
        <SiteFooter />
    </>
}

