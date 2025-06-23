import { type ColumnDef } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'

import { useGetOrders } from '@/api/hooks'
import { DataTable } from '@/components/ui/data-table'
import { MAIN_DATE_TIME_FORMAT } from '@/lib/constants'
import { Order } from '@/lib/types'

const columns: ColumnDef<Order>[] = [
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'leverage', header: 'Leverage' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'limitPrice', header: 'Limit Price' },
  {
    accessorKey: 'expiresAt',
    header: 'Expires At',
    cell: ({ getValue }) => (getValue() ? format(parseISO(getValue() as string), MAIN_DATE_TIME_FORMAT) : undefined),
  },
]

export function OrdersTable() {
  const { data = [], isLoading } = useGetOrders()

  return <DataTable columns={columns} data={data} isLoading={isLoading} />
}
