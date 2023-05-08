export type RequestMethod = "GET" | "POST" | "PUT";

const sendRequest = async <T>(url: string, method: RequestMethod, data?: any): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    // TODO: use response error instead
    throw new Error("Api call failed");
  }
  return await response.json();
};

export const get = <T>(url: string): Promise<T> => sendRequest<T>(url, "GET");

export const post = <T>(url: string, data: any): Promise<T> => sendRequest<T>(url, "POST", data);

export const put = <T>(url: string, data: any): Promise<T> => sendRequest<T>(url, "PUT", data);
