import { User } from "../types/User";

export const registerUser = async (newUser: Omit<User, "id">): Promise<User> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Failed to create user");
  }
  return await response.json();
};

export const fetchUsers = async (): Promise<User> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/users`);
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};
