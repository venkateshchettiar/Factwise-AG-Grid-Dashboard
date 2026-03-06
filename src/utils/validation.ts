import type { Employee } from "../types";

export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmployee = (employee: Partial<Employee>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!employee.name || employee.name.trim().length === 0) {
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!employee.country || employee.country.trim().length === 0) {
    errors.push({ field: "country", message: "Country is required" });
  }

  if (!employee.age || employee.age < 18 || employee.age > 80) {
    errors.push({ field: "age", message: "Age must be between 18 and 80" });
  }

  if (!employee.salary || employee.salary < 0) {
    errors.push({ field: "salary", message: "Salary must be a positive number" });
  }

  return errors;
};
