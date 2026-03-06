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
      <div className="toolbar-left">
        <input
          placeholder="Search by name, country, age, salary..."
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="toolbar-right">
        <button onClick={onAddEmployee} className="btn-primary" title="Add new employee">
          + Add Employee
        </button>

        <button onClick={onExport} className="btn-secondary" title="Export data to CSV">
          Export CSV
        </button>

        <button onClick={onResetData} className="btn-danger" title="Reset to default data">
          Reset Data
        </button>

        <span className="employee-count">
          {employeeCount} Total
        </span>
      </div>
    </div>
  );
}