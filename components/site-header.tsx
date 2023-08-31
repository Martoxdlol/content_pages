import { CommandMenu } from "@/components/command-menu"
import { MobileNav } from "./mobile-nav"
// import Image from "next/image"


export default function SiteHeader(props: { showOnDesktop?: boolean, title: React.ReactNode }) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="pl-2 flex h-14 items-center">
        <MobileNav showOnDesktop={props.showOnDesktop} />
        {/* <Image alt="Site Logo" src="/next.svg"  height={30} width={147.75} className="mr-5" /> */}
        <p>{props.title}</p>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <div className="w-auto flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">

          </nav>
        </div>
      </div>
    </header>
  )
}
