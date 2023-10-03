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
import { createSiteSchema } from "~/types/site";
import { env } from "~/env.mjs";
import { api } from "~/lib/client";
import { SpinnerButton } from "~/components/spinner";

export function CreateSite(props: { isFirst: boolean }) {

    const form = useForm<z.infer<typeof createSiteSchema>>({
        resolver: zodResolver(createSiteSchema),
        defaultValues: {
            name: "",
            slug: "",
        },
    })

    const { mutateAsync, isLoading } = api.site.create.useMutation()

    async function onSubmit(values: z.infer<typeof createSiteSchema>) {
        if (isLoading) return

        try {
            await mutateAsync(values)
            form.reset()
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
                <Card className="relative cursor-pointer" role="button">
                    <CardHeader>
                        <CardTitle>{!props.isFirst ? 'Crear un nuevo sitio' : 'Crea tu primer sitio'}</CardTitle>
                    </CardHeader>
                    <div className="absolute top-0 bottom-0 right-0 pr-5 flex items-center">
                        <PlusIcon />
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <DialogHeader>
                            <DialogTitle>Create new site</DialogTitle>
                            <DialogDescription>
                                Define your site name here. Click create when you're done.
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
                            {isLoading ? <SpinnerButton /> : <Button type="submit">Create</Button>}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}