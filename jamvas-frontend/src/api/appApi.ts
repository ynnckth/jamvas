import { get } from "./apiUtils";
import { AppVersion } from "../types/AppVersion";

export const baseUrl = `${import.meta.env.VITE_BACKEND_API_BASE_URL}`;

export const fetchAppVersion = async (): Promise<AppVersion> => {
  return await get<AppVersion>(`${baseUrl}/version`);
};
