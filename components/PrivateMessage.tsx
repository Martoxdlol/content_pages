"use client"
import { api } from "~/lib/client"

export default function PrivateMessage() {
    const { data: message } = api.message.useQuery()

    return <>
        {message}
    </>
}