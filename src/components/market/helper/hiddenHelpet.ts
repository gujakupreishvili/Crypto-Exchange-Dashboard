import { useEffect, useState } from "react";

export const hiddenHelper = () => {
  const [hiddenArr, setHiddenArr] = useState<string[]>(() => {
    const storedHidden = localStorage.getItem("crypto-hidden");
    if (!storedHidden) {
      return [];
    }
    return JSON.parse(storedHidden);
  });

  useEffect(() => {
    localStorage.setItem("crypto-hidden", JSON.stringify(hiddenArr));
  }, [hiddenArr]);

  const toogleHidden = (symbol: string) => {
    setHiddenArr((prev) =>
      prev.includes(symbol)
        ? prev.filter((item) => item !== symbol)
        : [...prev, symbol]
    );
  };
  return { hiddenArr, toogleHidden };
};
