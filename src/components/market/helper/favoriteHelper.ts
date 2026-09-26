import { useEffect, useState } from "react";

export const favoriteHelper = () => {
  const [favoriteArr, setFavoriteArr] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("crypto-favorites");

    if (!storedFavorites) {
      return [];
    }
    return JSON.parse(storedFavorites);
  });

  useEffect(() => {
    localStorage.setItem("crypto-favorites", JSON.stringify(favoriteArr));
  }, [favoriteArr]);

  const toggleFavorite = (symbol: string) => {
    setFavoriteArr((prev) =>
      prev.includes(symbol)
        ? prev.filter((item) => item !== symbol)
        : [...prev, symbol]
    );
  };
  return { favoriteArr, toggleFavorite };
};
