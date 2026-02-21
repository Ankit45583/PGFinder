import { createContext, useState, useEffect } from "react";
import initialPGData from "../data/pgData";

export const PGContext = createContext();

export const PGProvider = ({ children }) => {

  // 🔹 localStorage se load
  const getInitialPGs = () => {
    const saved = localStorage.getItem("pgs");
    return saved ? JSON.parse(saved) : initialPGData;
  };

  const [pgs, setPgs] = useState(getInitialPGs);

  // 🔹 localStorage me save
  useEffect(() => {
    localStorage.setItem("pgs", JSON.stringify(pgs));
  }, [pgs]);

  // 🔹 Owner add PG
  const addPG = (newPG) => {
    setPgs((prev) => [
      ...prev,
      {
        ...newPG,
        isVerified: false,
      },
    ]);
  };

  // 🔹 Admin verify PG
  const verifyPG = (id) => {
    setPgs((prev) =>
      prev.map((pg) =>
        pg.id === id ? { ...pg, isVerified: true } : pg
      )
    );
  };

  // Delete krna PGs ko 

  const deletePG= (id)=>
  {
     setPgs((prev) => prev.filter((pg)=> pg.id !== id));
  };

  return (
    <PGContext.Provider value={{ pgs, addPG, verifyPG , deletePG }}>
      {children}
    </PGContext.Provider>
  );
};
