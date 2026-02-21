'use client';

import { 
    useReactTable, 
    getCoreRowModel, 
    flexRender, 
    ColumnDef,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    getPaginationRowModel
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
  isLoading
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
        sorting,
        globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
        pagination: {
            pageSize: 10,
        }
    }
  });

  if (isLoading) {
    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-0">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                            {columns.map((_, i) => (
                                <th key={i}><span className="placeholder col-6"></span></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <tr key={row}>
                                {columns.map((_, col) => (
                                    <td key={col}><span className="placeholder col-8 placeholder-sm"></span></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th 
                        key={header.id} 
                        colSpan={header.colSpan}
                        className={header.column.getCanSort() ? "cursor-pointer user-select-none" : ""}
                        onClick={header.column.getToggleSortingHandler()}
                        style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                    >
                      <div className="d-flex align-items-center text-muted small text-uppercase">
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        {/* Sort Indicator */}
                        {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "asc" ? (
                                <i className="bi bi-arrow-up-short ms-1"></i>
                            ) : (
                                <i className="bi bi-arrow-down-short ms-1"></i>
                            )
                        ) : header.column.getCanSort() ? (
                            <i className="bi bi-arrow-down-up ms-1 text-light"></i>
                        ) : null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-5 text-muted">
                  <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="card-footer bg-white border-top-0 py-3 d-flex align-items-center justify-content-between">
        <span className="text-muted small">
            Showing {table.getRowModel().rows.length} of {table.getFilteredRowModel().rows.length} results
        </span>
        <div className="btn-group btn-group-sm">
            <button 
                className="btn btn-outline-secondary"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </button>
            <button 
                className="btn btn-outline-secondary"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </button>
        </div>
      </div>
    </div>
  );
}
