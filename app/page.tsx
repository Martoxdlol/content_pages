import { ComboboxDemo } from '~/components/ComboBoxDemo'
import Layout from '~/components/Layout'
import PrivateMessage from '~/components/PrivateMessage'
import ServerClock from '~/components/ServerClock'
import { SignInButton, SignOutButton } from '~/components/SignInOutButton'
import { serverSession } from '~/server/auth'

export default async function Home() {
    const session = await serverSession()

    return <Layout>

    </Layout>
}
