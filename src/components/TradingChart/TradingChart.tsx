import { useGetDarkPoolSummary } from '@/api/hooks'
import TradingViewWidget from '@/components/TradingChart/TradingViewWidget'
import { Card } from '@/components/ui/card'

export function TradingChart() {
  const { data } = useGetDarkPoolSummary()
  return (
    <Card className='flex flex-1 p-4'>
      {data && (
        <div className='flex justify-between'>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-muted-foreground'>Last Price:</span>
            <span className='font-medium text-foreground'>{data.lastExecutionPrice.toFixed(2)} USDС</span>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-muted-foreground'>Daily Volume:</span>
            <span className='font-medium text-foreground'>{data.dailyVolume.toLocaleString()} USDС</span>
          </div>
        </div>
      )}
      <TradingViewWidget />
    </Card>
  )
}
