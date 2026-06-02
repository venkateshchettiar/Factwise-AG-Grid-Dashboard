interface Props {
  onSearch: (value: string) => void;
  onExport: () => void;
  onAddEmployee: () => void;
  employeeCount: number;
}

export default function Toolbar({
  onSearch,
  onExport,
  onAddEmployee,
  employeeCount
}: Props) {
  return (
    <div className="toolbar-panel">
      <div className="search-box-wrapper">
        <div className="search-icon-container">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="search-svg">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          placeholder="Search employees by name, country, age, salary..."
          onChange={(e) => onSearch(e.target.value)}
          className="search-field"
        />
      </div>

      <div className="toolbar-actions">
        <button onClick={onAddEmployee} className="btn-action-primary" title="Add new employee record">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add Employee</span>
        </button>

        <button onClick={onExport} className="btn-action-secondary" title="Export current list to CSV format">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Export CSV</span>
        </button>

        <div className="count-badge">
          <span className="count-dot"></span>
          <span className="count-text">{employeeCount} Total Records</span>
        </div>
      </div>
    </div>
  );
}