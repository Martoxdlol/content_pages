import SiteHeader from "./SiteHeader"

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout(props: LayoutProps) {
    return <div>
        <SiteHeader />
    </div>
}