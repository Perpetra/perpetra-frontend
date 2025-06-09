import { ColumnDef } from '@tanstack/react-table'

import { useGetTradeHistory } from '@/api/hooks'
import { Trade } from '@/lib/types'

import { DataTable } from '../ui/data-table'

const columns: ColumnDef<Trade>[] = [
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'entryPrice', header: 'Entry Price' },
  { accessorKey: 'closePrice', header: 'Close Price' },
  { accessorKey: 'size', header: 'Size (USDC)' },
  { accessorKey: 'result', header: 'Result' },
  {
    accessorKey: 'closedAt',
    header: 'Closed At',
    cell: ({ row }) => new Date(row.getValue('closedAt')).toLocaleString(),
  },
]

export function TradeHistoryTable() {
  const { data = [], isLoading } = useGetTradeHistory()

  return <DataTable columns={columns} data={data} isLoading={isLoading} />
}
