import { useState } from "react";
import type { Employee } from "../types";
import { validateEmployee } from "../utils/validation";
import type { ValidationError } from "../utils/validation";
import { getNextId } from "../utils/calculations";

interface EmployeeFormProps {
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
  initialData?: Employee;
  existingEmployees: Employee[];
}

export default function EmployeeForm({
  onSubmit,
  onCancel,
  initialData,
  existingEmployees
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<Partial<Employee>>(
    initialData || {
      id: getNextId(existingEmployees),
      name: "",
      country: "",
      age: 25,
      salary: 50000
    }
  );

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleChange = (field: keyof Employee, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === "age" || field === "salary" ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateEmployee(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData as Employee);
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(err => err.field === field)?.message;
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initialData ? "Edit Employee" : "Add New Employee"}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className={getFieldError("name") ? "error" : ""}
            />
            {getFieldError("name") && (
              <span className="error-message">{getFieldError("name")}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <input
              id="country"
              type="text"
              placeholder="United States"
              value={formData.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              className={getFieldError("country") ? "error" : ""}
            />
            {getFieldError("country") && (
              <span className="error-message">{getFieldError("country")}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                id="age"
                type="number"
                min="18"
                max="80"
                placeholder="25"
                value={formData.age || 25}
                onChange={(e) => handleChange("age", e.target.value)}
                className={getFieldError("age") ? "error" : ""}
              />
              {getFieldError("age") && (
                <span className="error-message">{getFieldError("age")}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary *</label>
              <input
                id="salary"
                type="number"
                min="0"
                placeholder="50000"
                value={formData.salary || 50000}
                onChange={(e) => handleChange("salary", e.target.value)}
                className={getFieldError("salary") ? "error" : ""}
              />
              {getFieldError("salary") && (
                <span className="error-message">{getFieldError("salary")}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {initialData ? "Update" : "Add"} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
