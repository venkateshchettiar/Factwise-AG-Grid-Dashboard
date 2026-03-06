import { AgGridReact } from "ag-grid-react";
import { type ColDef, type GridApi } from "ag-grid-community";
import { useMemo, useRef } from "react";
import { employees } from "../data/employee";

interface Props {
    searchText: string;
    setApi: (api: GridApi) => void;
}

export default function GridTable({ searchText, setApi }: Props) {

    const gridRef = useRef<AgGridReact>(null);

    const columnDefs: ColDef[] = [
        { field: "id", checkboxSelection: true },
        { field: "name", flex: 1 },
        { field: "country" },
        { field: "age" },
        { field: "salary" }
    ];

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true
    }), []);

    return (
        <div
            className="ag-theme-alpine"
            style={{ height: 300 }}
        >
            <AgGridReact
                ref={gridRef}
                rowData={employees}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                pagination={true}
                rowSelection="multiple"
                quickFilterText={searchText}
                onGridReady={(params) => setApi(params.api)}
                paginationAutoPageSize={true}
            />
        </div>
    );
}