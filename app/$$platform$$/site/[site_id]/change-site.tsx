"use client"

import { DialogFooter, DialogHeader } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
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
import { Site, changeSiteSchema, createSiteSchema } from "~/types/site";
import { env } from "~/env.mjs";
import { api } from "~/lib/client";
import { SpinnerButton } from "~/components/spinner";
import { useRouter } from "next/navigation";

export function ChangeSite(props: { site: Site }) {
    const form = useForm<z.infer<typeof changeSiteSchema>>({
        resolver: zodResolver(changeSiteSchema),
        defaultValues: {
            name: props.site.name,
            slug: props.site.slug,
            id: props.site.id
        },
    })

    const { mutateAsync, isLoading } = api.site.change.useMutation()

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof changeSiteSchema>) {
        if (isLoading) return

        try {
            console.log(values)
            await mutateAsync(values)
            router.refresh()
        } catch (e: any) {
            form.setError('slug', {
                type: 'onChange',
                message: e.message
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-0.5" variant="link">Change name/identifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Change site name</DialogTitle>
                            <DialogDescription>
                                Make changes to your site here. Click save when you're done.
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
                                                Site name
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="name" {...field} placeholder="My Site" className="col-span-3" />
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
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">
                                                Identifier
                                            </FormLabel>
                                            <FormControl>
                                                <Input id="slug" {...field} placeholder="My Site" className="col-span-3" />
                                            </FormControl>
                                            <FormDescription className="col-span-4 text-ellipsis overflow-hidden">
                                                Your site url will be {field.value}.{env.NEXT_PUBLIC_DOMAIN}
                                            </FormDescription>
                                            <FormMessage className="col-span-4" />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            {isLoading ? <SpinnerButton /> : <Button type="submit">Save</Button>}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}