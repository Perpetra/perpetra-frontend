import { useAccount, useSignMessage } from 'wagmi'

import { useAuth } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/lib/authStore'

export function SignMessageButton() {
  const { signMessageAsync, isPending } = useSignMessage()
  const { mutateAsync: auth } = useAuth()
  const { login } = useAuthStore()
  const { address } = useAccount()

  const handleSign = async () => {
    if (!address) return

    const timestamp = Date.now()
    const message = `Perpetra Verification at ${timestamp}`

    try {
      const signature = await signMessageAsync({ message })
      const { token } = await auth({ signature, address, message })
      return login(token, address)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Button onClick={handleSign} disabled={isPending}>
      {isPending ? 'Signing...' : 'Sign Message'}
    </Button>
  )
}
