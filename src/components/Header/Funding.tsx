import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetFundingBalance } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useDeposit } from '@/hooks/useDeposit'
import { useWithdraw } from '@/hooks/useWithdraw'
import { formatUSDCAmount } from '@/lib/formatUSDCAmount'
import { parseUSDCAmount } from '@/lib/parseUSDCAmount'

type TabValue = 'deposit' | 'withdraw'

const schema = z.object({
  amount: z.coerce.number().positive(),
})

type FormValues = z.infer<typeof schema>

export function Funding() {
  const [open, setOpen] = useState(false)

  const balanceQuery = useGetFundingBalance()

  const deposit = useDeposit()
  const withdraw = useWithdraw()

  const [tabValue, setTabValue] = useState<TabValue>('deposit')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async ({ amount }: FormValues) => {
    const value = parseUSDCAmount(amount)

    try {
      if (tabValue === 'deposit') {
        await deposit.deposit(value)
      } else {
        await withdraw.withdraw(value)
      }

      await balanceQuery.refetch()
      reset()
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const disabled = withdraw.isPending || deposit.isPending

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
            <TabsTrigger value='deposit' disabled={disabled}>
              Deposit
            </TabsTrigger>
            <TabsTrigger value='withdraw' disabled={disabled}>
              Withdraw
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TabsContent value={tabValue} className='space-y-4 mt-2'>
              <div className='flex flex-col gap-2'>
                <Label>Amount (USDC)</Label>
                <Input type='number' {...register('amount')} disabled={disabled} />
                {errors.amount && <span className='text-red-500 text-sm'>{errors.amount.message}</span>}
              </div>

              <Button type='submit' className='w-full' disabled={disabled}>
                Confirm {tabValue === 'deposit' ? 'Deposit' : 'Withdraw'}
              </Button>
            </TabsContent>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
