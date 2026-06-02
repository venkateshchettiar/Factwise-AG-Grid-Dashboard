import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridApi,
  ICellRendererParams,
  ValueFormatterParams,
} from "ag-grid-community";
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
  onEditEmployee,
}: Props) {
  const gridRef = useRef<AgGridReact<Employee>>(null);

  const columnDefs: ColDef<Employee>[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 70,
        checkboxSelection: true,
        cellStyle: { padding: "0 8px" },
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 160,
        cellStyle: { padding: "0 16px" },
      },
      {
        field: "country",
        headerName: "Country",
        flex: 1,
        minWidth: 140,
        cellStyle: { padding: "0 16px" },
      },
      {
        field: "age",
        headerName: "Age",
        width: 90,
        cellStyle: { padding: "0 16px" },
      },
      {
        field: "salary",
        headerName: "Salary",
        flex: 1,
        minWidth: 140,
        valueFormatter: (params: ValueFormatterParams<Employee, number>) =>
          `$${(params.value ?? 0).toLocaleString()}`,
        comparator: (valueA: number, valueB: number) => valueA - valueB,
        cellStyle: { padding: "0 16px" },
      },
      {
        headerName: "Actions",
        width: 100,
        sortable: false,
        filter: false,
        cellStyle: { padding: "0 12px" },
        cellRenderer: (params: ICellRendererParams<Employee>) => {
          if (!params.data) return null;
          const { data } = params;
          return (
            <div className="action-buttons">
              <button
                className="btn-edit btn-icon-circle"
                onClick={() => onEditEmployee(data)}
                title="Edit employee"
                aria-label="Edit employee"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
              <button
                className="btn-delete btn-icon-circle"
                onClick={() => onDeleteEmployee(data.id)}
                title="Delete employee"
                aria-label="Delete employee"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
          );
        },
      },
    ],
    [onDeleteEmployee, onEditEmployee]
  );

  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      wrapText: false,
      autoHeight: false,
      suppressSizeToFit: false,
    }),
    []
  );

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <span className="table-title">Employee Records</span>
      </div>
      <div className="grid-shell">
        <div className="ag-theme-alpine" style={{ width: "100%", height: "100%" }}>
          <AgGridReact<Employee>
            ref={gridRef}
            rowData={employees}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            theme="legacy"
            pagination={true}
            paginationPageSize={10}
            rowSelection="multiple"
            quickFilterText={searchText}
            onGridReady={(params) => setApi(params.api)}
            enableCellTextSelection={true}
            suppressPropertyNamesCheck={true}
            rowHeight={48}
            headerHeight={50}
          />
        </div>
      </div>
    </div>
  );
}