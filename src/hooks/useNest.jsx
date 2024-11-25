import React from "react";

const useNest = () => {
  const [isNest, setIsNest] = useState(false);

  return { isNest, setIsNest };
};

export default useNest;
