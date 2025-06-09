import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthenticated } from '@/hooks/useAuthenticated'

import { OrdersTable } from './OrdersTable'
import { PositionsTable } from './PositionsTable'
import { TradeHistoryTable } from './TradeHistoryTable'

export function MarketPanelTabs() {
  const isAuthenticated = useAuthenticated()

  return (
    <Card className='h-[300px] flex flex-col overflow-hidden p-0'>
      <Tabs defaultValue='orders' className='flex flex-col flex-1'>
        <TabsList className='px-2 pt-2 w-full'>
          <TabsTrigger value='orders'>Orders</TabsTrigger>
          <TabsTrigger value='positions'>Positions</TabsTrigger>
          <TabsTrigger value='history'>History</TabsTrigger>
        </TabsList>

        {isAuthenticated ? (
          <>
            <TabsContent value='orders' className='overflow-auto'>
              <OrdersTable />
            </TabsContent>
            <TabsContent value='positions' className='overflow-auto'>
              <PositionsTable />
            </TabsContent>
            <TabsContent value='history' className='overflow-auto'>
              <TradeHistoryTable />
            </TabsContent>
          </>
        ) : (
          <div className='flex flex-1 flex-col justify-center items-center'>
            <h6 className='text-lg'>Start trading</h6>
            <p className='text-base text-muted-foreground'>Your data will be here</p>
          </div>
        )}
      </Tabs>
    </Card>
  )
}
