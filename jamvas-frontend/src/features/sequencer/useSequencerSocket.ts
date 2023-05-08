import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SequencerConfiguration } from "./types/SequencerConfiguration";
import { SequencerEvent } from "../../api/event";

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

  const onSequencerConfigurationUpdated = (handler: (updatedConfig: SequencerConfiguration) => void) => {
    on(SequencerEvent.CONFIGURATION_UPDATED, (updatedConfig: SequencerConfiguration) => handler(updatedConfig));
  };

  return { socket, emit, on, onSequencerConfigurationUpdated };
};
