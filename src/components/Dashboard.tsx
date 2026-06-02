import { useState, useEffect } from "react";
import GridTable from "./GridTable";
import Toolbar from "./Toolbar";
import EmployeeForm from "./EmployeeForm";
import type { GridApi } from "ag-grid-community";
import type { Employee } from "../types";
import { calculateDashboardStats, formatSalary } from "../utils/calculations";
import { loadEmployeesFromStorage, saveEmployeesToStorage } from "../utils/storage";
import { employees as initialEmployees } from "../data/employees";

export default function Dashboard() {
  // Lazy initializer: runs ONCE before first render — no effect, no cascading render.
  // Reads localStorage synchronously so the component renders with correct data immediately.
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const savedData = loadEmployeesFromStorage();
    if (savedData) return savedData;
    // No saved data — seed with defaults and persist them
    saveEmployeesToStorage(initialEmployees);
    return initialEmployees;
  });
  const [search, setSearch] = useState("");
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Theme state: dark mode is default for premium look
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Save employees to localStorage whenever they change (add / edit / delete).
  // This effect is correct: it pushes React state INTO an external system.
  useEffect(() => {
    if (employees.length > 0) {
      saveEmployeesToStorage(employees);
    }
  }, [employees]);

  const stats = calculateDashboardStats(employees);

  const exportCSV = () => {
    gridApi?.exportDataAsCsv();
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ));
    setEditingEmployee(null);
    setShowForm(false);
  };

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleFormSubmit = (employee: Employee) => {
    if (editingEmployee) {
      handleUpdateEmployee(employee);
    } else {
      handleAddEmployee(employee);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleResetData = () => {
    if (window.confirm("Reset to default data? This cannot be undone.")) {
      setEmployees(initialEmployees);
      saveEmployeesToStorage(initialEmployees);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Dynamic Background Glow Blobs */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>
      
      {/* Aligned Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <rect x="3" y="3" width="7" height="9" rx="1" />
              <rect x="14" y="3" width="7" height="5" rx="1" />
              <rect x="14" y="12" width="7" height="9" rx="1" />
              <rect x="3" y="16" width="7" height="5" rx="1" />
            </svg>
          </div>
          <div className="header-titles">
            <h1>Factwise <span className="title-highlight">Grid Analytics</span></h1>
            <p className="subtitle">
              <span className="live-pulse"></span>
              Enterprise Employee Directory • {employees.length} active records
            </p>
          </div>
        </div>

        <div className="header-right">
          <button 
            className="theme-toggle-btn" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sun-icon">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="moon-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>

          <button onClick={handleResetData} className="btn-reset-header" title="Reset system database to defaults">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span>Reset Database</span>
          </button>
        </div>
      </header>

      {/* Redesigned Metrics Grid */}
      <section className="metrics-grid">
        <div className="metric-card card-blue">
          <div className="card-top">
            <span className="card-label">Total Employees</span>
            <div className="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>
          <div className="card-bottom">
            <p className="card-value">{stats.totalEmployees}</p>
            <span className="card-trend green">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              Active directory
            </span>
          </div>
        </div>

        <div className="metric-card card-green">
          <div className="card-top">
            <span className="card-label">Global Presence</span>
            <div className="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
          </div>
          <div className="card-bottom">
            <p className="card-value">{stats.uniqueCountries}</p>
            <span className="card-trend green">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              Unique Countries
            </span>
          </div>
        </div>

        <div className="metric-card card-purple">
          <div className="card-top">
            <span className="card-label">Average Base Salary</span>
            <div className="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18.01" />
                <line x1="12" y1="6" x2="12" y2="6.01" />
                <path d="M16 8h-4a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H9" />
                <line x1="12" y1="6" x2="12" y2="18" />
              </svg>
            </div>
          </div>
          <div className="card-bottom">
            <p className="card-value">{formatSalary(stats.averageSalary)}</p>
            <span className="card-trend purple">
              Per employee average
            </span>
          </div>
        </div>

        <div className="metric-card card-orange">
          <div className="card-top">
            <span className="card-label">Total Compensation</span>
            <div className="icon-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
                <path d="M12 4l3 3h-6l3-3z"/>
              </svg>
            </div>
          </div>
          <div className="card-bottom">
            <p className="card-value">{formatSalary(stats.totalSalary)}</p>
            <span className="card-trend orange">
              Annual budget total
            </span>
          </div>
        </div>
      </section>

      {/* Toolbar Controls */}
      <Toolbar
        onSearch={setSearch}
        onExport={exportCSV}
        onAddEmployee={() => setShowForm(true)}
        employeeCount={employees.length}
      />

      {/* Main Employee Grid Table */}
      <GridTable
        employees={employees}
        searchText={search}
        setApi={setGridApi}
        onDeleteEmployee={handleDeleteEmployee}
        onEditEmployee={handleEditEmployee}
      />

      {/* Add/Edit Modal */}
      {showForm && (
        <EmployeeForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseForm}
          initialData={editingEmployee || undefined}
          existingEmployees={employees}
        />
      )}
    </div>
  );
}