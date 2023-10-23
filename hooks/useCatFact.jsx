import { useState, useEffect } from "react";
const CAT_FACT = "https://catfact.ninja/fact";

const useCatFact = () => {
  const [fact, setFact] = useState(null);
  useEffect(() => {
    fetchFact();
  }, []);
  const fetchFact = async () => {
    try {
      const controller = new AbortController();
      const { signal } = controller;
      const response = await fetch(CAT_FACT, { signal });
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
    return () => {
      controller.abort();
    };
  };

  const generateFact = () => {
    fetchFact();
  };
  return { fact, generateFact };
};

export default useCatFact;
