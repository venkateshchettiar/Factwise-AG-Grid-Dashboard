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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Load employees from localStorage on mount, or use initial data
  useEffect(() => {
    const savedData = loadEmployeesFromStorage();
    if (savedData) {
      setEmployees(savedData);
    } else {
      setEmployees(initialEmployees);
      saveEmployeesToStorage(initialEmployees);
    }
  }, []);

  // Save employees to localStorage whenever they change
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
    <div>
      <h1>Employee Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p className="stat-value">{stats.totalEmployees}</p>
        </div>

        <div className="card">
          <h3>Countries</h3>
          <p className="stat-value">{stats.uniqueCountries}</p>
        </div>

        <div className="card">
          <h3>Avg Salary</h3>
          <p className="stat-value">{formatSalary(stats.averageSalary)}</p>
        </div>

        <div className="card">
          <h3>Total Salaries</h3>
          <p className="stat-value">{formatSalary(stats.totalSalary)}</p>
        </div>
      </div>

      <Toolbar
        onSearch={setSearch}
        onExport={exportCSV}
        onAddEmployee={() => setShowForm(true)}
        onResetData={handleResetData}
        employeeCount={employees.length}
      />

      <GridTable
        employees={employees}
        searchText={search}
        setApi={setGridApi}
        onDeleteEmployee={handleDeleteEmployee}
        onEditEmployee={handleEditEmployee}
      />

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