import type { Employee, DashboardStats } from "../types";

export const calculateDashboardStats = (employees: Employee[]): DashboardStats => {
  const totalEmployees = employees.length;
  const uniqueCountries = new Set(employees.map(emp => emp.country)).size;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const averageSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  return {
    totalEmployees,
    uniqueCountries,
    averageSalary,
    totalSalary
  };
};

export const formatSalary = (salary: number): string => {
  return `$${(salary / 1000).toFixed(0)}K`;
};

export const getNextId = (employees: Employee[]): number => {
  return employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
};
