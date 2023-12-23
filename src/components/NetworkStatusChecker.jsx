import { FaWifi } from "react-icons/fa";
import instance from "../config/axiosConfig";
import { useEffect, useState } from "react";
const NetworkStatusChecker = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await instance.get("/auth/connection");

        if (!response.status === 200) {
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    const intervalId = setInterval(checkConnection, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {isConnected ? (
        <></>
      ) : (
        <div className="fixed inset-0 z-50 align-middle pb-16 text-2xl text-red-600 font-bold bg-gray-700/60 h-screen w-screen flex justify-center items-end">
          <div className="relative flex">
            <div className="absolute -left-9 top-1">
              <FaWifi />
            </div>
            <div className="">Network error</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NetworkStatusChecker;
