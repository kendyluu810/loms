export async function fetchEmployees({
  search,
  page,
  pageSize,
  sort = "createdAt",
  order = "desc",
}: {
  search: string;
  page: number;
  pageSize: number;
  sort?: string;
  order?: "asc" | "desc";
}) {
  const res = await fetch(
    `/api/employees?search=${search}&page=${page}&pageSize=${pageSize}&sort=${sort}&order=${order}`
  );
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json(); // { employees: Employee[], total: number }
}

export async function createEmployee(data: any) {
  const res = await fetch("/api/employees", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create employee");
  return await res.json();
}

export async function updateEmployee(id: string, data: any) {
  const res = await fetch(`/api/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return res.json();
}

export async function deleteEmployee(id: string) {
  const res = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete employee");
}
