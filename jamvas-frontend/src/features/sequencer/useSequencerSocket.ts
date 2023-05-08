import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_BASE_URL;

let socketInstance: Socket | null = null;

const createSocket = () => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL);
  }
  return socketInstance;
};

export const useSequencerSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(createSocket());

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(SOCKET_URL);
    }
    setSocket(socketInstance);

    return () => {
      if (socketInstance && !socketInstance.connected) {
        socketInstance.disconnect();
        socketInstance = null;
      }
    };
  }, []);

  const emit = (event: string, data: any) => {
    socket?.emit(event, data);
  };

  const on = (event: string, handler: (data: any) => void) => {
    socket?.on(event, handler);
  };

  return { socket, emit, on };
};
