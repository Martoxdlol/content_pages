import { Badge, badgeVariants } from "~/components/ui/badge";
import { Destination } from "~/types/destination";

export type Badge = {
    name: string
    icon?: React.ReactNode
    destination?: Destination
}

export type BadgesProps = {
    badges: Badge[]
}

export default function Badges(props: BadgesProps) {
    return <div className="flex items-center space-x-2 pt-4">

        {props.badges.map((badge, i) => {
            return <Badge key={i} variant={'secondary'}>
                {badge.name}
            </Badge>
        })}
    </div>
}

{/* <div className="flex items-center space-x-2 pt-4">
    {doc.radix?.link && (
        <Link
            href={doc.radix.link}
            target="_blank"
            rel="noreferrer"
            className={cn(badgeVariants({ variant: "secondary" }))}
        >
            <Icons.radix className="mr-1 h-3 w-3" />
            Radix UI
        </Link>
    )}
    {doc.radix?.api && (
        <Link
            href={doc.radix.api}
            target="_blank"
            rel="noreferrer"
            className={cn(badgeVariants({ variant: "secondary" }))}
        >
            API Reference
        </Link>
    )}
</div> */}