import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export function SpinnerButton(props: { classNames?: string }) {
    return <Button disabled>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
    </Button>
}