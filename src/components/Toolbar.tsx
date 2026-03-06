interface Props {
    onSearch: (value: string) => void;
    onExport: () => void;
    onAddEmployee: () => void;
    onResetData: () => void;
    employeeCount: number;
}

export default function Toolbar({
    onSearch,
    onExport,
    onAddEmployee,
    onResetData,
    employeeCount
}: Props) {

    return (
        <div className="toolbar">

            <input
                placeholder="Search employees..."
                onChange={(e) => onSearch(e.target.value)}
                className="search-input"
            />

            <div className="toolbar-buttons">
                <button onClick={onAddEmployee} className="btn-primary">
                    + Add Employee
                </button>

                <button onClick={onExport} className="btn-secondary">
                    ⬇ Export CSV
                </button>

                <button onClick={onResetData} className="btn-danger">
                    ↻ Reset Data
                </button>

                <span className="employee-count">
                    Total: {employeeCount}
                </span>
            </div>

        </div>
    );
}