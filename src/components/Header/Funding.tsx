import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useGetFundingBalance } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useDeposit } from '@/hooks/useDeposit'
import { useWithdraw } from '@/hooks/useWithdraw'
import { formatUSDCAmount } from '@/lib/formatUSDCAmount'

type TabValue = 'deposit' | 'withdraw'
type FormValues = {
  amount: string
}

export function Funding() {
  const [open, setOpen] = useState(false)

  const balanceQuery = useGetFundingBalance()

  const { deposit } = useDeposit()
  const { withdraw } = useWithdraw()

  const [tabValue, setTabValue] = useState<TabValue>('deposit')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async ({ amount }: FormValues) => {
    try {
      if (tabValue === 'deposit') {
        await deposit(amount)
      } else {
        await withdraw(amount)
      }

      reset()
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          {balanceQuery.data?.balance ? formatUSDCAmount(balanceQuery.data?.balance) : '—'} USDC
        </Button>
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
              <Input placeholder='Amount (USDC)' {...register('amount', { required: true })} />
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
