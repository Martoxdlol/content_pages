"use client"

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function SignInButton() {
    return <Button onClick={() => signIn('google')}>Sign In</Button>
}

export function SignOutButton() {
    return <Button onClick={() => signOut()}>Sign out</Button>
}