import styled from '@emotion/styled';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, useGetOrdersGraphQL } from 'src/features/booking';

export const OrdersTable = () => {
  const { data: orders, loading, error } = useGetOrdersGraphQL();
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

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
    },
    onPaginationChange: setPagination,
  });

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  const showOrder = (id: number) => {
    navigate(`/orders/${id}`);
  };

  return (
    <div>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} style={{ width: header.getSize() }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const isSelected = location.pathname.includes(
              `/orders/${row.original.id}`
            );
            return (
              <tr
                key={row.original.id}
                style={{
                  backgroundColor: isSelected ? 'cadetblue' : 'transparent',
                }}
                onClick={() => showOrder(row.original.id)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
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
          {'<--'}předchozí
        </button>
        <span>
          [stránka {pagination.pageIndex + 1} z {table.getPageCount()}]
        </span>
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          další{'-->'}
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

  tr {
    &:hover {
      background-color: cadetblue;
      cursor: pointer;
    }
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
