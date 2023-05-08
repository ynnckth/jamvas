import { User } from "../types/User";
import { get, post } from "./apiUtils";

const baseUrl = `${import.meta.env.VITE_BACKEND_API_BASE_URL}/users`;

export const sendRegisterUser = async (newUser: Omit<User, "id">): Promise<User> => {
  return await post<User>(baseUrl, newUser);
};

export const fetchUsers = async (): Promise<User[]> => {
  return await get<User[]>(baseUrl);
};
