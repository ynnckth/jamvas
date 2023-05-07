import { User } from "../types/User";

const baseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/users`;

// TODO: refactor - extract an api-base utility to handle GET/POST/PUT/DELETE
export const sendRegisterUser = async (newUser: Omit<User, "id">): Promise<User> => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Failed to create user");
  }
  return await response.json();
};

export const sendFetchUsers = async (): Promise<User> => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Failed to fetch users");
  }
  return await response.json();
};
