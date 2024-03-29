import { useState } from "react";

export const useConfig = () => {
  const [config, setConfig] = useState({
    puncNum: ["lorem"],
    mode: "time",
    timer: "15",
  });

  const setChangeConfig = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    config,
    setChangeConfig,
  };
};
