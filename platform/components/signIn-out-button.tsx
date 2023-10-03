"use client"

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { SpinnerButton } from "./spinner";

export function SignInButton() {
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <SpinnerButton />
    }

    return <Button onClick={async () => {
        setLoading(true)
        await signIn('google')
        setLoading(false)
    }}>Sign In</Button>
}

export function SignOutButton() {
    return <Button onClick={() => signOut()}>Sign out</Button>
}

