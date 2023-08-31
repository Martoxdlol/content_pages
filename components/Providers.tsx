"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { ThemeProvider } from 'next-themes'

import { api } from "~/lib/client";


export type ProvidersProps = {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
    api.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:3000/api/trpc",
                }),
            ],
        })
    );
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </api.Provider>
    );
}