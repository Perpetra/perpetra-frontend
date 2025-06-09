import { type ColumnDef } from '@tanstack/react-table'

import { useGetOrders } from '@/api/hooks'
import { DataTable } from '@/components/ui/data-table'
import { Order } from '@/lib/types'

const columns: ColumnDef<Order>[] = [
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'leverage', header: 'Leverage' },
  { accessorKey: 'status', header: 'Status' },
  {
    accessorKey: 'result',
    header: 'Result',
    cell: ({ row }) => row.getValue('result') ?? '-',
  },
]

export function OrdersTable() {
  const { data = [], isLoading } = useGetOrders()

  return <DataTable columns={columns} data={data} isLoading={isLoading} />
}
