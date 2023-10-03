"use client"

import { DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/lib/client";
import { SpinnerButton } from "~/components/spinner";
import { createPageSchema } from "~/types/page";
import { useRouter } from "next/navigation";

export function CreatePage(props: {siteId: string}) {
    const router = useRouter()

    const form = useForm<z.infer<typeof createPageSchema>>({
        resolver: zodResolver(createPageSchema),
        defaultValues: {
            name: "",
            path: "",
            siteId: props.siteId
        },
    })

    const { mutateAsync, isLoading } = api.page.create.useMutation()

    async function onSubmit(values: z.infer<typeof createPageSchema>) {
        if (isLoading) return

        try {
            const result = await mutateAsync(values)
            form.reset()
            router.push(`/page/${result.id}`)
        } catch (e: any) {
            form.setError('path', {
                type: 'onChange',
                message: e.message
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create new page
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Create new page</DialogTitle>
                            <DialogDescription>
                                Define your page name here. Click create when you're done.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">
                                                Page name
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="name" {...field} placeholder="About Us" className="col-span-3" />
                                            </FormControl>
                                            {/* <FormDescription>
                                            This is your public display name.
                                        </FormDescription> */}
                                            <FormMessage className="col-span-4" />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="path"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">
                                                Path
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="path" {...field} placeholder="/about-us" className="col-span-3" />
                                            </FormControl>
                                            <FormDescription className="col-span-4 text-ellipsis overflow-hidden">
                                                Your path url will be {field.value}
                                            </FormDescription>
                                            <FormMessage className="col-span-4" />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            {isLoading ? <SpinnerButton /> : <Button type="submit">Create</Button>}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}