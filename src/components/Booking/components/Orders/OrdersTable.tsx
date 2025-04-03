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
    { accessorKey: 'id', header: 'ID', size: 50 },
    { accessorKey: 'apartment', header: 'Apartment', size: 50 },
    { accessorKey: 'persons', header: 'Persons', size: 50 },
    { accessorKey: 'check_in', header: 'Check-In', size: 100 },
    { accessorKey: 'check_out', header: 'Check-Out', size: 100 },
    { accessorKey: 'name', header: 'Name', size: 100 },
    { accessorKey: 'created_at', header: 'Created At', size: 150 },
    { accessorKey: 'order_status', header: 'Status', size: 70 },
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
    <div className='flex flex-wrap justify-center'>
      <Input
        style={{ width: '130px' }}
        label='Hledej'
        placeholder='hledaný text'
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
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
    </div>
  );
};

const StyledTable = styled.table`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  color: white;
  font-size: smaller;
  border-collapse: collapse;
  table-layout: fixed;
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
