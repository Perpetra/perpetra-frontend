import { CreateOrderSidebar } from '@/components/CreateOrderSidebar'
import { Header } from '@/components/Header'
import { MarketPanelTabs } from '@/components/MarketPanelTabs'
import { TradingChart } from '@/components/TradingChart'

export function HomePage() {
  return (
    <div className='flex flex-1 flex-col min-h-screen'>
      <Header />

      <div className='flex flex-1 overflow-hidden px-4 pb-4'>
        <main className='flex flex-col flex-1 overflow-y-auto gap-4'>
          <TradingChart />
          <MarketPanelTabs />
        </main>

        <CreateOrderSidebar />
      </div>
    </div>
  )
}
