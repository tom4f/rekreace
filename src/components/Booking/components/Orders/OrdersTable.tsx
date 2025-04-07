import styled from '@emotion/styled';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from 'components/Atoms';
import { Order, useGetOrdersGraphQL } from 'features/booking';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { orderStatusMap } from '../Form';

export const OrdersTable = () => {
  const { data: orders, loading, error } = useGetOrdersGraphQL();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Order>[] = [
    { accessorKey: 'id', header: 'ID', size: 40 },
    { accessorKey: 'apartment', header: 'Apa.', size: 40 },
    { accessorKey: 'persons', header: 'Osob', size: 40 },
    { accessorKey: 'check_in', header: 'Příjezd', size: 200 },
    { accessorKey: 'check_out', header: 'Odjezd', size: 100 },
    { accessorKey: 'name', header: 'Jméno', size: 100 },
    { accessorKey: 'created_at', header: 'Vytvořeno', size: 130 },
    {
      accessorFn: (row) => orderStatusMap[row.order_status] ?? row.order_status,
      header: 'Stav',
      size: 70,
      cell: ({ getValue }) => {
        const status = getValue() as keyof typeof orderStatusMap;
        const label = orderStatusMap[status] ?? status;

        return <OrderStatusBadge status={status}>{label}</OrderStatusBadge>;
      },
    },
  ];

  const table = useReactTable({
    data: orders || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  const showOrder = (id: number) => {
    navigate(`/orders/${id}`);
  };

  return (
    <StyledOrderTable>
      <StyledSearch>
        <Input
          style={{ display: 'flex', width: '130px' }}
          label='Hledej'
          placeholder='hledaný text'
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </StyledSearch>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const { id } = row.original;

            return (
              <StyledTr
                key={id}
                isSelected={location.pathname.includes(`/orders/${id}`)}
                onClick={() => showOrder(id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>

      <PaginationContainer>
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'◀-- '}předchozí
        </button>
        <span>
          [stránka {pagination.pageIndex + 1} z {table.getPageCount()}]
        </span>
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          další{' --▶'}
        </button>
      </PaginationContainer>
    </StyledOrderTable>
  );
};

const StyledOrderTable = styled.div`
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledSearch = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const StyledTable = styled.table`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  color: white;
  font-size: smaller;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  th {
    background-color: green;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StyledTr = styled.tr<{ isSelected?: boolean }>`
  background-color: ${({ isSelected }) =>
    isSelected ? 'cadetblue' : 'transparent'};

  &:hover {
    background-color: cadetblue;
    cursor: pointer;
  }
`;

const OrderStatusBadge = styled.span<{ status: string }>`
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  color: white;
  display: inline-block;

  background-color: ${({ status }) => {
    switch (status) {
      case 'nová':
        return '#f0ad4e'; // orange
      case 'potvrzeno':
        return '#5bc0de'; // blue
      case 'zrušeno':
        return '#d9534f'; // red
      case 'uskutečněno':
        return '#5cb85c'; // green
      default:
        return '#6c757d'; // gray fallback
    }
  }};
`;
