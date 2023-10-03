import Balancer from "react-wrap-balancer"
import { cn } from "~/lib/utils"

export type TitleProps = {
    title: string
    subtitle?: string
}

export default function Title(props: TitleProps) {
    return <div className="space-y-2">
        <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {props.title}
        </h1>
        {props.subtitle && <p className="text-lg text-muted-foreground">
            <Balancer>{props.subtitle}</Balancer>
        </p>}
    </div>
}