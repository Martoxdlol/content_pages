import { ComboboxDemo } from '~/components/ComboBoxDemo'
import PrivateMessage from '~/components/PrivateMessage'
import ServerClock from '~/components/ServerClock'
import { SignInButton, SignOutButton } from '~/components/SignInOutButton'
import { serverSession } from '~/server/auth'

export default async function Home() {
    const session = await serverSession()

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-24">
            {session && <p>Welcome {session.user.name} <SignOutButton /></p>}
            {!session && <SignInButton />}
            <div>
                <ServerClock />
            </div>
            <div>
                <PrivateMessage />
            </div>
            <ComboboxDemo />
        </main>
    )
}
