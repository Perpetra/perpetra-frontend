import TradingViewWidget from '@/components/TradingChart/TradingViewWidget'
import { Card } from '@/components/ui/card'

export function TradingChart() {
  return (
    <Card className='flex flex-1 p-4'>
      <TradingViewWidget />
    </Card>
  )
}
