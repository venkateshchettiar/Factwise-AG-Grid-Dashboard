import type { Employee } from "../types";

const STORAGE_KEY = "employees_data";

export const loadEmployeesFromStorage = (): Employee[] | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading from storage:", error);
    return null;
  }
};

export const saveEmployeesToStorage = (employees: Employee[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
};

export const clearEmployeesStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};
