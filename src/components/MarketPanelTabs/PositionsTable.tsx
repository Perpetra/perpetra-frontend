import { ColumnDef } from '@tanstack/react-table'
import { useAccount } from 'wagmi'

import { useGetPositions } from '@/api/hooks'
import { DataTable } from '@/components/ui/data-table'
import { Position } from '@/lib/types'

const columns: ColumnDef<Position>[] = [
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'entryPrice', header: 'Entry Price' },
  { accessorKey: 'currentPrice', header: 'Current Price' },
  {
    accessorKey: 'pnl',
    header: 'PnL (%)',
    cell: ({ row }) => `${row.getValue('pnl')}%`,
  },
]

export function PositionsTable() {
  const { address } = useAccount()
  const { data = [], isLoading } = useGetPositions(address ?? '')

  return <DataTable columns={columns} data={data} isLoading={isLoading} />
}
