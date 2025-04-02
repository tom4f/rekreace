import styled from '@emotion/styled';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { Order, useGetOrdersGraphQL } from 'src/features/booking';

export const OrdersTable = () => {
  const { data: orders, loading, error } = useGetOrdersGraphQL();
  const navigate = useNavigate();

  const columns: ColumnDef<Order>[] = [
    { accessorKey: 'id', header: 'ID', size: 50 },
    { accessorKey: 'apartment', header: 'Apartment', size: 50 },
    { accessorKey: 'persons', header: 'Persons', size: 50 },
    { accessorKey: 'check_in', header: 'Check-In', size: 100 },
    { accessorKey: 'check_out', header: 'Check-Out', size: 100 },
    // { accessorKey: 'email', header: 'Email', size: 200 },
    // { accessorKey: 'phone', header: 'Phone', size: 150 },
    { accessorKey: 'name', header: 'Name', size: 100 },
    //{ accessorKey: 'confirm_via', header: 'Confirm', size: 100 },
    // { accessorKey: 'address', header: 'Address', size: 300 },
    //{ accessorKey: 'info', header: 'Info', size: 200 },
    { accessorKey: 'created_at', header: 'Created At', size: 150 },
    { accessorKey: 'order_status', header: 'Status', size: 70 },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  });

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders.</p>;
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  const showOrder = (id: number) => {
    navigate(`/orders/${id}`);
  };

  return (
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
        {table.getRowModel().rows.map((row) => (
          <tr key={row.original.id} onClick={() => showOrder(row.original.id)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
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
