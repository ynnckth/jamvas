import { ApiException } from "./apiException";

export type RequestMethod = "GET" | "POST" | "PUT";
export const serverBaseUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}`;

const sendRequest = async <T>(url: string, method: RequestMethod, data?: any): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    const error = responseBody as ApiException;
    console.error("The server responded with error: ", error.message);
    throw new Error(error.message);
  }
  return responseBody;
};

export const get = <T>(url: string): Promise<T> => sendRequest<T>(url, "GET");

export const post = <T>(url: string, data: any): Promise<T> => sendRequest<T>(url, "POST", data);

export const put = <T>(url: string, data: any): Promise<T> => sendRequest<T>(url, "PUT", data);
