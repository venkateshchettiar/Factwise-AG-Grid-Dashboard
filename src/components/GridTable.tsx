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
    { 
      field: "id", 
      headerName: "ID", 
      width: 70,
      checkboxSelection: true,
      cellStyle: { padding: "12px 8px" }
    },
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1, 
      minWidth: 160,
      cellStyle: { padding: "12px 16px" }
    },
    { 
      field: "country", 
      headerName: "Country", 
      flex: 1, 
      minWidth: 140,
      cellStyle: { padding: "12px 16px" }
    },
    { 
      field: "age", 
      headerName: "Age", 
      width: 90,
      cellStyle: { padding: "12px 16px" }
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 1,
      minWidth: 140,
      valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
      comparator: (valueA: number, valueB: number) => valueA - valueB,
      cellStyle: { padding: "12px 16px" }
    },
    {
      headerName: "Actions",
      width: 160,
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
      filter: false,
      cellStyle: { padding: "12px 8px" }
    }
  ], [onDeleteEmployee, onEditEmployee]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      wrapText: false,
      autoHeight: false,
      suppressSizeToFit: false
    }),
    []
  );


  return (
    <div className="table-wrapper">
      <div className="table-header">
        <span className="table-title">Employee Records</span>
      </div>

      <div
        className="ag-theme-alpine grid-container"
        style={{ height: "600px", width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
        //   paginationPageSize={paginationPageSize}
          rowSelection="multiple"
          quickFilterText={searchText}
          onGridReady={(params) => setApi(params.api)}
          enableCellTextSelection={true}
          suppressPropertyNamesCheck={true}
          paginationAutoPageSize={true}
          rowHeight={48}
          headerHeight={50}
        />
      </div>
    </div>
  );
}