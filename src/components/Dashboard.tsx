import { useState } from "react";
import GridTable from "./GridTable";
import Toolbar from "./Toolbar";
import { type GridApi } from "ag-grid-community";

export default function Dashboard() {

    const [search, setSearch] = useState("");
    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const exportCSV = () => {
        gridApi?.exportDataAsCsv();
    };

    return (
        <div>

            <h1>Employee Dashboard</h1>

            <div className="cards">

                <div className="card">
                    <h3>Total Employees</h3>
                    <p>20</p>
                </div>

                <div className="card">
                    <h3>Countries</h3>
                    <p>10+</p>
                </div>

                <div className="card">
                    <h3>Avg Salary</h3>
                    <p>$58K</p>
                </div>

            </div>

            <Toolbar
                onSearch={setSearch}
                onExport={exportCSV}
            />

            <GridTable
                searchText={search}
                setApi={setGridApi}
            />

        </div>
    );
}