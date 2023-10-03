import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { Destination, urlOf } from "~/types/destination"

export type PathProps = {
    segments: PathSegment[]
}

type PathSegment = {
    title: string
    destination: Destination
}

export default function Path(props: PathProps) {
    return <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
        <Link href={urlOf(props.segments[0].destination)} className="overflow-hidden text-ellipsis whitespace-nowrap">
            {props.segments[0].title}
        </Link>
        <ChevronRightIcon className="h-4 w-4" />
        {props.segments.slice(1).map((segment, i) => {
            return <Link key={i} href={urlOf(segment.destination)} className="font-medium text-foreground">{segment.title}</Link>
        })}
    </div>
}