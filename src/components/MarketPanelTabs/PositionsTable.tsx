import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { useClosePosition, useGetPositions } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { QUERY_KEYS } from '@/lib/constants'
import { Position } from '@/lib/types'

export function PositionsTable() {
  const { data = [], isLoading } = useGetPositions()
  const { mutateAsync: close } = useClosePosition()
  const queryClient = useQueryClient()

  const handleClose = async (id: string) => {
    try {
      await close({ positionId: id })
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.positions })
    } catch (error) {
      console.error(error)
    }
  }

  const columns: ColumnDef<Position>[] = [
    { accessorKey: 'type', header: 'Type' },
    { accessorKey: 'entryPrice', header: 'Entry Price' },
    { accessorKey: 'currentPrice', header: 'Current Price' },
    {
      accessorKey: 'pnl',
      header: 'PnL (%)',
      cell: ({ row }) => `${row.getValue('pnl')}%`,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Button variant='ghost' size='icon' onClick={() => handleClose(row.original.id)}>
          <X className='w-4 h-4' />
          <span className='sr-only'>Close position</span>
        </Button>
      ),
    },
  ]

  return <DataTable columns={columns} data={data} isLoading={isLoading} />
}
