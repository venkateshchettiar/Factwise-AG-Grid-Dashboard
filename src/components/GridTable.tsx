import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi } from "ag-grid-community";
import { useMemo, useRef } from "react";
import type { Employee } from "../types";

interface Props {
  employees: Employee[];
  searchText: string;
  setApi: (api: GridApi) => void;
  onDeleteEmployee: (id: number) => void;
  onEditEmployee: (employee: Employee) => void;
}

export default function GridTable({
  employees,
  searchText,
  setApi,
  onDeleteEmployee,
  onEditEmployee
}: Props) {
  const gridRef = useRef<AgGridReact>(null);

  const columnDefs: ColDef[] = useMemo(() => [
    { field: "id", headerName: "ID", width: 80, checkboxSelection: true },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "country", headerName: "Country", flex: 1, minWidth: 120 },
    { field: "age", headerName: "Age", width: 80, sort: "desc" },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      minWidth: 120,
      valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
      comparator: (valueA: number, valueB: number) => valueA - valueB
    },
    {
      headerName: "Actions",
      width: 150,
      cellRenderer: (params: any) => (
        <div className="action-buttons">
          <button
            className="btn-edit"
            onClick={() => onEditEmployee(params.data)}
            title="Edit employee"
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => onDeleteEmployee(params.data.id)}
            title="Delete employee"
          >
            Delete
          </button>
        </div>
      ),
      sortable: false,
      filter: false
    }
  ], [onDeleteEmployee, onEditEmployee]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      wrapText: true,
      autoHeight: false
    }),
    []
  );

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "500px", width: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={employees}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        rowSelection="multiple"
        quickFilterText={searchText}
        onGridReady={(params) => setApi(params.api)}
        enableCellTextSelection={true}
        suppressPropertyNamesCheck={true}
      />
    </div>
  );
}