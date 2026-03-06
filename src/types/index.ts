export interface Employee {
  id: number;
  name: string;
  country: string;
  age: number;
  salary: number;
}

export interface DashboardStats {
  totalEmployees: number;
  uniqueCountries: number;
  averageSalary: number;
  totalSalary: number;
}
