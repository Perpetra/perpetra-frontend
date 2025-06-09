import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateOrder } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthenticated } from '@/hooks/useAuthenticated'
import { QUERY_KEYS } from '@/lib/constants'

const schema = z.object({
  type: z.enum(['long', 'short']),
  amount: z.coerce.number().positive(),
  leverage: z.coerce.number().int().min(1).max(40),
  limitPrice: z.preprocess((val) => {
    const parsed = Number(val)
    return isNaN(parsed) || !val ? undefined : parsed
  }, z.number().positive().optional()),
  expiresAt: z.preprocess((val) => {
    if (typeof val === 'string' && val !== '') {
      const date = new Date(val)
      return isNaN(date.getTime()) ? undefined : date.toISOString()
    }
    return undefined
  }, z.string().optional()),
})
type FormValues = z.infer<typeof schema>

export function CreateOrderSidebar() {
  const queryClient = useQueryClient()
  const isAuthenticated = useAuthenticated()
  const { mutate: createOrder, isPending } = useCreateOrder()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { type: 'short' },
  })

  const onSubmit = async (data: FormValues) => {
    createOrder(data, {
      onSuccess: () => {
        reset()

        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.positions })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.balance })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.trades })
      },
    })
  }

  const type = watch('type')

  const disabled = !isAuthenticated || isPending

  return (
    <aside className='w-[300px] ml-4'>
      <Card className='p-4'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3 className='text-lg font-semibold'>New Order</h3>

          <Tabs value={type} onValueChange={(val) => setValue('type', val as 'long' | 'short')}>
            <TabsList className='grid grid-cols-2'>
              <TabsTrigger value='short' disabled={disabled}>
                Short
              </TabsTrigger>
              <TabsTrigger value='long' disabled={disabled}>
                Long
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className='flex flex-col gap-2'>
            <Label>Amount (USDC)</Label>
            <Input type='number' disabled={disabled} {...register('amount')} />
            {errors.amount && <span className='text-red-500 text-sm'>{errors.amount.message}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <Label>Leverage (x)</Label>
            <Input type='number' disabled={disabled} {...register('leverage')} />
            {errors.leverage && <span className='text-red-500 text-sm'>{errors.leverage.message}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <Label>Limit Price (optional)</Label>
            <Input type='number' disabled={disabled} {...register('limitPrice')} />
            {errors.limitPrice && <span className='text-red-500 text-sm'>{errors.limitPrice.message}</span>}
          </div>

          <div className='flex flex-col gap-2'>
            <Label>Expires At (optional)</Label>
            <Input type='datetime-local' disabled={disabled} {...register('expiresAt')} />
            {errors.expiresAt && <span className='text-red-500 text-sm'>{errors.expiresAt.message}</span>}
          </div>

          <Button type='submit' disabled={disabled}>
            {isPending ? 'Submitting...' : 'Create Order'}
          </Button>
        </form>
      </Card>
    </aside>
  )
}
