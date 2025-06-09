import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'

import { useGetFundingBalance, usePostDeposit, usePostWithdraw } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { Network } from '@/lib/types'

type TabValue = 'deposit' | 'withdraw'
type FormValues = {
  amount: string
  txHash: string
}

export function Funding() {
  const { address, chain } = useAccount()
  const [open, setOpen] = useState(false)
  const network = (chain?.name as Network) || 'Ethereum'

  const balanceQuery = useGetFundingBalance(address!, network)

  const { mutate: deposit } = usePostDeposit()
  const { mutate: withdraw } = usePostWithdraw()

  const [tabValue, setTabValue] = useState<TabValue>('deposit')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = ({ amount, txHash }: FormValues) => {
    if (!address || !chain) return

    const payload = { address, network, txHash, amount }
    if (tabValue === 'deposit') {
      deposit(payload)
    } else {
      withdraw(payload)
    }

    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>{balanceQuery.data?.balance ?? '—'} USDT</Button>
      </DialogTrigger>

      <DialogContent className='max-w-sm' showCloseButton={false}>
        <DialogTitle className='sr-only'>Funding Dialog</DialogTitle>
        <DialogDescription className='sr-only'>Deposit or Withdraw</DialogDescription>

        <Tabs value={tabValue} onValueChange={(value) => setTabValue(value as TabValue)}>
          <TabsList className='w-full mb-4'>
            <TabsTrigger value='deposit'>Deposit</TabsTrigger>
            <TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TabsContent value={tabValue} className='space-y-4 mt-2'>
              <Input placeholder='Amount (USDT)' {...register('amount', { required: true })} />
              <Input placeholder='Transaction Hash' {...register('txHash', { required: true })} />
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                Confirm {tabValue === 'deposit' ? 'Deposit' : 'Withdraw'}
              </Button>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
