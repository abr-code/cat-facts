import { useState, useEffect } from "react";

const CAT_IMAGE = "https://cataas.com";

const useCatImage = ({ fact }) => {
  const [catImg, setCatImg] = useState(null);
  const controller = new AbortController();
  const { signal } = controller;

  const fetchCatImage = async () => {
    const firstWord = fact.split(" ", 3).join(" ");
    const response = await fetch(
      `${CAT_IMAGE}/cat/says/${firstWord}?width=500&height=500&json=true`,
      { signal }
    );
    const data = await response.json();
    const { url } = data;
    setCatImg(url);
  };
  useEffect(() => {
    if (!fact) return;
    try {
      fetchCatImage();
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
    return () => {
      controller.abort();
    };
  }, [fact]);
  return `${CAT_IMAGE}/${catImg}`;
};

export default useCatImage;
