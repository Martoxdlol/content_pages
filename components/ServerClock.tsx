"use client"
import { api } from "~/lib/client"

export default function ServerClock() {
    const { data: date } = api.time.useQuery(undefined, { refetchInterval: 1000 })
    return <>
        {date}
    </>
}