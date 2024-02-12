import { useState } from "react";

export const useFocus = () => {
  const [onFocus, setOnFocus] = useState(false);

  return { onFocus, setOnFocus };
};
